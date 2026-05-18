const Redis = require('ioredis');
const dotenv = require('dotenv');

dotenv.config();

const connectRedis = async () => {
  if (!process.env.REDIS_URL) {
    throw new Error('REDIS_URL is not configured');
  }

  const client = new Redis(process.env.REDIS_URL, {
    connectTimeout: 10000,
    maxRetriesPerRequest: 0,
    enableOfflineQueue: false,
    retryStrategy: () => null,
    reconnectOnError: () => false,
  });

  client.on('connect', () => console.log('Connected to Redis'));
  client.on('error', (error) => console.error('Redis error', error));

  try {
    await client.ping();
    return client;
  } catch (error) {
    client.disconnect();
    throw error;
  }
};

module.exports = {
  connectRedis,
};
