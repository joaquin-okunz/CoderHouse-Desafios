import express from "express";
import bodyParser from "body-parser";
import prods from "./api/ProductManager.js";
import Carritos from "./api/CartManager.js";
import multer from "multer";
//---------------------------------------------------------------------------
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
//Configuramos multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const uploads = multer({storage: storage})

app.post('/subir', uploads.single('miArchivo'), (req, res, next) => {
    const file = req.file
    if(!file){
        const error = new Error('Error subiendo el archivo');
        error.httpStatusCode = 400;
        return next(error);
    }
    else res.send(`!Archivo subido exitosamente!`);
})
//---------------------------------------------------------------------------
//Listar todos los productos
routerProductos.get("/listar", (req, res) => {
    res.json(prods.getProducts())
})
//Listar los productos por id
routerProductos.get("/listar/:pid", (req, res) => {
    let { pid } = req.params;
    res.json(prods.getProductById(pid));
})

//Listar todos los productos hasta sierto limite
routerProductos.get("/limit/:pid", (req, res) => {
    let { pid } = req.params;
    res.json(prods.getProductsWhithLimit(pid));
})

//Guardar productos
routerProductos.post("/guardar", (req, res) => {
    let producto = req.body;
    prods.addproduct(producto);
    res.json(producto);
})

//Borrar productos
routerProductos.delete("/borrar/:pid", (req, res) => {
    let { pid } = req.params;
    let producto = prods.deleteProducts(pid);
    res.json(producto);
})

//Actualizar productos
routerProductos.put("/actualizar/:pid", (req, res) => {
    let { pid } = req.params;
    let prod = req.body;
    res.json(prods.UpdateProductsById(pid, prod));
})



//---------------------------------------------------------------------------

//Listar carrito por id
routerCarrito.get("/listar/:cid", (req, res) => {
    let { cid } = req.params;
    res.json(Carritos.getCartById(cid));
})

//Crear carrito
routerCarrito.post("/crear", (req, res) => {
    res.json(Carritos.addCart());
})

//Agregar un producto especifico dentro de un carrito especifico.
routerCarrito.post("/:cid/productos/:pid", (req, res) => {
    let  cid  = req.params.cid;
    let  pid  = req.params.pid;
    res.json(Carritos.addProductInCart(cid, pid));
})


//---------------------------------------------------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
