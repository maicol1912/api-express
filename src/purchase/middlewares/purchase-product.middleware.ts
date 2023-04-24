import { NextFunction, Request, Response } from "express";
import { PurchaseDTO } from "../dto/purchase.dto"; 
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseProductDTO } from "../dto/purchase-product.dto";

export class PurchaseProductMiddlware{
    constructor(private readonly httpResponse:HttpResponse = new HttpResponse()){

    }
    purchaseProductValidator(req:Request,res:Response,next:NextFunction){

        const valid = new PurchaseProductDTO()
        
        Object.assign(valid, req.body)

        validate(valid).then((err)=>{
            //* hay un error con la integridad de los datos
            if(err.length > 0){
                return this.httpResponse.Forbiden(res,err)
            }else{
                next()
            }
        })
    }
}