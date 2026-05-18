const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { requestLogger, errorLogger } = require('../../logging_middleware');
const notificationRoutes = require('./routes/notifications');
const adminNotificationRoutes = require('./routes/adminNotifications');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/notifications', notificationRoutes);
app.use('/api/admin/notifications', adminNotificationRoutes);

app.use(errorLogger);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
