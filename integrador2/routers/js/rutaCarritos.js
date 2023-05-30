import { Router } from "express";
import CarrManager from "../../mongo/controladores/cartManager.js"
import Utils from "../../utils/index.js";
import Util from "../../utils/Utils.js";

const routerCarritos = Router();

routerCarritos
    .post('/crear',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.CreateCarritos)
    .get('/',Utils.authJWTMiddleware(['admin']), CarrManager.getCarritos)
    .get('/micarrito',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.getCarritoById)
    .post('/agregar',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.ProductosInCarrito)
    .put('/eliminarProducto',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.ProductoOffCarrito)
    .put('/vaciar',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.VoidCarrito)
    .put('/cantidad',Utils.authJWTMiddleware(['admin', 'user']), CarrManager.SumarORestarProductos)
    .post('/comprar', Utils.authJWTMiddleware(['admin','user']), CarrManager.compraDeProducto)
    .post('/prueba', Utils.authJWTMiddleware(['admin','user']), Util.Moment)
    export default routerCarritos;