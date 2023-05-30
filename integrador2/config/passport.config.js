import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github2'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import userModel from '../mongo/controladores/Cusers.js'


const githubOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK,
}

function cookieExtractor(req) {
  let token = null
  if (req && req.cookies) {
    token = req.cookies.token
  }
  return token
}

const initPassport = () =>{
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET
  },(payload, done) => { 
    return done(null, payload)
  }
  ))  
}
export default initPassport

/*
passport.use(new GithubStrategy(githubOptions, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile)
    let user = await userModel.findOne({ email: profile._json.email })
    if (!user) {
      user = await userModel.create({
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
*/

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  let user = await userModel.findById(id)
  done(null, user)
})