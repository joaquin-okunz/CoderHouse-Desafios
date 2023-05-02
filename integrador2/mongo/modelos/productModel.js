import mongoose from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2"
const productsColection = "Prods"

const Prod = new mongoose.Schema({
  nombre: { type: String, require: true },
  descripcion: { type: String, require: true },
  precio: { type: Number, require: true },
  stock: { type: Number, require: true},
  code: { type: String, require: true},
  categoria: {type: String, require: true }
}, { timestamps: true })

Prod.plugin(mongoosePaginate);
const modeloDeProducto = mongoose.model(productsColection, Prod);

export default modeloDeProducto;