import mongoose from "mongoose";

const ticket = new mongoose.Schema({
    code: {type: String, require: true},
    purchase_datetime:{type: String, require: true},
    amount:{type: Number, require: true},
    purchaser:{type: String, require: true}
  }, { timestamps: true })
  
  const modeloDeProducto = mongoose.model("Ticket", ticket);
  
  export default modeloDeProducto;