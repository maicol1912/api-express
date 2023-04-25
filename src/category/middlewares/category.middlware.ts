import { NextFunction, Request, Response } from "express";
import { CategoryDTO } from "../dto/category.dto"; 
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { HttpException } from "../../shared/filters/exceptions/http-exception";

export class CategoryMiddlware{
    constructor(private readonly httpResponse:HttpResponse = new HttpResponse()){

    }
    categoryValidator(req:Request,res:Response,next:NextFunction){

        const valid = new CategoryDTO()
        Object.assign(valid, req.body)
        

        validate(valid).then((err)=>{
            if(err.length > 0){
                return next(new HttpException(401, "Not valid data"))
            }else{
                next()
            }
        })
    }
}