import {PrimaryGeneratedColumn,CreateDateColumn} from "typeorm"

//* Es una clase abstracta porque solo puede ser heredada y no instanciada
export abstract class BaseEntity{

    //* se coloca ! para decir que es obligatoria y tsc no nos arroje error
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