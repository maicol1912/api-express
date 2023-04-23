import { Entity, Column, OneToOne, JoinColumn } from "typeorm"
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { Exclude } from "class-transformer";


@Entity({ name: "user" })
export class UserEntity extends BaseEntity {

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Exclude()
    @Column()
    password!: string;

    @Column()
    city!: string;

    @Column()
    province!: number;

    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    @JoinColumn({ name: "user_id" })
    customer!: CustomerEntity
}