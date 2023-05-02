import mensajeModel from "../modelos/Mmensaje.js"
import emit from "../socket.js"

class messageController {

    static async create (req,res) {
        const { body } = req
        const mensaje = await mensajeModel.create(body)
        emit(mensaje)
        res.status(201).json(mensaje)
    }

    static async get(req,res) {
        const result = await mensajeModel.find().populate("User",["first_name","last_name","email"]).exec()
        res.status(204).json(result)
    }

    static async getById(req,res) {
        const {params: {id}} = req
        const result = await mensajeModel.findById(id)
        if(!result){
            return res.status(404).end()
        }
        else res.status(200).json(result)
    }

    static async updateById(req,res){
        const {params: {id}, body} = req
        await mensajeModel.updateOne({_id: id},{$set: body})
        res.status(204).end()
    }

    static async deleteById(req,res){
        const {params: {id}} = req
        await mensajeModel.deleteOne({_id: id})
        res.status(204).end()
    }
} 

export default messageController
