import { Router } from "express";
import ProductManager from "../../mongo/controladores/productManager.js"


const routerProductos = Router();

routerProductos
    .post('/crear', ProductManager.createProduct)
    .get('/:id', ProductManager.getProductById)
    .get('/', ProductManager.getProducts)
    .delete('/eliminar/:id', ProductManager.deleteProductById)
    .put('/modificar/:id', ProductManager.updateProductById)

    export default routerProductos;


    /*
    [{
        "nombre":"Chocolate",
        "descripcion":"Huevo de chocolate",
        "precio":3000,
        "stock":190,
        "code":"abc123",
        "categoria":"Comida",
        "status":""
    }]
    */