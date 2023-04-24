import { BaseRouter } from "../shared/router/router";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerMiddlware } from "./middlewares/customer.middlware";
export class CustomerRouter extends BaseRouter<CustomerController,CustomerMiddlware> {
  constructor() {
    super(CustomerController,CustomerMiddlware);
    this.routes()
  }

  routes(): void {
    this.router.get("/customers", (req, res) =>
      this.controller.getCustomers(req, res)
    );
    this.router.get("/customer/:id", (req, res) =>
      this.controller.getCustomerById(req, res)
    );
    this.router.post("/create-customer", (req, res, next) => [this.middleware.customerValidator(req, res, next)], 
    (req, res) => this.controller.createCustomer(req, res));
    this.router.put("/update-customer/:id", (req, res) =>
      this.controller.updateCustomer(req, res)
    );
    this.router.delete("/delete-customer/:id", (req, res) =>
      this.controller.deleteCustomer(req, res)
    );
  }
}
