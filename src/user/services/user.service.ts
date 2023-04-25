import { DeleteResult, UpdateResult } from "typeorm"
import * as bcrypt from "bcrypt"
import { BaseService } from "../../config/base.service";
import { RolType, UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity>{
    constructor() {
        super(UserEntity)
    }

    async findAllUser(): Promise<UserEntity[]> {
        return (await this.execRepository).find()
    }

    async findById(id: string){
        return (await this.execRepository).findOne({where:{id}})
    }

    async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = (await this.execRepository).create(body)
        const hash = await bcrypt.hash(newUser.password,10)
        newUser.password = hash
        return (await this.execRepository).save(newUser)
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }

    async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id,infoUpdate)
    }

    //* con el query builder traeremos la informacion del customer en la consulta
    async findUserWithRelation(id:string):Promise<UserEntity | null>{
        return (await this.execRepository).
        createQueryBuilder('user')
        //* usamos la relacion de user.customer y despues traemos el customer completo
        .leftJoinAndSelect('user.customer','customer')
        .where({id}).getOne()
    }

    async findUserByEmail(email:string):Promise<UserEntity|null>{
        return (await this.execRepository)
        .createQueryBuilder("user")
        //seleccionamos el user.password filtrando por el email
        .addSelect("user.password")
        .where({email})
        .getOne()
    }

    async findByUsername(username:string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            //seleccionamos el user.password filtrando por el email
            .addSelect("user.password")
            .where({ username })
            .getOne()
    }

    async findUserWithRole(
        id: string,
        role: RolType
    ): Promise<UserEntity | null> {
        const user = (await this.execRepository)
            .createQueryBuilder("user")
            .where({ id })
            .andWhere({ role })
            .getOne();

        return user;
    }
}