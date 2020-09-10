const logger = require('../config/logger');
let activeSockets = {};
let activeUsers = {};


exports.notifyFriendRequest = (to, request) => {
    socket.emit('friendRequest', {
        id: request._id,
        _id: request._id,
        from: request.from
    });
};

exports.handleConnection = (socket) => {
    logger.info(`Hello socket ${socket.id}...`);

    activeSockets[socket.id] = socket;
    activeUsers[socket.user._id] = socket.id;
};

exports.handleDisconnection = (socket) => {
    socket.on('disconnect', () => {
        logger.info(`${socket.id} Disconnected ....`);

        delete activeSockets[socket.id];
    });
};