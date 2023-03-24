import { Server } from "socket.io";
import MessagesModel from "./Modelos/MMessages.js";
//---------------------------------------------------------------
let io;
//---------------------------------------------------------------
export const inet = (httpServer) => {
    io = new Server(httpServer)

    io.on("connection", async (socket) => {
        console.log("Cliente conectado", socket.id)
    

    socket.on("nuevo-mensaje", async (data) => {
        const mens = await MessagesModel.create(data);
        io.emit("notification", mens);
    })

    socket.on("disconnection", () => {
        console.log("Cliente desconectado", socket.id);
    })

})
}
//---------------------------------------------------------------
export const emit = (mens) =>{
    io.emit("notification", mens);
}