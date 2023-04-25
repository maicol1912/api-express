import { NextFunction, Request, Response } from "express";
import passport, { use } from "passport";
import { RolType } from "../../user/dto/user.dto";
import { UserEntity } from "../../user/entities/user.entity";
import { HttpResponse } from "../response/http.response";

export class SharedMiddleware{

  //* este es el middleware donde entra la uatenticacion, estamos usando el login de passport
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}
  passAuth(type: string) {
    return passport.authenticate(type, { session: false });
  }

  checkCustomerRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== RolType.CUSTOMER) {
      return this.httpResponse.Unauthorized(res, "No tienes permiso");
    }
    return next();
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== RolType.ADMIN) {
      return this.httpResponse.Unauthorized(res, "No tienes permiso");
    }
    return next();
  }
}
