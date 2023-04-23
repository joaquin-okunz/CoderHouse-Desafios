import { Router } from "express";

import PRouter from "./VProductos.js";
import CRouter from "./VCarritos.js";
import Vrouter from "./Vsessions.js";

const ViewRouter = Router()

ViewRouter.use('/productos', PRouter);
ViewRouter.use('/carritos', CRouter);
ViewRouter.use('/', Vrouter);

export default ViewRouter;