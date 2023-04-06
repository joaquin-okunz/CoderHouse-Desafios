import modeloDeCarritos from "../modelos/cartModel.js";
import modeloDeProducto from "../modelos/productModel.js"; 
class CarrManager {

    static async CreateCarritos(req, res) {
        const Carrito = {
            Productos: {}
        }
        const result = modeloDeCarritos.create(Carrito);
        res.status(200).json(result);
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
    
      /*
    static async ProductosInCarrito(req, res) {
        const { params: { pid, cid }} = req.body;
        
            try {
                let CBuscar = await modeloDeCarritos.findById(cid);
                if(CBuscar.Productos.some(prod => prod.id = pid)){
                    CBuscar.Productos.quantity += 1;
                }
                else{
                CBuscar.Productos.push(pid);
                await modeloDeCarritos.updateOne({_id: cid}, CBuscar);
                const result = await modeloDeCarritos.findById(cid).populate('Productos.Producto');
                res.status(200).json(result);
                }
                }
               
            catch {
                res.status(404).send("Carrito no encontrado");
            }
        }
*/
        static async ProductosInCarrito(req, res) {
            const { cid, pid } = req.body;
          
            try {
              let CBuscar = await modeloDeCarritos.findById(cid);
              let productoEncontrado = CBuscar.Productos.find(prod => prod.id === pid);
          
              if (productoEncontrado) {
                // si el producto ya está en el carrito, se incrementa su cantidad
                productoEncontrado.quantity += 1;
              } else {
                // si el producto no está en el carrito, se agrega con cantidad 1
                CBuscar.Productos.push({ id: pid, quantity: 1 });
              }
          
              await modeloDeCarritos.updateOne({ _id: cid }, CBuscar);
              const result = await modeloDeCarritos.findById(cid).populate('Productos.Producto');
              res.status(200).json(result);
            } catch (error) {
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
        const { params: { id } } = req
        const result = await modeloDeCarritos.deleteOne({ _id: id });
        if (!result) {
            res.status(404).send("Carrito no encontrado.");
          }
          else res.status(201).json(result);
        }
    

    static async VoidCarrito(req, res) {
        const id = req.params;
        const carrito = await modeloDeCarritos.findOne({_id : id});
        carrito[Productos].splice(0, carrito[Productos].length);
        res.status(200).send("Carrito vaciado Exitosamente").end()
    }


}


export default CarrManager;