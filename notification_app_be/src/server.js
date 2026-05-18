const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');
const { connectRedis } = require('./config/redis');
const { connectDb } = require('./config/db');
const { initSocketServer } = require('./ws/socketServer');
const queueService = require('./services/queueService');

dotenv.config();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const startServer = async () => {
  await connectDb();

  let redisClient = null;
  try {
    redisClient = await connectRedis();
    queueService.setRedisClient(redisClient);
  } catch (error) {
    console.warn('Redis connection failed. API will still start, but queue/WebSocket features are disabled.');
  }

  if (redisClient) {
    initSocketServer(server, redisClient);
  }

  server.listen(PORT, () => {
    console.log(`Notification backend listening on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
