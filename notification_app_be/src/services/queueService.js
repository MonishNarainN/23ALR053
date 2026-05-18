const Redis = require('ioredis');
const dotenv = require('dotenv');

dotenv.config();

let redisClient = null;
const QUEUE_NAME = process.env.NOTIFICATION_QUEUE || 'notification_queue';

const setRedisClient = (client) => {
  redisClient = client;
};

const isRedisReady = () => redisClient && redisClient.status === 'ready';

const publishNotification = async (notification) => {
  if (!isRedisReady()) {
    console.warn('Redis not ready: skipping notification queue publish');
    return;
  }
  await redisClient.lpush(QUEUE_NAME, JSON.stringify(notification));
  await redisClient.publish('notifications', JSON.stringify(notification));
};

const consumeNotification = async () => {
  if (!isRedisReady()) {
    return null;
  }
  const raw = await redisClient.rpop(QUEUE_NAME);
  return raw ? JSON.parse(raw) : null;
};

module.exports = {
  setRedisClient,
  isRedisReady,
  QUEUE_NAME,
  publishNotification,
  consumeNotification,
};
