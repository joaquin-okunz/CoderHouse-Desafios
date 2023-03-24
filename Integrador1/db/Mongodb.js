import mongoose from 'mongoose'

export const init = async () => {
  try {
    const URI = process.env.MONGODB_URI
    await mongoose.connect(URI)
    console.log('Base de datos conectada correctamente.')
  } catch (error) {
    console.error('Error al conectar con la base de datos')
  }
}