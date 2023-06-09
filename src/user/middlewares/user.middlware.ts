import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { HttpException } from "../../shared/filters/exceptions/http-exception";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class UserMiddlware extends SharedMiddleware{
    constructor(){
        super()
    }
    userValidator(req:Request,res:Response,next:NextFunction){
        const valid = new UserDTO()

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