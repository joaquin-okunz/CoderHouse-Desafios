import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'

import UserModel from '../mongo/modelos/users.js'
import { createHash, validatePassword } from '../utils/Uindex.js'

const initPassport = () => {

  const registerOptions = {
    usernameField: 'email',
    passReqToCallback: true,
  }

  const loginOptions = {
    usernameField: 'email',
  }

  const githubOptions = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK,
  }

  passport.use('register', new LocalStrategy(registerOptions, async (req, email, password, done) => {
    const {
      body: {
        first_name,
        last_name,
        age,
      }
    } = req

    if (
      !first_name ||
      !last_name ||
      !age
    ) {
      return done(new Error('Todo los campos debe venir en la solicitud.'))
    }

    try {
      let user = await UserModel.findOne({ email })

      if (user) {
        console.log('User already register.')
        return done(null, false)
      }

      user = await UserModel.create({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
      })
/*
      if (user.email === "adminCoder@coder.com") {
        user.role = 'admin';
        await user.save();
      }
*/
      done(null, user)

    } catch (error) {
      return done(new Error('Error al obtener el usuario:', error.message))
    }
  }))

  passport.use('login', new LocalStrategy(loginOptions, async (email, password, done) => {

    try {
      const user = await UserModel.findOne({ email })

      if (!user) {
        return done(null, false)
      }

      if (!validatePassword(password, user)) {
        return done(null, false)
      }
      done(null, user)
    } catch (error) {
      return done(new Error('Error al obtener el usuario:', error.message))
    }
  }))

  passport.use(new GithubStrategy(githubOptions, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Productos', profile)
      let user = await UserModel.findOne({ email: profile._json.email })
      if (!user) {
        user = await UserModel.create({
          first_name: profile._json.name,
          last_name: '',
          email: profile._json.email,
          age: '',
          password: '',
        })
      }
      console.log('user', user);
      done(null, user)
    } catch (error) {
      return done(new Error('Error al obtener el usuario:' + error.message))
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id)
    done(null, user)
  })
}

export default initPassport