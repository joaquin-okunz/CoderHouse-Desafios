import mongoose from 'mongoose'

export const init = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    await mongoose.connect(URI)
    console.log('Coneccion exitosa a Mongo Atlas.')
  } catch (error) {
    console.error('Error de coneccion(Mongo Atas)', error.message)
  }
}