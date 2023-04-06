import { Router } from "express";
import CarrManager from "../../mongo/controladores/cartManager.js"


const routerCarritos = Router();

routerCarritos
    .post('/crear', CarrManager.CreateCarritos)
    .get('/', CarrManager.getCarritos)
    .get('/:id', CarrManager.getCarritoById)
    .put('/agregar/:id', CarrManager.ProductosInCarrito)
    .delete('/eliminar/:cid/productos/:pid', CarrManager.ProductoOffCarrito)
    .delete('/eliminar/:id', CarrManager.DeleteCarrito)
    .put('/vaciar/:id', CarrManager.VoidCarrito)

    export default routerCarritos;