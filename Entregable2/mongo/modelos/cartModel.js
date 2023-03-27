import mongoose from 'mongoose'

const carrColection = "Carr";

const Carr = new mongoose.Schema({
  Productos:{type:[{ Producto:{ type:mongoose.Schema.Types.ObjectId,ref:"Productos"}}]}
}, { timestamps: true })

const modeloDeCarritos = mongoose.model(carrColection, Carr);

export default modeloDeCarritos;