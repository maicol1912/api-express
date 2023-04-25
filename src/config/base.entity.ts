import {PrimaryGeneratedColumn,CreateDateColumn} from "typeorm"

export abstract class BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @CreateDateColumn({
        name:"created_at",
        type:"timestamp"
    })
    createdAt!:Date;

    @CreateDateColumn({
        name:"updated_at",
        type:"timestamp"
    })
    updatedAt!:Date;
}