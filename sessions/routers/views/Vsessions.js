import { Router } from 'express'
import passport from 'passport'

function requireRole(role) {
  return function(req, res, next) {
    if(req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).send("No tienes permiso para acceder a esta página");
    }
  }
}

const Vrouter = Router()

const auth = (req, res, next) => {
  if (req.session.user) {
    return next()
  }
  res.redirect('/login')
}

Vrouter.get('/login', (req, res) => {
  res.render('login')
})

Vrouter.get('/register', (req, res) => {
  res.render('register')
})

Vrouter.get('/reset-password', (req, res) => {
  res.render('reset-password')
})

Vrouter.get('/profile', auth, (req, res) => {
  res.render('profile', req.session.user)
})
/*
Vrouter.get('/admin', auth, requireRole("admin"), (req, res) => {
  let mensaje1 = "¡felicidades, eres admin!"
  res.render('admin', mensaje1)
  })
*/
Vrouter.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }))

export default Vrouter