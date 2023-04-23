import * as dotenv from "dotenv"
import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
//* abstracta es una clase que no se puede instanciar // se puede usar como una herencia
export abstract class ConfigServer {
    //* definimos el path con el nombre de la variable
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv.trim())
        dotenv.config({
            path: nodeNameEnv,
        })
    }
    public getEnviroment(key: string) {
        //* obtenemos el valor de la llave que enviamos
        return String(process.env[key]) // process.env['PORT']
    }

    public getNumberEnv(key: string): number {
        return Number(this.getEnviroment(key))
    }
    //* una funcion que puede retornar algo o puede ser vacia  // get debe retornar algo no puede ser un void   
    public get nodeEnv(): string {
        //* como es get, sino llega algo, retorna el string vacio
        return this.getEnviroment('NODE_ENV')?.trim() || "";
    }

    public createPathEnv(path: string): string {
        //* si llega variable la agrega,sino devuelve solo .env
        if (path.length > 0) {
            return `.${path}.env`
        }
        return `.env`
    }

    public AppDataSource() {
        return new DataSource({
            type: "postgres",
            host: this.getEnviroment('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            username: this.getEnviroment('DB_USER'),
            password: this.getEnviroment('DB_PASSWORD'),
            database: this.getEnviroment('DB_DATABASE'),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
            //* synchronize en true es para que no necesitemos hacer migraciones sino que se haga al correr el programa
            synchronize: true,
            //*esto seria para que tengamos que correr lsa migraciones para poder ver los cambios
            /*migrationsRun:true,*/
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
            
        })
    }

    async dbConnect(): Promise<any> {
        return await this.AppDataSource().initialize()
        
    }
}

