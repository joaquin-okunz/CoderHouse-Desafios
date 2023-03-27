import { Router } from "express";

import modeloDeProducto from "../../mongo/modelos/productModel.js";

const PRouter = Router()

PRouter.get('/', async (req,res) =>{
    const productos = await modeloDeProducto.find();
    res.render("Productos", productos);
})

export default PRouter;