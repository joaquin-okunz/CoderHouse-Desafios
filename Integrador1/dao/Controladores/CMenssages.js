import MessagesModel from  "../../Modelos/MMessages.js";
import { emit } from '../../Socket.js'

class MensajesController {

  static async create(req, res) {
    const body = req.body;
    const mensaje = await MessagesModel.create(body)
    emit(mensaje)
    res.status(200).json(mensaje)
  }

  static async get(req, res) {
    const result = await MessagesModel.find()
    res.status(200).json(result)
  }

  static async getById(req, res) {
    const id = req.params;
    const result = await MessagesModel.findById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }

  static async updateById(req, res) {
    const id = req.params;
    const body = req.body;
    await MessagesModel.updateOne({ _id: id }, { $set: body })
    res.status(200).send("Mensaje actualizado exitosamente").end()
  }

  static async deleteById(req, res) {
    const id = req.params;
    await MessagesModel.deleteOne({ _id: id });
    res.status(200).send("Mensaje eliminado exitosamente").end()
  }

}

const CMensaje = new MensajesController;
export default CMensaje;