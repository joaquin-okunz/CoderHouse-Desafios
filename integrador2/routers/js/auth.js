import { Router } from 'express'
import Utils from '../../utils/index.js'
import Users from '../../mongo/controladores/Cusers.js'

const AUrouter = Router()

AUrouter
  .post('/login', Users.login)
  .post('/register', Utils.uploader.single('avatar'), Users.register)

export default AUrouter
