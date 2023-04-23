import { Router } from 'express'
import passport from 'passport'


import UserModel from '../../mongo/modelos/users.js'
import { createHash, validatePassword } from '../../utils/Uindex.js'

const Arouter = Router()

Arouter.post('/login', passport.authenticate('login', { failureRedirect: '/sessions/login' }), async (req, res) => {
  console.log('req.user', req.user);
  req.session.user = req.user
  res.redirect('/profile')
})

Arouter.post('/register', passport.authenticate('register', { failureRedirect: '/sessions/register' }), (req, res) => {
  res.redirect('/login')
})

Arouter.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (!error) {
      res.redirect('/login')
    } else {
      res.send({status: 'Logout Error', body: error })
    }
  })
})

Arouter.post('/reset-password', async (req, res) => {

  const {
    body: {
      email,
      password,
    }
  } = req

  if (
    !email ||
    !password
  ) {
    return res.render('reset-password', { error: 'Todo los campos debe venir en la solicitud.' })
  }

  const user = await UserModel.findOne({ email })

  if (!user) {
    return res.render('reset-password', { error: 'Email no existe.' })
  }

  user.password = createHash(password)

  await UserModel.updateOne({ email }, user) 

  res.redirect('/login')
}) 

Arouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/sessions/login' }), (req, res) => {
  req.session.user = req.user
  res.redirect('/profile')
});

export default Arouter