const { Server } = require('socket.io');

let io;

const initSocketServer = (server, redisClient) => {
  io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('WebSocket client connected', socket.id);

    socket.on('disconnect', () => {
      console.log('WebSocket client disconnected', socket.id);
    });
  });

  if (redisClient) {
    const subscriber = redisClient.duplicate();
    subscriber.subscribe('notifications');
    subscriber.on('message', (channel, message) => {
      if (channel === 'notifications' && io) {
        io.emit('notification', JSON.parse(message));
      }
    });
  }
};

const publishSocket = (event, payload) => {
  if (!io) {
    console.warn('Socket server is not initialized; skipping publishSocket');
    return;
  }
  io.emit(event, payload);
};

module.exports = {
  initSocketServer,
  publishSocket,
};
