import { NextFunction, Request, Response } from "express";
import { CustomerDTO } from "../dto/customer.dto"; 
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class CustomerMiddlware{
    constructor(private readonly httpResponse:HttpResponse = new HttpResponse()){

    }
    customerValidator(req:Request,res:Response,next:NextFunction){

        const valid = new CustomerDTO()
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