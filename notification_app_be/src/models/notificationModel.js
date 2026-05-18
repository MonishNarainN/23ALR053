const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  sender: { type: String, default: 'admin' },
  senderRole: { type: String, default: 'admin' },
  recipient: { type: String, default: 'all-students' },
  recipientRole: { type: String, default: 'student' },
  priority: { type: String, default: 'normal' },
  source: { type: String, default: 'system' },
  viewed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
