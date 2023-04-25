import { ConfigServer } from "../../config/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserService } from "../../user/services/user.service";
import { UserEntity } from "../../user/entities/user.entity";
import { PayloadToken } from "../interfaces/auth.interface";

export class AuthService extends ConfigServer {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt
  ) {
    super();
  }

  public async validateUser(
    username: string,
    password: string
  ): Promise<UserEntity | null> {
    
    const userByEmail = await this.userService.findUserByEmail(username);
    const userByUsername = await this.userService.findByUsername(username);

    if (userByUsername) {
      
      const isMatch = await bcrypt.compare(password,userByUsername.password);
      if (isMatch) {
        return userByUsername;
      }
    }
    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password);
      if (isMatch) {
        return userByEmail;
      }
    }

    return null;
  }

  sing(payload: jwt.JwtPayload, secret: any) {
    return this.jwtInstance.sign(payload, secret, { expiresIn: "1h" });
  }

  public async generateJWT(
    user: UserEntity
  ): Promise<{ accessToken: string; user: UserEntity }> {
    const userConsult = await this.userService.findById(
      user.id
    );
    const payload: PayloadToken = {
      role: userConsult!.role,
      sub: userConsult!.id,
    };

    if (userConsult) {
      user.password = "Not permission";
    }

    return {
      accessToken: this.sing(payload, this.getEnviroment("JWT_SECRET")),
      user,
    };
  }
}
