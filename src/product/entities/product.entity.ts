import { Entity, Column,OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { BaseEntity } from "../../config/base.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { PurchaseProductEntity } from "../../purchase/entities/purchases-products.entity"; 

@Entity({ name: "product" })
export class ProductEntity extends BaseEntity {

    @Column()
    productName!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    //* relacion de muchos a uno con la tabla de categorias ya que una categoria puede tener muchos productos
    @ManyToOne(()=>CategoryEntity,(category)=>category.products)
    //*join column para mostrar columna con relacion
    @JoinColumn({name:"category_id"})
    category!:CategoryEntity

    //* relacion de muchos uno a muchos con la tabla de purchaseProduct intermedia ya que un purchase puede tener varios productos y un productovairos purchases
    @OneToMany(()=>PurchaseProductEntity,(purchaseProduct)=>purchaseProduct.product)
    //* esta no tiene join column ya que no queremos que la relacion se vea refleajda en una columna
    purchaseProduct!:PurchaseProductEntity[ ]
}