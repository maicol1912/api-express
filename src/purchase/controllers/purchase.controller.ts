import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService = new PurchaseService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async getPurchases(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.findAllPurchases();
      if (data.length === 0) return this.httpResponse.NotFound(res, "don't exist anything purchase")
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.findPurchaseById(id);
      if (!data) return this.httpResponse.NotFound(res, "the purchase doesn't exists")
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async createPurchase(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.createPurchase(req.body);
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:UpdateResult = await this.purchaseService.updatePurchase(id, req.body);
      if (!data.affected) return this.httpResponse.NotFound(res, "the purchase you want update, doesn't exists")
      return this.httpResponse.Ok(res, "purchase updated")
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async deletePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:DeleteResult = await this.purchaseService.deletePurchase(id);
      if (!data.affected) return this.httpResponse.NotFound(res, "the purchase you want delete, doesn't exists")
      return this.httpResponse.Ok(res, "purchase deleted")
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
}