const { socketService } = require('../services');

let io;

exports.server = (server) => {
    io = require('socket.io').listen(server);
    // connect
    io.on('connect', socket => {
        socketService.handleConnection(socket);
        socketService.handleDisconnection(socket);
    });
};