import { Router } from 'express'

import Users from '../../mongo/controladores/Cusers.js'
import Utils from '../../utils/index.js'

const UsersRouter = Router()

UsersRouter
  .get('/', Utils.authJWTMiddleware(['admin']), Users.get)
  .get('/me', Utils.authJWTMiddleware(['admin', 'user']), Users.me)
  .post('/', Utils.authJWTMiddleware(['admin', 'user']), Utils.uploader.single('avatar'), Users.register)
  .get('/:id', Utils.authJWTMiddleware(['admin', 'user']), Users.getById)
  .put('/:id', Utils.authJWTMiddleware(['admin', 'user']), Users.updateById)
  .delete('/:id', Utils.authJWTMiddleware(['admin']), Users.deleteById)

export default UsersRouter