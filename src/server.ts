import "reflect-metadata"
import express from "express";
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
    }
    //* el metodo routers devuelve una lista de routers, aca se listan todas las rutas de la aplicacion
    routers(): Array<express.Router> {
        return [
            new UserRouter().router,
            new CategoryRouter().router,
            new CustomerRouter().router,
            new ProductRouter().router,
            new PurchaseRouter().router,
            new PurchaseProductRouter().router
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
}

new ServerBootstrap()