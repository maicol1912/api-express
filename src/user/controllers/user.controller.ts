import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {

    constructor(private readonly userService:UserService =  new UserService()){}

    async getUsers(req: Request, res: Response) {
        try {
            const data = await this.userService.findAllUser()
            res.status(200).json(data)
        } catch (e) {
            console.error(e)
        }
    }

    async getUserById(req: Request, res: Response) {
        const {id} = req.params
        try {
            const data = await this.userService.findById(id)
            res.status(200).json(data)
        } catch (e) {
            console.error(e)
        }
    }

    async createUser(req: Request, res: Response) {
        const {body} = req
        try {
            const data = await this.userService.createUser(body)
            res.status(200).json(data)
        } catch (e) {
            console.error(e)
        }
    }

    async updateUser(req: Request, res: Response) {
        const {id} = req.params
        const {body} = req
        try {
            const data = await this.userService.updateUser(id,body)
            res.status(200).json(data)
        } catch (e) {
            console.error(e)
        }
    }

    async deleteUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const data = await this.userService.deleteUser(id)
            res.status(200).json(data)
        } catch (e) {
            console.error(e)
        }
    }
}