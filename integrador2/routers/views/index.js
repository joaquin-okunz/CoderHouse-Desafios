import { Router } from "express";

import PRouter from "./VProductos.js";
import CRouter from "./VCarritos.js";
import Chatrouter from "./chat.js";
import UsersRouter from "./users.js";

const ViewRouter = Router()

ViewRouter.use('/productos', PRouter);
ViewRouter.use('/carritos', CRouter);
ViewRouter.use('/chat', Chatrouter);
ViewRouter.use("/user", UsersRouter);

export default ViewRouter;