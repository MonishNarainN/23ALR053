const notificationService = require('../services/notificationService');

const createNotification = async (req, res, next) => {
  try {
    const notification = await notificationService.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

const getNotifications = async (req, res, next) => {
  try {
    const result = await notificationService.fetchInbox(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const markAsViewed = async (req, res, next) => {
  try {
    const notification = await notificationService.markViewed(req.params.id);
    res.json(notification);
  } catch (error) {
    next(error);
  }
};

const getPriorityInbox = async (req, res, next) => {
  try {
    const result = await notificationService.fetchPriorityInbox(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsViewed,
  getPriorityInbox,
};
