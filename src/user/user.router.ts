import { UserController } from "./controllers/user.controller";
import { BaseRouter } from "../shared/router/router";
import { UserMiddlware } from "./middlewares/user.middlware";
//* se debe heredar con el tipo de controllador que enviamos
export class UserRouter extends BaseRouter<UserController,UserMiddlware>{
    constructor(){
        //* se envia un super con el controller que se quiere enviar 
        super(UserController,UserMiddlware)
        //* ejecutamos las rutas que estan en el metodo routes
        this.routes()
    }

    routes():void{
        //* ejecutamos todos las rutas
        this.router.get('/users',(req,res)=>this.controller.getUsers(req,res))

        this.router.get('/user/:id',(req,res)=>this.controller.getUserById(req,res))

        this.router.get('/userRel/:id', (req, res) => this.controller.getUserWithRelation(req, res))
        //* Aca ejecutamos el middleware de validacion de integracion de datos 
        this.router.post('/create-user', (req, res, next) => [this.middleware.userValidator(req, res, next)],
        (req,res)=> this.controller.createUser(req,res))

        this.router.put('/update-user/:id',(req,res)=>this.controller.updateUser(req,res))
                                              //*debemos primero llamar al middleware de auth
                                              //* este passsport devuelve un user en el .req que se usa para autenticar
        this.router.delete('/delete-user/:id',this.middleware.passAuth("jwt"),
        //* despues ahi si checar el admin
        (req,res,next)=> [this.middleware.checkAdminRole(req,res,next)],
        (req,res)=>this.controller.deleteUser(req,res))
    }
}