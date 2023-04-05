import mongoose from 'mongoose'

const productsColection = "Prods";

const Prod = new mongoose.Schema({
  nombre: { type: String, require: true },
  descripcion: { type: String, require: true },
  precio: { type: Number, require: true },
  stock: { type: Number, require: true},
  code: { type: String, require: true},
  categoria: {type: String, require: true },
  status: {type:Boolean, default: true }
}, { timestamps: true })

const modeloDeProducto = mongoose.model(productsColection, Prod);

export default modeloDeProducto;