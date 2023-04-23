import { Router } from "express";

//* es una clase que recibe un generico, un tipo de controlador T 
export class BaseRouter<T>{
    //* el router es para poder acceder a los metodos del router
    public router:Router;

    //* se configura que el controller es de tipo del genrico que llega a la clase
    public controller:T
    //public middleware: U
    //* decimos que lo que llega es de tipo T que llega
    constructor(TController:{new ():T}){
        //* estamos asignando el valor para que pueda realizar sus metodos
        this.router = Router()
        //* el controller es un objeto del tipo clase que llegue
        this.controller = new TController()
    }

}