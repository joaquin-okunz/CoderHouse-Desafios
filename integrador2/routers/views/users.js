import { Router } from 'express'

import UserModel from '../../mongo/modelos/users.js'

const UsersRouter = Router()

UsersRouter.get('/', async (req, res) => {
  const users = await UserModel.find()
  res.render('users', { users })
})

export default UsersRouter