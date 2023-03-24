import mongoose from 'mongoose'

const Carr = new mongoose.Schema({
  Productos: { type: Array, require: true }
}, { timestamps: true })

export default mongoose.model('Carritos', Carr)
