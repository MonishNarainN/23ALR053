const Notification = require('../models/notificationModel');
const { publishNotification, isRedisReady } = require('./queueService');
const { publishSocket } = require('../ws/socketServer');
const { prioritizeNotifications } = require('../utils/priorityInbox');

const create = async (payload) => {
  const notification = await Notification.create({
    title: payload.title,
    message: payload.message,
    sender: payload.sender || 'admin',
    senderRole: payload.senderRole || 'admin',
    recipient: payload.recipient || 'all-students',
    recipientRole: payload.recipientRole || 'student',
    priority: payload.priority || 'normal',
    source: payload.source || 'system',
    viewed: false,
  });

  const payloadToPublish = {
    id: notification._id.toString(),
    title: notification.title,
    message: notification.message,
    sender: notification.sender,
    senderRole: notification.senderRole,
    recipient: notification.recipient,
    recipientRole: notification.recipientRole,
    priority: notification.priority,
    source: notification.source,
    viewed: notification.viewed,
    createdAt: notification.createdAt.toISOString(),
  };

  if (isRedisReady()) {
    await publishNotification(payloadToPublish);
  } else {
    try {
      publishSocket('notification', payloadToPublish);
    } catch (err) {
      // ignore if socket server is not ready
    }
  }

  return payloadToPublish;
};

const fetchInbox = async ({ page = 1, limit = 20, status, priority, recipient, recipientRole }) => {
  const query = {};
  if (recipientRole) query.recipientRole = recipientRole;
  if (recipient) query.$or = [{ recipient }, { recipient: 'all-students' }];
  if (status === 'viewed') query.viewed = true;
  if (status === 'unviewed') query.viewed = false;
  if (priority) query.priority = priority;

  const total = await Notification.countDocuments(query);
  const items = await Notification.find(query)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  return {
    items: items.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      message: item.message,
      sender: item.sender,
      senderRole: item.senderRole,
      recipient: item.recipient,
      recipientRole: item.recipientRole,
      priority: item.priority,
      source: item.source,
      viewed: item.viewed,
      createdAt: item.createdAt.toISOString(),
    })),
    total,
    page: Number(page),
    limit: Number(limit),
  };
};

const markViewed = async (id) => {
  const notification = await Notification.findByIdAndUpdate(
    id,
    { viewed: true },
    { new: true }
  );

  if (!notification) throw new Error('Notification not found');

  const payload = {
    id: notification._id.toString(),
    title: notification.title,
    message: notification.message,
    sender: notification.sender,
    senderRole: notification.senderRole,
    recipient: notification.recipient,
    recipientRole: notification.recipientRole,
    priority: notification.priority,
    source: notification.source,
    viewed: notification.viewed,
    createdAt: notification.createdAt.toISOString(),
  };

  try {
    publishSocket('notification_viewed', payload);
  } catch (err) {
    // no socket available
  }

  return payload;
};

const fetchPriorityInbox = async ({ page = 1, limit = 20 }) => {
  const items = await Notification.find({ priority: { $in: ['high', 'critical'] } }).lean();
  const sorted = prioritizeNotifications(items);
  const offset = (Number(page) - 1) * Number(limit);
  const paged = sorted.slice(offset, offset + Number(limit));

  return {
    items: paged.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      message: item.message,
      sender: item.sender,
      senderRole: item.senderRole,
      recipient: item.recipient,
      recipientRole: item.recipientRole,
      priority: item.priority,
      source: item.source,
      viewed: item.viewed,
      createdAt: item.createdAt.toISOString(),
    })),
    total: sorted.length,
    page: Number(page),
    limit: Number(limit),
  };
};

module.exports = {
  create,
  fetchInbox,
  markViewed,
  fetchPriorityInbox,
};
