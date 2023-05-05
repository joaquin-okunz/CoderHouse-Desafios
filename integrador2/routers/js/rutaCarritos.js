import { Router } from "express";
import CarrManager from "../../mongo/controladores/cartManager.js"
import Utils from "../../utils/index.js";

const routerCarritos = Router();

routerCarritos
    .post('/crear',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.CreateCarritos)
    .get('/',Utils.authJWTMiddleware(['admin']), CarrManager.getCarritos)
    .get('/:id',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.getCarritoById)
    .post('/agregar/:cid',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.ProductosInCarrito)
    .put('/eliminarProducto/:cid',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.ProductoOffCarrito)
    .delete('/eliminar/:id',Utils.authJWTMiddleware(['admin']), CarrManager.DeleteCarrito)
    .put('/vaciar/:id',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.VoidCarrito)
    .put('/cantidad/:cid',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.SumarORestarProductos)


    export default routerCarritos;