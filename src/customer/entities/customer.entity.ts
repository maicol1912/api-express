import { Entity, Column, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { BaseEntity } from "../../config/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";

@Entity({ name: "customer" })
export class CustomerEntity extends BaseEntity {

    @Column()
    address!: string;

    @Column()
    dni!: number;

    //* aca hay una relacion one a one en la tabla de usuarios
    @OneToOne(() => UserEntity, (user) => user.customer)
    //* join column para crear una columna con la realcion
    @JoinColumn({ name: "user_id" })
    user!: UserEntity

    //* aca hay una relacion one a muchos en la tabla de purchases, ya que un customer puede hacer varias compras
    @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
    //* join column para crear una columna con la realcion
    @JoinColumn({ name: "purchase_id" })
    purchases!: PurchaseEntity[]
}