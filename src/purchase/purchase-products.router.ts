import { BaseRouter } from "../shared/router/router";
import { PurchaseProductController } from "./controllers/purchase-product.controller";
import { PurchaseProductMiddlware } from "./middlewares/purchase-product.middleware"; 
import { PurchaseMiddlware } from "./middlewares/purchase.middleware";
export class PurchaseProductRouter extends BaseRouter<PurchaseProductController, PurchaseProductMiddlware> {
    constructor() {
        super(PurchaseProductController, PurchaseProductMiddlware);
        this.routes()
    }

    routes(): void {
        this.router.get("/purchaseProducts", (req, res) =>
            this.controller.getPurchaseProducts(req, res)
        );

        this.router.get("/purchaseProduct/:id", (req, res) =>
            this.controller.getPurchaseProductById(req, res)
        );

        this.router.post("/createPurchaseProduct", (req, res, next) => [this.middleware.purchaseProductValidator(req, res, next)],
        (req, res) =>this.controller.createPurchaseProduct(req, res));

        this.router.put("/updatePurchaseProduct/:id", (req, res) =>
            this.controller.updatePurchaseProduct(req, res)
        );

        this.router.delete("/deletePurchaseProduct/:id", (req, res) =>
            this.controller.deletePurchaseProduct(req, res)
        );
    }
}