import { Router } from 'express'
import { show } from "../../socket.js"
import MensajeModel from '../../mongo/modelos/Mmensaje.js'

const Chatrouter = Router()

Chatrouter.get('/', async (req, res) => {
  const mensajes = await MensajeModel.find()
  //show()
  res.render('chat', { mensajes })
})

export default Chatrouter