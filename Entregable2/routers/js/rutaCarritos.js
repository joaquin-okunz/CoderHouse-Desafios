import { Router } from "express";
import CarrManager from "../../mongo/controladores/cartManager.js"


const routerCarritos = Router();

routerCarritos
    .post('/crear', CarrManager.CreateCarritos)
    .get('/', CarrManager.getCarritos)
    .get('/:id', CarrManager.getCarritoById)
    .post('/agregar/:cid', CarrManager.ProductosInCarrito)
    .put('/eliminarProducto/:cid', CarrManager.ProductoOffCarrito)
    .delete('/eliminar/:id', CarrManager.DeleteCarrito)
    .put('/vaciar/:id', CarrManager.VoidCarrito)

    export default routerCarritos;