import express from "express";
import prods from "./productos/Product_manager.js";
//---------------------------------------------------------------------------
const app = express();

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

//---------------------------------------------------------------------------
app.get("/productos/listar", (req, res) => {
    res.json(prods.getProducts());
})

app.get("/productos/listar/:id", (req, res) => {
    let { id } = req.params;
    res.json(prods.getProductById(id));
})

app.get("/productos/limit/:id", (req, res) => {
    let { id } = req.params;
    res.json(prods.getProductsWhithLimit(id));
})

app.post("/productos/guardar", (req, res) => {
    let producto = req.body;
    prods.addproduct(producto);
    res.json(producto);
})



//---------------------------------------------------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
