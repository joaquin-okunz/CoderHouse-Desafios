import mongoose from 'mongoose'

const mensaje = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  mensaje: { type: String, require: true }
}, { timestamps: true })

export default mongoose.model('Mensaje', mensaje)