import { Router } from "express";

import modeloDeProducto from "../../mongo/modelos/productModel.js";

const PRouter = Router()

PRouter.get('/', async (req,res) =>{
    const Productos = await modeloDeProducto.find().lean();
    console.log(Productos)
    res.render("Productos", {productos: Productos});
})

export default PRouter;