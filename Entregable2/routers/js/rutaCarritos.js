import { Router } from "express";
import CarrManager from "../../mongo/controladores/cartManagar.js"


const routerCarritos = Router();

routerCarritos
    .post('/crear', CarrManager.CreateCarritos)
    .get('/:id', CarrManager.getCarritoById)
    .put('/cambiar/:cid', CarrManager.ProductosInCarrito)
    .delete('/eliminar/:cid/productos/:pid', CarrManager.ProductoOffCarrito)
    .delete('/eliminar/:id', CarrManager.DeleteCarrito)
    .put('/vaciar/:id', CarrManager.VoidCarrito)

    export default routerCarritos;