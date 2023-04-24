import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class ProductController {
  constructor(
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async getProducts(req: Request, res: Response) {
    try {
      const data = await this.productService.findAllProducts();
      if (data.length === 0) return this.httpResponse.NotFound(res, "don't exist anything products")
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findProductById(id);
      if (!data) return this.httpResponse.NotFound(res, "the product doesn't exists")
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async createProduct(req: Request, res: Response) {
    try {
      const data = await this.productService.createProduct(req.body);
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:UpdateResult = await this.productService.updateProduct(id, req.body);
      if (!data.affected) return this.httpResponse.NotFound(res, "the product you want update, doesn't exists")
      return this.httpResponse.Ok(res, "product updated")
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:DeleteResult = await this.productService.deleteProduct(id);
      if (!data.affected) return this.httpResponse.NotFound(res, "the product you want delete, doesn't exists")
      return this.httpResponse.Ok(res, "product deleted")
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
}
