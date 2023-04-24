import { UserController } from "./controllers/user.controller";
import { BaseRouter } from "../shared/router/router";
//* se debe heredar con el tipo de controllador que enviamos
export class UserRouter extends BaseRouter<UserController>{
    constructor(){
        //* se envia un super con el controller que se quiere enviar 
        super(UserController)
        //* ejecutamos las rutas que estan en el metodo routes
        this.routes()
    }

    routes():void{
        //* ejecutamos todos las rutas
        this.router.get('/users',(req,res)=>this.controller.getUsers(req,res))
        this.router.get('/user/:id',(req,res)=>this.controller.getUserById(req,res))
        this.router.get('/userRel/:id', (req, res) => this.controller.getUserWithRelation(req, res))
        this.router.post('/create-user',(req,res)=>this.controller.createUser(req,res))
        this.router.put('/update-user/:id',(req,res)=>this.controller.updateUser(req,res))
        this.router.delete('/delete-user/:id',(req,res)=>this.controller.deleteUser(req,res))
    }
}