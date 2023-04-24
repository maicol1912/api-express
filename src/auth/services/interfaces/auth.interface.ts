import { RolType } from "../../../user/dto/user.dto";

export interface PayloadToken{
    role:RolType,
    //*dato del usuario
    sub:string
}