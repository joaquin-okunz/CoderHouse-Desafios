import fs from "fs";

class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    addproduct(producto) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8");
            let prod = JSON.parse(Producto);
            producto.id = ++this.id;
            prod.push(producto);
            fs.writeFileSync("./Productos.json", JSON.stringify(prod));
            return prod;

        } else {
            producto.id = ++this.id;
            this.products.push(producto);
            fs.writeFileSync("./Productos.json", JSON.stringify(this.products));
            return producto;
        }
    }


    getProducts() {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8");
            let producto = JSON.parse(Producto);
            return producto;
        }
        else
            return ("El archivo no existe");
    }


    getProductById(id) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8")
            let producto = JSON.parse(Producto)
            if (producto.some(producto => producto.id == id)) {
                let producto_buscado = producto.filter(producto => producto.id == id)
                return producto_buscado;
            }
        }
        else return ("El archivo no existe");
    }

    getProductsWhithLimit(id) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8");
            let producto = JSON.parse(Producto);
            let limit = producto.filter(producto => producto.id <= id);
            return limit;
        }
    }
}

const prods = new ProductManager;
export default prods;


