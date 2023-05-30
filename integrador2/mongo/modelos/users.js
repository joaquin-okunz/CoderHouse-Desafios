import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  carrito: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrs', require: true },
  avatar: {type: String},
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  status: { type: String, default: 'inactive', enum: ['active', 'inactive'] },
}, { timestamps: true })


export default mongoose.model('User', UserSchema)


