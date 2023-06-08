import mongoose from "mongoose";

const ticket = new mongoose.Schema({
    code: String,
    purchase_datetime: String,
    amount: String,
    purchaser: String
  }, { timestamps: true })
  
  const ticketModel = mongoose.model("Ticket", ticket);
  
  export default ticketModel;