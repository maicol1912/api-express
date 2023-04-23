import { PurchaseEntity } from './../../purchase/entities/purchase.entity';
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity, } from "../../product/entities/product.entity";

//* tabla que guarda las compras que se hicieron con sus productos
@Entity({ name: "purchase_products" })
export class PurchaseProductEntity extends BaseEntity {

    //*cantidad de producto
    @Column()
    quantityProduct!: number;

    //*precio total
    @Column()
    totalPrice!: number;

    //* hace una relacion hacia la tabla de purchase 
    @ManyToOne(()=>PurchaseEntity,(purchase)=>purchase.purchaseProduct)
    //* el join column se usa cuando queremos que se muestre un campo de la relacion si no queremos que se muestre un campo no lo usamos
    @JoinColumn({name:"purchase_id"})
    purchase!:PurchaseEntity;

    //* hace una relacion hacia la tabla de product 
    @ManyToOne(()=>ProductEntity,(purchase)=>purchase.purchaseProduct)
    @JoinColumn({name:"product_id"})
    product!:ProductEntity;
}