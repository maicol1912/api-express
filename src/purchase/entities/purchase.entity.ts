import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { PurchaseProductEntity } from "../../custom/entities/purchase-products.entity";

@Entity({ name: "purchase" })
export class PurchaseEntity extends BaseEntity {

    @Column()
    status!: string;

    @Column()
    paymentMethod!: number;

    //* relacion de muchos uno a muchos con la tabla de customer ya que una compra puede tener varios customer
    @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
    @JoinColumn({ name: "customer_id" })
    customer!: CustomerEntity
    
    //* relacion de uno a muchos con la tabla de PurchaseProduct ya que un product puede tener varios purchases y un purchase varios products
    @OneToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.purchase)
    purchaseProduct!: PurchaseProductEntity[]
}