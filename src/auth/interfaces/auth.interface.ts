import { RolType } from "../../user/dto/user.dto";

export interface PayloadToken {
  role: RolType;
  sub: string;
}
