import { Router } from "express";

import PRouter from "./VProductos.js";
import CRouter from "./VCarritos.js";

const ViewRouter = Router()

ViewRouter.use('/productos', PRouter);
ViewRouter.use('/carritos', CRouter);

export default ViewRouter;