import {Repository,EntityTarget} from "typeorm"
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer{
    public execRepository:Promise<Repository<T>>

    constructor(private getEntity:EntityTarget<T>){
        super()
        this.execRepository = this.initRepository(getEntity)
    }

    async initRepository<T>(entity:EntityTarget<T>):Promise<any>{
        const getConn = await this.dbConnect()
        return getConn.getRepository(entity)
    }
}