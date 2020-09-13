const {socketService, authService} = require('../services');
const socketAuth = require('socketio-auth');

let io;

exports.server = (server) => {
  io = require('socket.io').listen(server);

  // authentication
  socketAuth(io, {
    authenticate: async (socket, data, cb) => {
      const {token} = data;
      try {
        const user = await authService.verifyToken(token);

        socket.user = user;
      } catch (err) {
        console.log(`Socket ${socket.id} unauthorized.`);
        return cb({message: 'UNAUTHORIZED'});
      }

      return cb(null, true);
    },
    postAuthenticate: socketService.handleConnection,
    disconnect: socketService.handleDisconnection,
  });
};
