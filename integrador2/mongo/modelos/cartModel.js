import mongoose from 'mongoose'

const carrs = new mongoose.Schema({
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


const modeloDeCarritos = mongoose.model("Carrs", carrs);

export default modeloDeCarritos;