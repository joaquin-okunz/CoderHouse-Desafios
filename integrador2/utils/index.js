import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import passport from 'passport'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imgs')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

import Exception from './exeption.js'


const JWT_SECRET = process.env.JWT_SECRET

class Utils {

  static createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }
  
  static validatePassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
  }

  static uploader = multer({ storage })

  static tokenGenerator = (user) => {
    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    }
    const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '24h' })
    return token
  }
  
  static isValidToken = (token) => {
    return new Promise((resolve) => {
      jsonwebtoken.verify(token, JWT_SECRET, (error, payload) => {
        if (error) {
          console.log('err', error)
          return resolve(false)
        }
        console.log('payload', payload)
        return resolve(payload)
      })
      return token
    })
  }
  
  static authJWTMiddleware = (roles) => (req, res, next) => {
    passport.authenticate('jwt', function (error, user, info) {  
      if (error) {
        return next(error)
      }
      if (!user) { 
        return next(new Exception('Unauthorized' , 401))
      }
      if (!roles.includes(user.role)) { 
        return next(new Exception('Forbidden' , 403))
      }
      if (user.role === 'user' && req.params.id && req.params.id !== user.id) {
        return next(new Exception('Forbidden' , 403))
      }
      req.user = user
      next()
    })(req, res, next)
  }

}

export default Utils