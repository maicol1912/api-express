import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controllers/category.controller";
import { CategoryMiddlware } from "./middlewares/category.middlware";
export class CategoryRouter extends BaseRouter<CategoryController,CategoryMiddlware> {
  constructor() {
    super(CategoryController, CategoryMiddlware);
    this.routes()
  }

  routes(): void {
    this.router.get("/categories", (req, res) =>
      this.controller.getCategories(req, res)
    );
    this.router.get("/category/:id", (req, res) =>
      this.controller.getCategoryById(req, res)
    );
    this.router.post("/create-category", (req, res, next) => [this.middleware.categoryValidator(req, res, next)], 
    (req, res) =>this.controller.createCategory(req, res));
    this.router.put("/update-category/:id", (req, res) =>
      this.controller.updateCategory(req, res)
    );
    this.router.delete("/delete-category/:id", (req, res) =>
      this.controller.deleteCategory(req, res)
    );
  }
}
