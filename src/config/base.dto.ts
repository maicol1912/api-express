import { IsOptional,IsDate,IsUUID } from "class-validator";

export class BaseDTO{
    @IsUUID()
    @IsOptional()
    id!:string;

    @IsDate()
    @IsOptional()
    createdAt!:string;

    @IsDate()
    @IsOptional()
    updatedAt!:string;
}