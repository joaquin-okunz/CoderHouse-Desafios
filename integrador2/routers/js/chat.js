
import { Router } from 'express'

import mensajeModel from '../../mongo/modelos/Mmensaje.js'
import Utils from '../../utils/index.js'

const ChatRouter = Router()
/*
ChatRouter
  .get('/', Utils.authJWTMiddleware(['user']), mensajeModel.get)
  .post('/', Utils.authJWTMiddleware(['user']), mensajeModel.create)
  .get('/:id', Utils.authJWTMiddleware(['admin']), mensajeModel.getById)
  .put('/:id', Utils.authJWTMiddleware(['admin']), mensajeModel.updateById)
  .delete('/:id', Utils.authJWTMiddleware(['admin']), mensajeModel.deleteById)
*/
export default ChatRouter
