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



    deleteProducts(pid) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8");
            let producto = JSON.parse(Producto);
            if (producto.some(producto => producto.id == pid)) {
                let newProduct = producto.filter(producto => producto.id != pid);
                fs.writeFileSync("./Productos.json", JSON.stringify(newProduct));
                return newProduct;
            }
            else return "Producto no encontrado";
        }
    }

getProducts(){
    if (fs.existsSync("./Productos.json")) {
        let Producto = fs.readFileSync("./Productos.json", "utf-8");
        let producto = JSON.parse(Producto);
        return producto;

    }else return "No hay Productos";
}
}


const prods = new ProductManager;
export default prods;