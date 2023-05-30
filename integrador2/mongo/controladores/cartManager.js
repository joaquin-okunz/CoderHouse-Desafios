import modeloDeCarritos from "../modelos/cartModel.js";
import modeloDeProducto from "../modelos/productModel.js";
import UserModel from "../modelos/users.js"
import Utils from "../../utils/index.js"
import TiketModel from "../modelos/ticket.js"
import Util from "../../utils/Utils.js"



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
        const { headers: { authorization } } = req;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No se proporcionó un token válido' });
        }
        const token = authorization.substring(7);
        const decoded = await Utils.isValidToken(token);
        const userId = decoded.id
        const user = await UserModel.findOne({ _id: userId })
        let carritoId = user.carrito
        let carrito = await modeloDeCarritos.findOne({ _id: carritoId }).populate("Productos.Producto");
        const result = carrito
        if (!result) {
            res.status(404).send("Carrito no encontrado.");
        }
        else res.status(201).json(result)
    }


    static async ProductosInCarrito(req, res) {
        const { body: { pid }, headers: { authorization } } = req;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No se proporcionó un token válido' });
        }
        try {
            const token = authorization.substring(7);
            const decoded = await Utils.isValidToken(token);
            const userId = decoded.id
            const user = await UserModel.findOne({ _id: userId });
            let carritoId = user.carrito
            let carrito = await modeloDeCarritos.findOne({ _id: carritoId }).populate("Productos.Producto");
            if (!carrito) {
                return res.status(404).json({ message: "Carrito no encontrado" });
            }
            const productIndex = carrito.Productos.findIndex(
                (p) => p.Producto && p.Producto._id.toString() === pid
            )

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



    static async SumarORestarProductos(req, res) {
        const { body: { pid, num }, headers: { authorization } } = req;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No se proporcionó un token válido' });
        }
        try {
            const token = authorization.substring(7);
            const decoded = await Utils.isValidToken(token);
            const userId = decoded.id
            const user = await UserModel.findOne({ _id: userId });
            let carritoId = user.carrito
            let carrito = await modeloDeCarritos.findOne({ _id: carritoId }).populate("Productos.Producto");
            if (!carrito) {
                return res.status(404).json("Carrito no encontrado");
            }
            const productIndex = carrito.Productos.findIndex(
                (p) => p.Producto && p.Producto._id.toString() === pid
            );
            if (productIndex) {
                carrito.Productos[productIndex].quantity = num;
            }
            if (num <= 0) {
                carrito.Productos.splice(productIndex, 1);
            }
            await carrito.save();
            return res.status(200).json(carrito);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "SERVER ERROR" });
        }
    }


    static async ProductoOffCarrito(req, res) {
        const { body: { pid, num }, headers: { authorization } } = req;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No se proporcionó un token válido' });
        }
        try {
            const token = authorization.substring(7);
            const decoded = await Utils.isValidToken(token);
            const userId = decoded.id
            const user = await UserModel.findOne({ _id: userId });
            let carritoId = user.carrito
            let carrito = await modeloDeCarritos.findOne({ _id: carritoId }).populate("Productos.Producto");
            if (!carrito) {
                return res.status(404).json("No se ha podido encontrar el carrito");
            }
            const productIndex = carrito.Productos.findIndex(
                (p) => p.Producto._id.toString() === pid
            );
            if (productIndex > 0) {
                carrito.Productos[productIndex].quantity -= 1;
                if (carrito.Productos[productIndex].quantity <= 0) {
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

    static async VoidCarrito(req, res) {
        const { headers: { authorization } } = req;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No se proporcionó un token válido' });
        }
        const token = authorization.substring(7);
        const decoded = await Utils.isValidToken(token);
        const userId = decoded.id
        const user = await UserModel.findOne({ _id: userId });
        let carritoId = user.carrito
        let carrito = await modeloDeCarritos.findOne({ _id: carritoId })
        if (carrito) {
            carrito.Productos.splice(0, carrito.Productos.length);
            await carrito.save();
            res.status(200).send("Carrito vaciado Exitosamente");
        } else {
            res.status(404).send("Not found");
        }
    }


    static async compraDeProducto(req, res) {
        const { headers: { authorization } } = req;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No se proporcionó un token válido' });
        }
        try {
            const token = authorization.substring(7);
            const decoded = await Utils.isValidToken(token);
            const userId = decoded.id
            const user = await UserModel.findOne({ _id: userId });
            let carritoId = user.carrito
            let carrito = await modeloDeCarritos.findOne({ _id: carritoId })

            let code = Util.generateRandomNumbers
            let fecha = Util.Moment
            let amount = Util.PrecioTotal(authorization)
            let purchaser = Util.BuscarEmail(authorization)

            if (!carrito) {
                return res.status(404).json("Carrito no encontrado");
            }
            let carprod = carrito.Productos
            for (let productos of carprod) {
                const IDs = productos.Producto
                const cantidad = productos.quantity
                let Prods = await modeloDeProducto.find(IDs)
                for (let sto of Prods) {
                    const stock = sto.stock
                    const result = stock - cantidad;
                    await Prods.save();
                }
                carrito.Productos.splice(0, carrito.Productos.length);
                await carrito.save();
            }
            let ticket = {
                code: { code },
                purchase_datetime: { fecha },
                amount: { amount },
                purchaser: { purchaser },
            }
            let result = TiketModel.create(ticket)
            if (!ticket) {
                return res.status(401).json({ error: 'Ocurrió un error al generar el tiket' });
            }
            else {
                return res.json(ticket)
            }
            res.json("Ok")
        } catch (error) {
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    }
}

export default CarrManager;