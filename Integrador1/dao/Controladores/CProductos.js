import ProductosModel from  "../../Modelos/MProductos.js";

class ProductManager {

    static async createProduct(req, res) {
        const { body, file } = req
        const producto = {
          ... body,
          imagen: `../../views/upload/${file.originalname}`,
        }
        const result = await ProductosModel.create(producto)
        res.status(200).send("Producto creado Exitosamente").json(result)
      }

    static async getProducts(req, res) {
        const result = await ProductosModel.find()
        res.status(200).json(result)
    }

    static async getProductById(req, res) {
        const id = req.params;
    const result = await ProductosModel.findById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).send("Producto encontrado exitosamente").json(result)
  }

  static async updateProductById(req, res) {
    const id = req.params;
    const body = req.body;
    await ProductosModel.updateOne({_id: id}, {$set: body})
    res.status(200).send("Producto actualizado Exitosamente").end()
  }

  static async deleteProductById(req,res) {
    const id = req.params;
    await ProductosModel.deleteOne({_id: id})
    res.status(200).send("Producto borrado Exitosamente").end()
  }
}

const CProductos = new ProductManager;
export default CProductos;