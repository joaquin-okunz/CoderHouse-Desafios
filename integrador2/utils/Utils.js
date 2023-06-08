import UserModel from "../mongo/modelos/users.js"
import modeloDeCarritos from "../mongo/modelos/cartModel.js"
import modeloDeProducto from "../mongo/modelos/productModel.js"
import Utils from "./index.js"



class Util {

    static async generateRandomNumbers(longitud) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo = '';
        for (let i = 0; i < longitud; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres.charAt(indice);

        }

        return codigo;
    }

    static async BuscarEmail(req, res) {
        const { headers: { authorization } } = req;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No se proporcionó un token válido' });
        }
        const token = authorization.substring(7);
        const decoded = await Utils.isValidToken(token);
        const userId = decoded.id
        const user = await UserModel.findOne({ _id: userId })
        const email = user.email
        return email
    }

    static async PrecioTotal(req, res) {
        const { headers: { authorization } } = req;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No se proporcionó un token válido' });
        }
        try {
            let token = authorization.substring(7);
            let decoded = await Utils.isValidToken(token);
            let userId = decoded.id
            const user = await UserModel.findOne({ _id: userId })
            let carr = user.carrito
            const carrito = await modeloDeCarritos.findOne({ _id: carr })
            let productos = carrito.Productos
            let total = 0
            for (let prod of productos) {
                const IDs = prod.Producto
                const cantidad = prod.quantity
                const prods = await modeloDeProducto.find({ _id: IDs })
                for (let precios of prods) {
                    let precio = precios.precio
                    let mult = cantidad * precio
                    let array = [];
                    array.push(mult)
                    for (let i of array) {
                        total += i
                    }
                }
            }
            return total
        } catch (error) {
            console.log(error);
        }
    }

    static Moment() {
        const fechaHoraActual = new Date();

        const dia = fechaHoraActual.getUTCDate().toString().padStart(2, '0');
        const mes = (fechaHoraActual.getUTCMonth() + 1).toString().padStart(2, '0');
        const año = fechaHoraActual.getUTCFullYear().toString().padStart(4, '0');
        const horas = fechaHoraActual.getUTCHours().toString().padStart(2, '0');
        const minutos = fechaHoraActual.getUTCMinutes().toString().padStart(2, '0');
        const segundos = fechaHoraActual.getUTCSeconds().toString().padStart(2, '0');

        const fechaHoraUTC = `${dia}-${mes}-${año} ${horas}:${minutos}:${segundos} UTC`;
        return fechaHoraUTC
    }
}

export default Util
