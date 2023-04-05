import modeloDeProducto from "../modelos/productModel.js";


class ProductManager {

    static async createProduct(req, res) {
        const  body  = req;
        const producto = {
          ... body,
        }
        const result = await modeloDeProducto.create(producto)
        res.status(201)
      }

    static async getProducts(req, res) {
        const result = await modeloDeProducto.find()
        res.status(201).json(result)
    }

    static async getProductById(req, res) {
        const id = req.params;
    const result = await modeloDeProducto.findOne({_id : id});
    if (!result) {
      res.status(404).end()
    }
    else res.status(201).json(result)
  }

  static async updateProductById(req, res) {
    const id = req.params;
    const cuerpo = req.body;
    await modeloDeProducto.updateOne({_id: id}, {$set: body, cuerpo})
    res.status(201).json(result)
  }

  static async deleteProductById(req,res) {
    const id = req.params;
    await modeloDeProducto.deleteOne({_id: id})
    res.status(201).json(result)
  }
}

export default ProductManager;
