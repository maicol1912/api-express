import { AuthService } from "../services/auth.service";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { UserEntity } from "../../user/entities/user.entity";
import { PassportUse } from "../utils/passport.use";

const authService: AuthService = new AuthService();
//* el login estrategy recibe un username y un password
export class LoginStrategy {
  async validate(
    username: string,
    password: string,
    done: any
  ): Promise<UserEntity> {
    //* valida con el authService
    const user = await authService.validateUser(username, password);
    if (!user) {
      return done(null, false, { message: "Invalid username or password" });
    }
    //*si esta bien, este retorna un usuario en la peticion en el req, desde donde podremos accederlo mas adelante
    return done(null, user);
  }

  get use() {
    //*definimos la estrategia que usa el passport
    return PassportUse<LocalStrategy, Object, VerifyFunction>(
      "login",
      LocalStrategy,
      {
        usernameField: "username",
        passwordField: "password",
      },
      this.validate
    );
  }
}
