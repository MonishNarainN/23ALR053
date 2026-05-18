const { consumeNotification } = require('../services/queueService');
const { publishSocket } = require('../ws/socketServer');

const processNotification = async (notification) => {
  console.log('Processing notification worker:', notification.id);
  // Simulate work such as persistence, analytics, and escalation
  publishSocket('notification_processed', notification);
};

const startWorker = async () => {
  console.log('Notification worker started');
  while (true) {
    const notification = await consumeNotification();
    if (notification) {
      await processNotification(notification);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

startWorker().catch((error) => {
  console.error('Worker error', error);
  process.exit(1);
});
