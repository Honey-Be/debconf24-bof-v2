import { Server, Socket } from "socket.io"

export default (io: Server, socket: Socket, disconnectMessage: string = `socket.io - socket.id \`${socket.id}\` disconnected`) => {
    console.log('socket.io - connection');
    socket.on('disconnect', () => {
      console.log(disconnectMessage)
    })
}