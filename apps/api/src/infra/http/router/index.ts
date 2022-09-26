import CreateBrandFactory from "../../../domain/modules/brands/use-cases/create-brand/create-brand-factory";
import CreateProductFactory from "../../../domain/modules/products/use-cases/create-product/create-product-factory";
import { HttpRequest, HttpResponse, Server } from "../interfaces";

function router(server: Server) {
  server.post("/products", (req: HttpRequest, res: HttpResponse) =>
    new CreateProductFactory().init(req, res)
  );
  server.post("/brands", (req: HttpRequest, res: HttpResponse) =>
    new CreateBrandFactory().init(req, res)
  );
}

export default router;
