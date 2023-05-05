import { Router } from "express";
import ProductManager from "../../mongo/controladores/productManager.js"
import Utils from "../../utils/index.js";


const routerProductos = Router();

routerProductos
    .post('/crear',Utils.authJWTMiddleware(['admin']),ProductManager.createProduct)
    .get('/:id', Utils.authJWTMiddleware(['admin']), ProductManager.getProductById)
    .get('/categoria/:cate',Utils.authJWTMiddleware(['admin', 'user']), ProductManager.getProductsCategory)
    .get('/',Utils.authJWTMiddleware(['admin', 'user']), ProductManager.getProducts)
    .delete('/eliminar/:id',Utils.authJWTMiddleware(['admin']), ProductManager.deleteProductById)
    .put('/modificar/:id',Utils.authJWTMiddleware(['admin']), ProductManager.updateProductById)

    export default routerProductos;