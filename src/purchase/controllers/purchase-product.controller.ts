import { Request, Response } from "express";
import { PurchaseProductService } from "../services/purchase-product.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class PurchaseProductController {
  constructor(
    private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async getPurchaseProducts(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.findAllPurchaseProducts();
      if (data.length === 0) return this.httpResponse.NotFound(res, "don't exist anything purchase product")
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async getPurchaseProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.findPurchaseProductById(
        id
      );
      if (!data) return this.httpResponse.NotFound(res, "the purchase product doesn't exists")
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async createPurchaseProduct(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.createPurchaseProduct(
        req.body
      );
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async updatePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:UpdateResult = await this.purchaseProductService.updatePurchaseProduct(
        id,
        req.body
      );
      if (!data.affected) return this.httpResponse.NotFound(res, "the purchase product you want update, doesn't exists")
      return this.httpResponse.Ok(res, "purchase product updated")
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async deletePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:DeleteResult = await this.purchaseProductService.deletePurchaseProduct(id);
      if (!data.affected) return this.httpResponse.NotFound(res, "the purchase product you want delete, doesn't exists")
      return this.httpResponse.Ok(res, "purchase product deleted")
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
}