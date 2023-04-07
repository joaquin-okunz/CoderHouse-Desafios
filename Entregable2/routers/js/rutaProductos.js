import { Router } from "express";
import ProductManager from "../../mongo/controladores/productManager.js"


const routerProductos = Router();

routerProductos
    .post('/crear', ProductManager.createProduct)
    .get('/:id', ProductManager.getProductById)
    .get('/categoria/:cate', ProductManager.getProductsCategory)
    .get('/', ProductManager.getProducts)
    .delete('/eliminar/:id', ProductManager.deleteProductById)
    .put('/modificar/:id', ProductManager.updateProductById)

    export default routerProductos;