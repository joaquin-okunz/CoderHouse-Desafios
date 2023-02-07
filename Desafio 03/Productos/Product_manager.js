import fs from "fs";

class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }
    //Crear un objeto.
    /*
    addproduct(title, description, price, thumbnail, code, stock) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8");
            let producto = JSON.parse(Producto);
            if (producto.some(products => products.code == code)) {
                return ("el producto ya existe");
            }
            else {
                producto.push({ name: title, description: description, price: price, thumbnail: thumbnail, code: code, id: producto[producto.length - 1].id + 1, stock: stock });
            return producto;
            } 
            fs.writeFileSync("./Productos.json", JSON.stringify(producto));
        }

        else {
            if (this.products.some(products => products.code == code)) {
                return ("el producto ya existe");
            }
            else {
                this.products.push({ name: title, description: description, price: price, thumbnail: thumbnail, code: code, id: this.products.length + 1, stock: stock });
            }
            return this.products;
            fs.writeFileSync("./Productos.json", JSON.stringify(this.products));
            
        }
    }
*/
addproduct(producto){
    if (this.products.some(products => products.code == code)) {
        return ("el producto ya existe");
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
        return("El archivo no existe");
    }

    //Buscar un producto.
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
    //Eliminar un producto.
    deleteProductById(id) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8")
            let producto = JSON.parse(Producto)
            if (producto.some(producto => producto.id == id)) {
                let newProducto = producto.filter(producto => producto.id != id)
                return newProducto;
                fs.writeFileSync("./Productos.json", JSON.stringify(newProducto))
            }
            else
                return ("El producto no existe");
        }
        else return ("El archivo no existe");
    }

    
    UptadeProductById(product, id) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8")
            let producto = JSON.parse(Producto);
            product.id = Number(id);
            let Prod = producto.findIndex(producto => producto.id == id);
            producto.splice(Prod, 1, product);
            return producto;
            fs.writeFileSync("./Productos.json", JSON.stringify(producto));
        }
        else 
        return ("El producto no existe");
    }
}

const prods = new ProductManager;
export default prods;


