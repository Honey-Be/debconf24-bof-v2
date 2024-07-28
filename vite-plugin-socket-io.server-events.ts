import { Server, Socket } from "socket.io"

export default (io: Server, socketEvents: (io: Server, socket: Socket) => void) => {
    io.on('connection', socket => socketEvents(io, socket))
}