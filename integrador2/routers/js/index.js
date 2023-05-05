import { Router } from "express";

import routerCarritos from "./rutaCarritos.js";
import routerProductos from "./rutaProductos.js";
import ChatRouter from "./chat.js";
import UsersRouter from "./users.js";
import AUrouter from "./auth.js";

const ApiRouter = Router();

ApiRouter.use("/carritos", routerCarritos);
ApiRouter.use("/productos", routerProductos);
ApiRouter.use("/chat", ChatRouter)
ApiRouter.use("/user", UsersRouter)
ApiRouter.use("/", AUrouter)

export default ApiRouter;