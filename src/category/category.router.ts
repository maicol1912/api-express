import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controllers/category.controller";
export class CategoryRouter extends BaseRouter<CategoryController> {
  constructor() {
    super(CategoryController);
    this.routes()
  }

  routes(): void {
    this.router.get("/categories", (req, res) =>
      this.controller.getCategories(req, res)
    );
    this.router.get("/category/:id", (req, res) =>
      this.controller.getCategoryById(req, res)
    );
    this.router.post("/create-category", (req, res) =>
      this.controller.createCategory(req, res)
    );
    this.router.put("/update-category/:id", (req, res) =>
      this.controller.updateCategory(req, res)
    );
    this.router.delete("/delete-category/:id", (req, res) =>
      this.controller.deleteCategory(req, res)
    );
  }
}
