import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

//* Este middleware sirve para validar los datos de entrada de una peticion, se usa en los routers
export class UserMiddlware{
    constructor(private readonly httpResponse:HttpResponse = new HttpResponse()){

    }
    userValidator(req:Request,res:Response,next:NextFunction){
        //* estamos asignando una instancia de dto
        const valid = new UserDTO()

        //* a la instancia del dto le estmaos asignando los datos que llegan desde el body
        Object.assign(valid, req.body)

        validate(valid).then((err)=>{
            //* hay un error con la integridad de los datos
            if(err.length > 0){
                return this.httpResponse.Forbiden(res,err)
            }else{
                //* sigue la ejecucion normal por eso es middleware
                next()
            }
        })
    }
}