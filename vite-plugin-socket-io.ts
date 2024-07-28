import { Server, Socket } from 'socket.io';
import ServerEvents from "./vite-plugin-socket-io.server-events.js"
import SocketEvents from "./vite-plugin-socket-io.socket-events.js"
import { PluginOption } from 'vite';

export const vitePluginSocketIO:
    (options?: {serverEvents: (io: Server, socketEvents: (io: Server, socket: Socket) => void) => void, socketEvents: (io: Server, socket: Socket) => void}) => PluginOption
    = (options) => ({
  name: 'socket.io',
  configureServer(server) {
    // initiate default options
    const defaults = { ServerEvents, SocketEvents }

    // merge defaults with options
    options = Object.assign(defaults, options);

    // create io server
    if (server.httpServer) {
        const io = new Server(server.httpServer);

        // pass io server to serverEvents
        options.serverEvents(io, options.socketEvents);
    }
  }
})