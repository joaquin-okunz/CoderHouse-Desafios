import express from "express";
import prods from "./Productos/Product_manager.js";
//---------------------------------------------------------------------------
const app = express();

app.use(express.static("public"));

//app.use(express.urlencoded({ extended: true }));

//---------------------------------------------------------------------------
app.get("/productos/listar", (req, res) => {
    res.json(prods.getProducts());
})

app.get("/productos/listar/:id", (req, res) => {
    let { id } = req.params;
    res.json(prods.getProductById(id));
})

app.post("/productos/guardar", (req, res) => {
    let producto = req.body;
    prods.addproduct(producto);
    res.send(producto);
})

app.put("/productos/actualizar/:id", (req, res) => {
    let { id } = req.params;
    let Producto = req.body;
    prods.UptadeProductById(Producto, id);
    res.json(Producto);
})

app.delete("/productos/eliminar/:id", (req, res) => {
    let { id } = req.params;
    let Producto = prods.deleteProductById(id);
    res.json(Producto);
})

//---------------------------------------------------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
