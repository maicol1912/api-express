import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controller";
import { ProductMiddlware } from "./middlewares/product.middlware";
export class ProductRouter extends BaseRouter<ProductController,ProductMiddlware> {
  constructor() {
    super(ProductController, ProductMiddlware);
    this.routes()
  }

  routes(): void {
    this.router.get("/products", (req, res) =>
      this.controller.getProducts(req, res)
    );
    this.router.get("/product/:id", (req, res) =>
      this.controller.getProductById(req, res)
    );
    this.router.post("/create-product", (req, res) =>
      this.controller.createProduct(req, res)
    );
    this.router.put("/update-product/:id", (req, res) =>
      this.controller.updateProduct(req, res)
    );
    this.router.delete("/delete-product/:id", (req, res) =>
      this.controller.deleteProduct(req, res)
    );
  }
}
