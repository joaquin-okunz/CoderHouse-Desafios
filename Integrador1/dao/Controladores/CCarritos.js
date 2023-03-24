import CarritosModel from  "../../Modelos/MCarritos.js";
import ProductosModel from "./CProductos.js"

class CarrManager {

    static async CreateCarritos(req, res) {
        const Carrito = {
            Productos: {}
        }
        const result = CarritosModel.create(Carrito);
        res.status(200).send("Carrito creado Exitosamente").json(result);
    }

    static async getCarritos(req, res) {
        const id = req.params;
        const result = await CarritosModel.findOne({ _id: id });
        res.status(200).json(result)
    }

    static async ProductoInCarrito(req, res) {
        const pid = req.params;
        const cid = req.params;
        try {
            let PBuscar = ProductosModel.findOne({ _id: pid });
            try {
                let CBuscar = CarritosModel.findOne({ _id: cid });
                if (CBuscar[Productos].some(prod = prod.id != pid)) {
                    const result = CBuscar[Productos].push({
                        Id: pid,
                        Cantidad: 1,
                    })
                    res.status(200).send("Producto añadido con exito").json(result);
                }
                else {
                    const result = CBuscar.Productos[PBuscar].cantidad + 1;
                    res.status(200).send("Producto añadido con exito").json(result);
                }
            }
            catch {
                res.status(404).send("Carrito no encontrado");
            }
        }
        catch {
            res.status(404).send("Producto no encontrado");
        }



    }

    static async ProductoOffCarrito(req, res) {
        const pid = req.params;
        const cid = req.params;
        try {
            let CBuscar = CarritosModel.findOne({ _id: cid });
                if (CBuscar[Productos].some(prod => prod.id == pid)) {
                    let PBuscar = CBuscar[Productos].findIndex(prod => prod.id = pid);
                    if(CBuscar.Productos[PBuscar].cantidad > 1){
                        const result = CBuscar.Productos[PBuscar].cantidad -= 1;
                    }
                    else {
                        const result = CBuscar[Productos].splice(PBuscar, 1);
                    }
                    await CarritosModel.updateOne({_id: '641a3e21619981f4b01c2af6'}, result);
                }
                else {
                    res.status(404).send("No se econtro un producto dentro del carrito");
                }
            
        }
        catch {
            res.status(404).send("Carrito no encontrado");
        }
    }


    static async DeleteCarrito(req, res) {
        const id = req.params;
        await CarritosModel.deleteOne({ _id: id });
        res.status(200).send("Carrito borrado Exitosamente").end()
    }
}


const CCarritos = new CarrManager;
export default CCarritos;



