import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { HttpResponse } from "../../shared/response/http.response";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async getCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.findAllCategories();
      if (data.length === 0) return this.httpResponse.NotFound(res, "don't exist anything categories")
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryById(id);
      if (!data) return this.httpResponse.NotFound(res, "the category doesn't exists")
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async createCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.createCategory(req.body);
      return this.httpResponse.Ok(res, data)
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.updateCategory(id, req.body);
      if (!data.affected) return this.httpResponse.NotFound(res, "the category you want update, doesn't exists")
      return this.httpResponse.Ok(res, "category updated")
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.deleteCategory(id);
      if (!data.affected) return this.httpResponse.NotFound(res, "the category you want delete, doesn't exists")
      return this.httpResponse.Ok(res, "category deleted")
    } catch (e: any) {
      return this.httpResponse.Error(res, e.message)
    }
  }
}
