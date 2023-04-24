import { Entity, Column, OneToOne, JoinColumn } from "typeorm"
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { Exclude } from "class-transformer";
import { RolType } from "../dto/user.dto";


@Entity({ name: "users" })
export class UserEntity extends BaseEntity {

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Exclude({})
    //* para que no lo traiga en la respuesta
    @Column({select:false})
    password!: string;

    @Column()
    city!: string;

    @Column()
    province!: number;
    
    @Column({type:"enum",enum:RolType,nullable:false})
    role!:RolType; 

    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
}