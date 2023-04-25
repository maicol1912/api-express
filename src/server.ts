import "express-async-errors"
import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan"
import cors from "cors"
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";
import { CategoryRouter } from "./category/category.router";
import { CustomerRouter } from "./customer/customer.router";
import { ProductRouter } from "./product/product.router";
import { PurchaseRouter } from "./purchase/purchase.router";
import { DataSource } from "typeorm";
import { PurchaseProductRouter } from "./purchase/purchase-products.router";
import errorHandlingMiddleware from "./shared/filters/exception.filter";
import { LoginStrategy } from "./auth/strategies/login.strategy"; 
import { JwtStrategy } from "./auth/strategies/jwt.strategy"; 
import { AuthRouter } from "./auth/auth.router";


class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT') || 8000;
    constructor() {
        super()
        this.middlewares()
        this.listen()
        this.connectDB()
        this.passportUse()
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server listening on port => ${this.port}`)
        })
    }

    public middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use("/api", this.routers())
        this.app.use('*', errorHandlingMiddleware)

    }
    routers(): Array<express.Router> {
        return [
            new UserRouter().router,
            new CategoryRouter().router,
            new CustomerRouter().router,
            new ProductRouter().router,
            new PurchaseRouter().router,
            new PurchaseProductRouter().router,
            new AuthRouter().router
        ]
    }
    async connectDB():Promise<DataSource | void>{
        await this.dbConnect().then(()=>{
            console.log("connection database ready")
        })
        .catch((e)=>{
            console.log("connection database falied"+e)
        })
    }

    passportUse() {
        return [new LoginStrategy().use, new JwtStrategy().use];
    }
}

new ServerBootstrap()