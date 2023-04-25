import { UserController } from "./controllers/user.controller";
import { BaseRouter } from "../shared/router/router";
import { UserMiddlware } from "./middlewares/user.middlware";

export class UserRouter extends BaseRouter<UserController,UserMiddlware>{
    constructor(){
        super(UserController,UserMiddlware)
        this.routes()
    }

    routes():void{
        this.router.get('/users',(req,res)=>this.controller.getUsers(req,res))

        this.router.get('/user/:id',(req,res)=>this.controller.getUserById(req,res))

        this.router.get('/userRel/:id', (req, res) => this.controller.getUserWithRelation(req, res))
        this.router.post('/create-user', (req, res, next) => [this.middleware.userValidator(req, res, next)],
        (req,res)=> this.controller.createUser(req,res))

        this.router.put('/update-user/:id',(req,res)=>this.controller.updateUser(req,res))

        this.router.delete('/delete-user/:id',this.middleware.passAuth("jwt"),

        (req,res,next)=> [this.middleware.checkAdminRole(req,res,next)],
        (req,res)=>this.controller.deleteUser(req,res))
    }
}