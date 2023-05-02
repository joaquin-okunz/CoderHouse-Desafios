import mongoose from 'mongoose'

const carrColection = "Carr";

const Carr = new mongoose.Schema({
  Productos: [{
    Producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prods"
    },
    quantity: {
      type: Number,
      default: 1
    }
  }]
},
  { timestamps: true })


const modeloDeCarritos = mongoose.model(carrColection, Carr);

export default modeloDeCarritos;