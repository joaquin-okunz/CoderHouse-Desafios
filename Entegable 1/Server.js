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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload");
    },
    filename: function (req, file, cb) {
        cb(null, `${date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage: storage });

app.post('/subir/imagen', upload.single('Imagen'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Error subiendo el archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(`!Archivo <b>${file.originalname}</b> subido exitosamente!`)
})
//---------------------------------------------------------------------------
routerProductos.get("/listar", (req, res) => {
    res.json(prods.getProducts())
})

routerProductos.get("/listar/:pid", (req, res) => {
    let { pid } = req.params;
    res.json(prods.getProductById(pid));
})


routerProductos.get("/limit/:pid", (req, res) => {
    let { pid } = req.params;
    res.json(prods.getProductsWhithLimit(pid));
})


routerProductos.post("/guardar", (req, res) => {
    let producto = req.body;
    prods.addproduct(producto);
    res.json(producto);
})

routerProductos.delete("/borrar/:pid", (req, res) => {
    let { pid } = req.params;
    let producto = prods.deleteProductsById(pid);
    res.json(producto);
})


routerProductos.put("/actualizar/:pid", (req, res) => {
    let { id } = req.params;
    let producto = req.body;
    res.json(prods.UpdateProductsById(id, producto));
})



//---------------------------------------------------------------------------

routerCarrito.get("/listar/:cid", (req, res) => {
    let { cid } = req.params;
    res.json(Carritos.getCartById(cid));
})

routerCarrito.post("/crear", (req, res) => {
    res.json(Carritos.addCart());
})

routerCarrito.get("/guardar/:cid/:pid", (req, res) => {
    let { cid } = req.params;
    let { pid } = req.params;
    res.json(Carritos.addProductInCart(cid, pid));
})


//---------------------------------------------------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))