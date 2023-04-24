import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class CustomerController {
  constructor(
    private readonly customerService: CustomerService = new CustomerService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async getCustomers(req: Request, res: Response) {
    try {
      const data = await this.customerService.findAllCustomers();
      if (data.length === 0) return this.httpResponse.NotFound(res, "don't exist anything categories")
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.findCustomerById(id);
      if (!data) return this.httpResponse.NotFound(res, "the category doesn't exists")
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async createCustomer(req: Request, res: Response) {
    try {
      const data = await this.customerService.createCustomer(req.body);
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:UpdateResult = await this.customerService.updateCustomer(id, req.body);
      if (!data.affected) return this.httpResponse.NotFound(res, "the customer you want update, doesn't exists")
      return this.httpResponse.Ok(res, "category updated")
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:DeleteResult = await this.customerService.deleteCustomer(id);
      if (!data.affected) return this.httpResponse.NotFound(res, "the customer you want delete, doesn't exists")
      return this.httpResponse.Ok(res, "customer deleted")
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
}
