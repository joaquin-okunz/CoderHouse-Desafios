import mongoose from 'mongoose'

const Prod = new mongoose.Schema({
  nombre: { type: String, require: true },
  descripcion: { type: String, require: true },
  Precio: { type: Number, require: true },
  Stock: { type: Number, require: true},
  code: { type: String, require: true, unique: true },
  categoria: {type: String, require: true },
  status: { type: Boolean, default: true, require: true },
  imagen: { type: String },
}, { timestamps: true })

export default mongoose.model('Productos', Prod);
