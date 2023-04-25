//* para poder manejar las excepciones a nivel de asincronismo
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

//* extendemos de config server para poder acceder a las variables de entorno   
class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT') || 8000;
    //* esto hace que cada que se instancie una clase ejecute esta porcion de codigo en este caso llama los metodos
    constructor() {
        //* super para usar los metodos de la clase de la que extiende
        super()
        this.middlewares()
        this.listen()
        this.connectDB()
        this.passportUse()
    }

    //*configuracion del server 
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server listening on port => ${this.port}`)
        })
    }

    //* todos los middlewares que la aplicacion debe de usar
    public middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(morgan('dev'))
        this.app.use(cors())
        //* hacemos que al ingresar a esta ruta se llame al metodo routers
        this.app.use("/api", this.routers())
        //* el filtro de las excepciones, se usa en el modulo de usuario unicamente
        this.app.use('*', errorHandlingMiddleware)

    }
    //* el metodo routers devuelve una lista de routers, aca se listan todas las rutas de la aplicacion
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
    //*nos conectamos a la base de datos si esta todo bien nos conectamos, sino no
    async connectDB():Promise<DataSource | void>{
        await this.dbConnect().then(()=>{
            console.log("connection database ready")
        })
        .catch((e)=>{
            console.log("connection database falied"+e)
        })
    }

    passportUse() {
        //* debemos usar la strategy de Login para usarlo, y el JWT para poder decodear el token
        return [new LoginStrategy().use, new JwtStrategy().use];
    }
}

new ServerBootstrap()