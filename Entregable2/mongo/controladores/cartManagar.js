import modeloDeCarritos from "../modelos/cartModel.js";
import modeloDeProducto from "../modelos/productModel.js";

class CarrManager {

    static async CreateCarritos(req, res) {
        const Carrito = {
            Productos: {}
        }
        const result = modeloDeCarritos.create(Carrito);
        res.status(200).send("Carrito creado Exitosamente").json(result);
    }


    static async getCarritoById(req, res) {
        const id = req.params;
        const result = await modeloDeCarritos.findOne({ _id: id });
        res.status(200).json(result);
        
    }

    static async ProductosInCarrito(req, res) {
        const cid = req.params;
        const body = req.body;
        
            try {
                let CBuscar = modeloDeCarritos.findOne({ _id: cid });
                const Products = CBuscar[Productos];
                Products.push({
                    ...body
                })
                res.status(200).send(`Productos Incorporado al carrito:{${cid}} exitosamente`);
                }
               
                
            
            catch {
                res.status(404).send("Carrito no encontrado");
            }
        }
        



    

    static async ProductoOffCarrito(req, res) {
        const pid = req.params;
        const cid = req.params;
        try {
            let CBuscar = modeloDeCarritos.findOne({ _id: cid });
                if (CBuscar[Productos].some(prod => prod.id == pid)) {
                    let PBuscar = CBuscar[Productos].findIndex(prod => prod.id = pid);
                    if(CBuscar.Productos[PBuscar].cantidad > 1){
                        const result = CBuscar.Productos[PBuscar].cantidad -= 1;
                        res.status(200).send("Producto borrado con exito");
                    }
                    else {
                        const result = CBuscar[Productos].splice(PBuscar, 1);
                        res.status(200).send("Producto borrado con exito");
                    }
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
        await modeloDeCarritos.deleteOne({ _id: id });
        res.status(200).send("Carrito borrado Exitosamente").end()
    }

    static async VoidCarrito(req, res) {
        const id = req.params;
        const carrito = await modeloDeCarritos.findOne({_id : id});
        carrito[Productos].splice(0, carrito[Productos].length);
        res.status(200).send("Carrito vaciado Exitosamente").end()
    }


}


export default CarrManager;