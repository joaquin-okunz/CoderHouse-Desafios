import modeloDeProducto from "../modelos/productModel.js";


class ProductManager {

    static async createProduct(req, res) {
        const { body } = req
        const producto = {
          ... body,
        }
        const result = await modeloDeProducto.create(producto)
        res.status(201).json(result)
      }

    static async getProducts(req, res) {
        const result = await modeloDeProducto.find()
        res.status(201).json(result)
    }

    static async getProductById(req, res) {
        const id = req.params.id;
    const result = await modeloDeProducto.findById(id);
    if (!result) {
      res.status(404).send("Producto no encontrado.");
    }
    else res.status(201).json(result)
  }

  static async updateProductById(req, res) {
    const { params: { id }, body } = req
    let result = await modeloDeProducto.updateOne({_id: id}, {$set: body})
    if (!result) {
      res.status(404).send("Producto no encontrado.");
    }
    else res.status(201).json(result)
  }
  

  static async deleteProductById(req,res) {
    const { params: { id } } = req
    let result = await modeloDeProducto.deleteOne({ _id: id })
    if (!result) {
      res.status(404).send("Producto no encontrado.");
    }
    else res.status(201).json(result);
  }
}

export default ProductManager;