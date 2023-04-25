import { NextFunction, Request, Response } from "express";
import { PurchaseDTO } from "../dto/purchase.dto"; 
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { HttpException } from "../../shared/filters/exceptions/http-exception";

export class PurchaseMiddlware{
    constructor(private readonly httpResponse:HttpResponse = new HttpResponse()){

    }
    purchaseValidator(req:Request,res:Response,next:NextFunction){

        const valid = new PurchaseDTO()
        
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