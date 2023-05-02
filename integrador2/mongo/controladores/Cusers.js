import UserModel from '../modelos/users.js'
import Utils from '../../utils/index.js'
import { createHash, validatePassword } from '../../utils/bcrypt.js'

class UserController {

  static async me(req, res) {
    const { id } = req.student
    const result = await UserModel.findById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }

  static async login(req, res) {
    const {body:{email, password}} = req
    const user = UserModel.findOne({ email })
    if(!user){
        return res.status(401).json({success: false, message:"email o contraseña incorrectas"})
    }
    else if(!validatePassword(password, user)){
        return res.status(401).json({success: false, message:"email o contraseña incorrectas"})
    }
    else {
    const token = Utils.tokenGenerator(user)
    res.cookie('token', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    }).status(200).json({ success: true })
  }
  }

  static async register(req, res) {
    const { body: {first_name, last_name, email, age, password} } = req
    let user = await UserModel.findOne({email})
    if(user){
        return res.status(400).json({success: false, message: "Email ya existente"})
    }
    else{
        user = await UserModel.create({first_name, last_name, email, age, password: createHash(password)})
        res.status(201).json({success:true, message: "Cuenta logueada satisfactoriamente"})
    }
  }

  static async get(req, res) {
    const result = await UserModel.find()
    res.status(200).json(result)
  }

  static async getById(req, res) {
    const { params: { id } } = req
    const result = await UserModel.findById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }

  static async updateById(req, res) {
    const { params: { id }, body } = req
    await UserModel.updateOne({ _id: id }, { $set: body })
    res.status(204).end()
  }

  static async deleteById(req, res) {
    const { params: { id } } = req
    await UserModel.deleteOne({ _id: id })
    res.status(204).end()
  }

}

export default UserController