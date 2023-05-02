import { Server } from "socket.io";
import mensajeModel from "./mongo/modelos/Mmensaje.js"

let io

export const initSocket = (httpServer) => {
    io = new Server(httpServer)

    io.on('connection', async (socketClient) => {
        console.log('Nuevo cliente conectado', socketClient.id)
    
        socketClient.on('new-message', async (data) => {
          const mensaje = await mensajeModel.create(data)
          io.emit('notification', mensaje)
        })
        socketClient.on('disconection', () => {
          console.log('Se desconecto el cliente con el id', socketClient.id)
        })
      })
    
    }


export const show = (mensaje) => {
    io.emit("notification", mensaje)
}