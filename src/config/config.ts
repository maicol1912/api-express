import * as dotenv from "dotenv"
import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import { AppDataSource } from "./data.source"
export abstract class ConfigServer {
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv.trim())
        dotenv.config({
            path: nodeNameEnv,
        })
    }
    public getEnviroment(key: string) {
        return String(process.env[key]) // process.env['PORT']
    }

    public getNumberEnv(key: string): number {
        return Number(this.getEnviroment(key))
    }
    public get nodeEnv(): string {
        return this.getEnviroment('NODE_ENV')?.trim() || "";
    }

    public createPathEnv(path: string): string {
        if (path.length > 0) {
            return `.${path}.env`
        }
        return `.env`
    }

    async dbConnect(): Promise<any> {
        return AppDataSource.initialize()
        
    }
}

