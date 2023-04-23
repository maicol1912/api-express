import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import {OneToMany} from "typeorm"
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { ProductEntity } from "../../product/entities/product.entity";

@Entity({ name: "category" })
export class CategoryEntity extends BaseEntity {

    @Column()
    categorytName!: string;


    @OneToMany(()=>ProductEntity,(product)=>product.category)
    @JoinColumn({name:"category_id"})
    products!:ProductEntity[]
}