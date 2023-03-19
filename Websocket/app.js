import express from 'express';
import prods from "./Productos/Product_manager.js"
import _Dirname from "./utils.js";
import { Server } from "socket.io";
import http from "http";
import { create } from "hbs";


//--------------------------------------------------------------------------------------
const app = express();
const server = http.createServer(app)
let io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const hbs = create({ defaultLayout: 'main', extname: '.hbs' })

app.set("view engine", "hbs");
app.set("views", "./public");

app.use(express.static(_Dirname + "/public"));
app.use(express.static(_Dirname + "/public/layouts"));

//--------------------------------------------------------------------------------------
function getProd () {
    let productos = prods.getProducts();
    return productos;
}

function actualizar () {

}


app.post("/guardar", (req, res) => {
    let producto = req.body;
    prods.addproduct(producto);
    res.json(producto);
})

app.delete("/borrar/:pid", (req, res) => {
    let { pid } = req.params;
    let producto = prods.deleteProducts(pid);
    res.json(producto);
})

app.get("/", (req,res) => {
    let productos = prods.getProducts();
    res.render("index", {productos});
})

//--------------------------------------------------------------------------------------
app.get("/realTime", (req,res) => {
    let productos = prods.getProducts();
    const script = { socket: '/socket.io/socket.io.js', index: '/js/index.js', prod : productos}
    res.render("realTimeProducts", script);

})

io.on('connection', (clienteSocket) => {

    console.log('cliente conectado');

    clienteSocket.emit('inicio', getProd() );

    
    clienteSocket.on("desconection", () => {
        console.log("cliente desconectado");
    });
})

export default app;

const PORT = 8080
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
