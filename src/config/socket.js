const logger = require('./logger');
const activeSockets = [];

let io;

const handleConnection = (socket) => {
    logger.info(`Hello socket ${socket.id}...`);
};

const handleDisconnection = (socket) => {
    socket.on('disconnect', () => {
        logger.info(`${socket.id} Disconnected ....`);
    })
};


exports.io = io;

exports.activeSockets = activeSockets;

exports.server = (server) => {
    io = require('socket.io').listen(server);
    // connect
    io.on('connect', socket => {
        handleConnection(socket);
        handleDisconnection(socket);
    });
};