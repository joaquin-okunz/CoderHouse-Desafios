import { Router } from "express";

import modeloDeCarritos from "../../mongo/modelos/cartModel.js";

const CRouter = Router()

CRouter.get('/:id', async (req,res) => {
    const id = req.params;
    const carrito = modeloDeCarritos.findById(id).lean();
    res.render("Carritos", carrito);
})

export default CRouter;