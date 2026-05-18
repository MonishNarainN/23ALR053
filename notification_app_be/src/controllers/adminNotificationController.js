const notificationService = require('../services/notificationService');

const sendNotification = async (req, res, next) => {
  try {
    const notification = await notificationService.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendNotification,
};
