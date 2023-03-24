import http from "http";
import express from "express";
import bodyParser from "body-parser";
import CProductos from "./dao/Controladores/CProductos.js";
import ProductosModel from "./Modelos/MProductos.js";
import CarritosModel from "./Modelos/MCarritos.js";
import CCarritos from "./dao/Controladores/CCarritos.js";
import { uploader } from "./Multer.js";
import { init } from "./db/Mongodb.js";
import { inet } from "./Socket.js"


//---------------------------------------------------------------------------
init();

const app = express();

app.use(express.static('public'));

const routerProductos = express.Router();
const routerCarrito = express.Router();

app.use("/productos", routerProductos);
app.use("/carritos", routerCarrito);

routerProductos.use(bodyParser.json());
routerCarrito.use(bodyParser.json());

routerProductos.use(bodyParser.urlencoded({ extended: true }));
routerCarrito.use(bodyParser.urlencoded({ extended: true }));

//--------------------------------------------------------------------------- 
//Listar todos los productos
routerProductos.get("/listar", (req, res) => {
    const result = CProductos.getProducts();
    res.json(result);
})
//Listar los productos por id
routerProductos.get("/listar/:pid", (req, res) => {
    const result = CProductos.getProductById();
    res.json(result);
})


//Guardar productos
routerProductos.post("/guardar", (req, res) => {
    const result = (uploader.single('imagen'), CProductos.createProduct());
    res.json(result);
})

//Borrar productos
routerProductos.delete("/borrar/:pid", (req, res) => {
    const result = CProductos.deleteProductById;
    res.json(result);
})

//Actualizar productos
routerProductos.put("/actualizar/:pid", (req, res) => {
    const result = CProductos.updateProductById;
    res.json(result);
})

/*

routerProductos.get('/', CProductos.getProducts)
routerProductos.post('/', uploader.single('avatar'), CProductos.createProduct)
routerProductos.get('/:id', CProductos.getProductById)
routerProductos.put('/:id', CProductos.updateProductById)
routerProductos.delete('/:id', CProductos.deleteProductById)
*/
//---------------------------------------------------------------------------

//Listar carrito por id
routerCarrito.get("/listar/:cid", (req, res) => {
    const result = CCarritos.getCarritos();
    res.json(result);
})

//Crear carrito
routerCarrito.post("/crear", (req, res) => {
    const result = CreateCarritos();
    res.json(result);
})

//Agregar un producto especifico dentro de un carrito especifico.
routerCarrito.post("/:cid/productos/:pid", (req, res) => {
    const result = CCarritos.ProductoInCarrito();
    res.json(result);
})

//Eliminar un producto especifico dentro de un carrito especifico.
routerCarrito.delete("/:cid/deleteproductos/:pid", (req, res) => {
    const result = CCarritos.ProductoOffCarrito();
    res.json(result);
})


//---------------------------------------------------------------------------  <-- CAMBIAR


const PORT = process.env.NODE_PORT || 8080
const ENV = process.env.NODE_ENV || 'local'

const server = http.createServer(app)
inet(server);

server.listen(PORT, () => {
  console.log(`Server running in PORT:${PORT} in ${ENV} environment.`)
})
