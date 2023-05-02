import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  carrito:[{
    Producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carr"
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  avatar: {type: String},
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
})

export default mongoose.model('User', UserSchema)