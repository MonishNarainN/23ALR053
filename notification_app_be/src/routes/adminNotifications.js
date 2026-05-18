const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const adminNotificationController = require('../controllers/adminNotificationController');

router.post('/send', adminAuth, adminNotificationController.sendNotification);

module.exports = router;
