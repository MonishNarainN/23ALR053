import { io } from 'socket.io-client';

const WS_URL = process.env.REACT_APP_WS_URL || 'http://localhost:4000';
let socket;

const connectSocket = (onNotification, onViewed) => {
  if (socket) return socket;

  socket = io(WS_URL, {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('notification', (notification) => {
    if (onNotification) onNotification(notification);
  });

  socket.on('notification_viewed', (notification) => {
    if (onViewed) onViewed(notification);
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });

  return socket;
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { connectSocket, disconnectSocket };
