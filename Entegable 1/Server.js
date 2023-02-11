import express from "express";
import prods from "./api/ProductManager.js";
import Carritos from "./api/CartManager.js";
import multer from "multer";
//---------------------------------------------------------------------------
const app = express();
const routerProductos = express.Router();
const routerCarrito = express.Router();

app.use("/productos", routerProductos);
app.use("/carritos", routerCarrito);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

routerProductos.use(express.json());
routerCarrito.use(express.json());

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
routerProductos.get("/productos/listar", (req, res) => {
    res.json(prods.getProducts())
})

routerProductos.get("/productos/listar/:pid", (req, res) => {
    let { id } = req.params;
    res.json(prods.getProductById(id));
})


routerProductos.get("/productos/limit/:pid", (req, res) => {
    let { id } = req.params;
    res.json(prods.getProductsWhithLimit(id));
})


routerProductos.post("/productos/guardar", (req, res) => {
    let producto = req.body;
    prods.addproduct(producto);
    res.send(producto);
})

routerProductos.delete("/productos/eliminar/:pid", (req, res) => {
    let { id } = req.params;
    res.json(prods.deleteProductsById(id));
})

/*
routerProductos.put("/productos/actualizar/pid", (req,res) => {
    let foto = "Di patataa";
})
*/
//---------------------------------------------------------------------------

routerCarrito.get("/carritos/listar/:cid", (req, res) => {
    let { cid } = req.params;
    res.json(Carritos.getCartById(cid));
})

routerCarrito.post("/carritos/crear", (req, res) => {
    res.json(Carritos.addCart());
})

routerCarrito.get("/carritos/guardar/:cid/:pid", (req, res) => {
    let {cid} = req.params;
    let {pid} = req.params;
    res.json(Carritos.addProductInCart(cid, pid));
})


//---------------------------------------------------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))