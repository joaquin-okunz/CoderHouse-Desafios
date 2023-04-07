import modeloDeCarritos from "../modelos/cartModel.js";
import modeloDeProducto from "../modelos/productModel.js";
class CarrManager {

    static async CreateCarritos(req, res) {
        const { body } = req
        const result = await modeloDeCarritos.create(body)
        res.status(201).json(result)
    }

    static async getCarritos(req, res) {
        const result = await modeloDeCarritos.find().populate('Productos.Producto');
        res.status(201).json(result)
    }

    static async getCarritoById(req, res) {
        const id = req.params.id;
        const result = await modeloDeCarritos.findById(id).populate('Productos.Producto');
        if (!result) {
            res.status(404).send("Carrito no encontrado.");
        }
        else res.status(201).json(result)
    }


    static async ProductosInCarrito(req, res) {
        const { cid, pid } = req.body;
        try {
            let carrito = await modeloDeCarritos.findById(cid).populate("Productos.Producto");
            if (!carrito) {
                return res.status(404).json({ message: "Carrito no encontrado" });
            }
            const productIndex = carrito.Productos.findIndex(
                (p) => p.Producto && p.Producto._id.toString() === pid
            );
            if (productIndex >= 0) {
                carrito.Productos[productIndex].quantity += 1;
            } else {
                carrito.Productos.push({ Producto: pid });
            }
            await carrito.save();
            return res.status(200).json(carrito);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "SERVER ERROR" });
        }
    }

    static async ProductoOffCarrito(req, res) {
        const { pid, cid } = req.body;
    
        try {
          const carrito = await modeloDeCarritos.findById(cid).populate("Productos.Producto");
          if (!carrito) {
            return res.status(404).json( "No se ha podido encontrar el carrito");
          }
          const productIndex = carrito.Productos.findIndex(
            (p) => p.Producto._id.toString() === pid
          );
          if (productIndex >= 0) {
            carrito.Productos[productIndex].quantity -= 1;
            if (carrito.Productos[productIndex].quantity === 0) {
                carrito.Productos.splice(productIndex, 1);
            }
            await carrito.save();
            return res.status(200).json(carrito);
          } else {
            return res.status(404).json("No se ha podido borrar el producto");
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json("Internal server error");
        }
      }




    static async DeleteCarrito(req, res) {
        const { params: { id } } = req
        const result = await modeloDeCarritos.deleteOne({ _id: id });
        if (!result) {
            res.status(404).send("Carrito no encontrado.");
        }
        else res.status(201).json(result);
    }


    static async VoidCarrito(req, res) {
        const id = req.params.id.toString();
        const carrito = await modeloDeCarritos.findById(id);
        if (carrito) {
            carrito.Productos.splice(0, carrito.Productos.length);
            await carrito.save();
            res.status(200).send("Carrito vaciado Exitosamente");
        } else {
            res.status(404).send("Not found");
        }
    }
    


}


export default CarrManager;