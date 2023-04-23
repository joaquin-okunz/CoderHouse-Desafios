import { Router } from "express";

import routerCarritos from "./rutaCarritos.js";
import routerProductos from "./rutaProductos.js";
import Arouter from "./APIsessions.js";

const ApiRouter = Router();

ApiRouter.use("/carritos", routerCarritos);
ApiRouter.use("/productos", routerProductos);
ApiRouter.use("/sessions", Arouter);

export default ApiRouter;

/*
[{
    "nombre":"Elio",
    "apellido":"DT",
    "correo":"elioDT@gmail.com",
    "edad":"60",
    "contraseña":"abc123",
}]
*/