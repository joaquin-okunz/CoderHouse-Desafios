import UserModel from '../modelos/users.js'
import Utils from '../../utils/index.js'
import modeloDeCarritos from '../modelos/cartModel.js';
import cookieParser from 'cookie-parser';
class UserController {

    static async me(req, res) {
      const { headers: { authorization } } = req;
      if (!authorization || !authorization.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'No se proporcionó un token válido' });
      }
      const token = authorization.substring(7);
      const decoded = await Utils.isValidToken(token);
      const userId = decoded.id
      const user = await UserModel.findOne({ _id: userId }).populate("carrito")
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
        const nombre = "Nombre: " + user.first_name
        const apellido = "Apellido: " + user.last_name
        const email = "Email: " + user.email
        const edad = "Edad: " + user.age
        const role = "Rol: " + user.role
        res.send({
          nombre,
          apellido,
          email,
          edad,
          role
        })
      
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  


  static async login(req, res) {
    const {body:{email, password}} = req
    const user = await UserModel.findOne({ email })
    if(!user){
        return res.status(401).json({success: false, message:"email o contraseña incorrectas"})
    }
    else if(!Utils.validatePassword(password, user)){
        return res.status(401).json({success: false, message:"email o contraseña incorrectas"})
    }
    else {
      const token = Utils.tokenGenerator(user)
      user.status = "active"
      res.cookie('token', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      }).status(200).json({ success: true, access_token: token })
    }
  }
  
  static async register(req, res) {
    const { body: {first_name, last_name, email, age, password} } = req
    let user = await UserModel.findOne({email})
    if(user){
        return res.status(400).json({success: false, message: "Email ya existente"})
    }
    else{
        const carrito = await modeloDeCarritos.create({});
        const cartId = carrito._id
        user = await UserModel.create
        ({
          first_name, 
          last_name, 
          email, 
          age, 
          password: Utils.createHash(password),
          carrito: cartId
        })
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

  static async logout(req, res) {
    const {body: {email}} = req
    const user = await UserModel.findOne({email})
    user.status = 'inactive'; 
    await user.save();
    res.clearCookie('token');
    res.status(200).json({success: true});
}
}

export default UserController