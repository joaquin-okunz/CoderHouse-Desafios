import { Router } from "express";

import routerCarritos from "./rutaCarritos.js";
import routerProductos from "./rutaProductos.js";

const ApiRouter = Router();

ApiRouter.use("/carritos", routerCarritos);
ApiRouter.use("/productos", routerProductos);

export default ApiRouter;