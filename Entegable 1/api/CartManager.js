class Carts {
    constructor() {
        this.cart = [];
        this.id = 0;
    }

    addCart() {
        if (fs.existsSync("./Carritos.json")) {
            let Carrito = fs.readFileSync("./Carritos.json", "utf-8");
            let carrito = JSON.parse(Carrito);
            this.id = cart[prod.length - 1].id + 1;
            let carrit = this.id;
            carrito.push({ id: carrit, Productos: [] });
            fs.writeFileSync("./Carritos.json", JSON.stringify(carrito));
            return carrito;

        } else {
            let carrit = ++this.id;
            this.cart.push({ id: carrit, Productos: [] });
            fs.writeFileSync("./Carritos.json", JSON.stringify(this.cart));
            return this.cart;

        }
    }

    getCartById(cid) {
        if (fs.existsSync("./Carritos.json")) {
            let Carrito = fs.readFileSync("./Carritos.json", "utf-8");
            let carrito = JSON.parse(Carrito);
            if (carrito.some(carrito => carrito.cid == cid)) {
                let carritoBuscado = carrito.filter(carrito => carrito.cid == cid);
                return carritoBuscado;
            }
            else return "Carrito no encontrado";
        }
        else return "No hay ningun carrito";
    }

    //PERDON POR ESTO :(
    addProductInCart(cid, pid) {
        if (fs.existsSync("./Carritos.json")) {
            if (fs.existsSync("./Productos.json")) {
                let Carrito = fs.readFileSync("./Carritos.json", "utf-8");
                let carrito = JSON.parse(Carrito);
                let Producto = fs.readFileSync("./Productos.json", "utf-8");
                let producto = JSON.parse(Producto);
                if (carrito.some(carrito => carrito.cid == cid)) {
                    let carritoBuscado = carrito.filter(carrito => carrito.cid == cid);
                    if (producto.some(producto => producto.pid == pid)) {
                        let cantidadDeProductos = 0;
                        let cantidadProducto = ++cantidadDeProductos;
                        if (carritoBuscado[0].Productos.some(producto => producto.pid == pid)) {
                            ++cantidadProducto;
                        }
                        else
                            carritoBuscado[0].Productos.push({ id: pid, quantity: cantidadProducto });
                    }
                    else return "Producto no encontrado";
                }
                else return "Carrito no encontrado";
            }
            else return "No hay productos";
        }
        else return "No hay carritos";
    }
}


const Carritos = new Carts;
export default Carritos;