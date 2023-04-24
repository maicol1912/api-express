import { IsString, IsNotEmpty, IsNumber } from "class-validator"
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    lastname!: string;

    @IsNotEmpty()
    @IsString()
    username!: string;

    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

    @IsNotEmpty()
    @IsString()
    city!: string;

    @IsNotEmpty()
    @IsNumber()
    province!: number;

    @IsNotEmpty({message:"the role is necessary"})
    role!:RolType;
}

export enum RolType{
    USER = "USER",
    CUSTOMER= "CUSTOMER",
    ADMIN = "ADMIN"
}