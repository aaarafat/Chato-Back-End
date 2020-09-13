const logger = require('../config/logger');
const activeSockets = {};
const userSocket = {};


/**
 * Notify user if request is sent
 *
 * @author Abdelrahman Tarek
 *
 * @param {String} userId Reciever user ID
 * @param {Object} request Request object
 * @return {Boolean} `True` if user is notified "active user" else `False`
 */
exports.notifyFriendRequest = (userId, request) => {
  const socket = activeSockets[userSocket[userId]];

  if (!socket) return false;

  socket.emit('friendRequest', {
    request: {
      id: request._id,
      _id: request._id,
      from: request.from,
      status: request.status,
    },
  });

  return true;
};

exports.handleConnection = (socket) => {
  logger.info(`Hello socket ${socket.id}...`);

  activeSockets[socket.id] = socket;
  userSocket[socket.user._id] = socket.id;
};

exports.handleDisconnection = (socket) => {
  socket.on('disconnect', () => {
    logger.info(`${socket.id} Disconnected ....`);

    delete activeSockets[socket.id];
  });
};
