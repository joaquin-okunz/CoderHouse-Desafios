import bcrypt from 'bcrypt'

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const validatePassword = function(password, users) {
  return bcrypt.compare(password, users.password)
}