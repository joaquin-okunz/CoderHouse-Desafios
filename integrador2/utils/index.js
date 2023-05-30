import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import passport from 'passport'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config

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
    console.log(password, user)
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
        //console.log('payload', payload)
        return resolve(payload)
      })
      return token
      
    })
  }

  static authJWTMiddleware = (roles) => (req, res, next) => {
    passport.authenticate('jwt', { session: false }, function (error, user, info) {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      if (!roles.includes(user.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
      if (user.role === 'user' && req.params.id && req.params.id !== user.id) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
      req.logIn(user, { session: false }, function (err) {
        if (err) {
          return next(err);
        }
        next();
      });
    })(req, res, next);
  }
}


export default Utils