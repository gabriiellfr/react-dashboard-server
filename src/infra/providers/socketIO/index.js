const { Server } = require('socket.io');
const SocketController = require('./socket.controller');

const initializeSocketIO = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: ['http://localhost:3000', 'http://192.168.1.2:3000'],
            methods: ['GET', 'POST'],
        },
    });

    const socketController = new SocketController(io);
    io.on('connection', (socket) => {
        console.log('CONNECTION', socket.id);

        return socketController.onConnection(socket);
    });
};

module.exports = initializeSocketIO;
