import { Router } from "express";

import modeloDeCarritos from "../../mongo/modelos/cartModel.js";

const CRouter = Router()

CRouter.get('/:id', async (req,res) => {
    try {
        const { id } = req.params; 
        const carrito = await modeloDeCarritos.findById(id).populate("Productos.Producto").lean();
        if(!carrito){
            throw new Error(`el carrito ${id} no se pudo encontrar`)
        }
            res.render("Carritos", { carrito: carrito.Productos } );
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
})

export default CRouter;