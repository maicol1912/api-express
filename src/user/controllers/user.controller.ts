import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserController {

    constructor(private readonly userService:UserService =  new UserService(),private readonly httpResponse:HttpResponse = new HttpResponse()){}

    async getUsers(req: Request, res: Response) {
        try {
            const data = await this.userService.findAllUser()
            if (data.length === 0) return this.httpResponse.NotFound(res,"don't exist anything user")
            return this.httpResponse.Ok(res,data)
        } catch (e:any) {
            return this.httpResponse.Error(res, e.message)
        }
    }

    async getUserById(req: Request, res: Response) {
        const {id} = req.params
        try {
            const data = await this.userService.findById(id)
            if (!data) return this.httpResponse.NotFound(res, "the user doesn't exists")
            return this.httpResponse.Ok(res, data)
        } catch (e:any) {
            return this.httpResponse.Error(res, e.message)
        }
    }

    async createUser(req: Request, res: Response) {
        const {body} = req
        try {
            const data = await this.userService.createUser(body)
            return this.httpResponse.Ok(res, data)
        } catch (e:any) {
            return this.httpResponse.Error(res, e.message)
        }
    }

    async updateUser(req: Request, res: Response) {
        const {id} = req.params
        const {body} = req
        try {
            const data:UpdateResult = await this.userService.updateUser(id,body)
            if (!data.affected) return this.httpResponse.NotFound(res, "the user you want update, doesn't exists")
            return this.httpResponse.Ok(res, "user updated")
        } catch (e: any) {
            return this.httpResponse.Error(res, e.message)
        }
    }

    async deleteUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const data:DeleteResult = await this.userService.deleteUser(id)
            if (!data.affected) return this.httpResponse.NotFound(res, "the user you want delete, doesn't exists") 
            return this.httpResponse.Ok(res, "User deleted")
        } catch (e:any) {
            return this.httpResponse.Error(res, e.message)
        }
    }

    async getUserWithRelation(req: Request, res: Response) {
        const { id } = req.params
        try {
            const data = await this.userService.findUserWithRelation(id)
            if (!data) return this.httpResponse.NotFound(res, "the user doesn't exists")
            return this.httpResponse.Ok(res, data)
        } catch (e: any) {
            return this.httpResponse.Error(res, e.message)
        }
    }
}