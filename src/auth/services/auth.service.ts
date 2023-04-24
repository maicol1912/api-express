import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { ConfigServer } from "../../config/config";
import { UserService } from "../../user/services/user.service";
import { UserEntity } from "../../user/entities/user.entity";
import { PayloadToken } from "./interfaces/auth.interface";

export class AuthService extends ConfigServer{

    constructor(
    private readonly userService:UserService = new UserService(),
    private readonly jwtInstance = jwt
    ){
        super()
    }

    public async validateUser(username:string,password:string):Promise<UserEntity|null>{
        const userByEmail = await this.userService.findUserByEmail(username)
        const userByUsername = await this.userService.findByUsername(username)
        
        if(userByUsername){
            const isMatch = await bcrypt.compare(password,userByUsername.password)
            //* si isMarch es true devuelve el userByUsername
            isMatch && userByUsername;
        }

        if (userByEmail) {
            const isMatch = await bcrypt.compare(password, userByEmail.password)
            //* si isMarch es true devuelve el userByEmail
            isMatch && userByEmail;
        }

        return null;
    }

    
    //* payload, fragmento de datos que se necesitan para poder pasarlos dentro del token
    //* secret, sirve para desencriptar ese token, y obtener el dato dentro del token
    public sign(payload:jwt.JwtPayload,secret:any){
        return this.jwtInstance.sign(payload,secret)
    }

    public async generateJWT(user:UserEntity):Promise<{accessToken:string,user:UserEntity}>{
        const userConsult = await this.userService.findUserWithRole(
            user.id,
            user.role
        )
        const payload:PayloadToken = {
            role: userConsult!.role,
            sub:userConsult!.id
        }
        
        if(userConsult){
            user.password = "Not permision"
        }
        return {
            accessToken: this.sign(payload, this.getEnviroment('JWT_SECRET')),
            user
        }
    }
}