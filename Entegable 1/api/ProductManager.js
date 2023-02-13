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
            this.id = prod[prod.length - 1].id + 1;
            producto.id = this.id;
            prod.push(producto);
            fs.writeFileSync("./Productos.json", JSON.stringify(prod));

        } else {
            producto.id = ++this.id;
            this.products.push(producto);
            fs.writeFileSync("./Productos.json", JSON.stringify(this.products));
            
        }
    }


    getProducts() {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8");
            let producto = JSON.parse(Producto);
            return producto;
        }
        else
            return ("No hay productos");
    }


    getProductById(pid) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8")
            let producto = JSON.parse(Producto)
            if (producto.some(producto => producto.id == pid)) {
                let producto_buscado = producto.filter(producto => producto.id == pid)
                return producto_buscado;
            }
            else return "El producto no existe";
        }
        else return "El archivo no existe";
    }

    getProductsWhithLimit(pid) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8");
            let producto = JSON.parse(Producto);
            let limit = producto.filter(producto => producto.id <= pid);
            return limit;
        }
    }

    deleteProductsById(pid) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8");
            let producto = JSON.parse(Producto);
            if(producto.some(producto => producto.id == pid)){
            let newProduct = producto.find(products => products.id != pid);
            fs.writeFileSync("./Productos.json", JSON.stringify(newProduct));
            return newProduct;  
        }
        }
    }

         //En obras
        UpdateProductsById(id ,Productito){
            if (fs.existsSync("./Productos.json")) {
                let Producto = fs.readFileSync("./Productos.json", "utf-8");
                let producto = JSON.parse(Producto);
                if(producto.some(producto => producto.id == id)){
                    Productito.id = Number(id)
                    let productoBuscado = producto.findIndex( producto => producto.id == id)
                    this.productos.splice(productoBuscado,1,Productito);
                }
                else return "No se encontró el producto";
            }
            else return "No hay productos"
        }
        //En obras
}

const prods = new ProductManager;
export default prods;