import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  role: { type: String, default: 'user' }
})

export default mongoose.model('User', UserSchema)