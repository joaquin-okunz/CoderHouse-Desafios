import { Router } from "express";

import modeloDeCarritos from "../../mongo/modelos/cartModel.js";

const CRouter = Router()

CRouter.get('/:id', async (req,res) => {
    const id = req.params;
    const carrito = modeloDeCarritos.findOne({_id:id});
    res.render("Carritos", carrito);
})

export default CRouter;