import fs from "fs";

class Carts {
    constructor() {
        this.cart = [];
        this.id = 0;
    }

    addCart() {
        if (fs.existsSync("./Carritos.json")) {
            let Carrito = fs.readFileSync("./Carritos.json", "utf-8");
            let carrito = JSON.parse(Carrito);
            this.id = carrito[carrito.length - 1].id + 1;
            carrito.push({ id: this.id, Products: [] });
            fs.writeFileSync("./Carritos.json", JSON.stringify(carrito));
            return carrito;

        } else {
            let carrit = ++this.id;
            this.cart.push({ id: carrit, Products: [] });
            fs.writeFileSync("./Carritos.json", JSON.stringify(this.cart));
            return this.cart;

        }
    }

    getCartById(cid) {
        if (fs.existsSync("./Carritos.json")) {
            let Carrito = fs.readFileSync("./Carritos.json", "utf-8");
            let carrito = JSON.parse(Carrito);
            if (carrito.some(carrito => carrito.id == cid)) {
                let carritoBuscado = carrito.filter(carrito => carrito.id == cid);
                return carritoBuscado;
            }
            else return "Carrito no encontrado";
        }
        else return "No hay ningun carrito";
    }


    addProductInCart(cid, pid) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8");
            let producto = JSON.parse(Producto);
            if (fs.existsSync("./Carritos.json")) {
                let Carrito = fs.readFileSync("./Carritos.json", "utf-8");
                let carrito = JSON.parse(Carrito);
                if (producto.some(producto => producto.id == pid)) {
                    if (carrito.some(carrito => carrito.id == cid)) {
                        let ICar = carrito.findIndex(carrito => carrito.id == cid);
                        if (carrito[ICar].Products.some(producto => producto.id == pid)){
                            let IProd = carrito[ICar].Products.findIndex(producto => producto.id == pid);
                            carrito[ICar].Products[IProd].Quantity += 1;
                        }
                        else
                            carrito[ICar].Products.push({ "id": pid, "Quantity": 1 });
                        fs.writeFileSync("./Carritos.json", JSON.stringify(carrito));
                        return carrito[ICar];
                    }
                    else return "Carrito no encontrado";
                }
                else return "Producto no encontrado";
            }
            else return "No hay carritos";
        }
        else return "No hay productos";
    }

    deleteProductInCart(cid, pid){
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8");
            let producto = JSON.parse(Producto);
            if (fs.existsSync("./Carritos.json")) {
                let Carrito = fs.readFileSync("./Carritos.json", "utf-8");
                let carrito = JSON.parse(Carrito);
                if(carrito.some(carrito => carrito.id == cid)) {
                    let carritoBuscado = carrito.findIndex(carrito => carrito.id == cid);
                    if(carrito[carritoBuscado].Products.some(producto => producto.id == pid)){
                    let productoBuscado = carrito[carritoBuscado].Products.findIndex(producto => producto.id == pid);
                        if(carrito[carritoBuscado].Products[productoBuscado].Quantity > 1){
                            carrito[carritoBuscado].Products[productoBuscado].Quantity -= 1;
                        }else {
                            carrito[carritoBuscado].Products.splice(productoBuscado, 1);
                        }
                        fs.writeFileSync("./Carritos.json", JSON.stringify(carrito));
                        return carrito[carritoBuscado];

                    }else return "El producto no se encuentra en este carrito";
                }else return "Carrito no encontrado";
            }else return "No existe ningun carrito";
        }else return "No existe ningun producto";
    }


}



const Carritos = new Carts;
export default Carritos;