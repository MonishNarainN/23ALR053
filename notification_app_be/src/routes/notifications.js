const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/', notificationController.createNotification);
router.get('/', notificationController.getNotifications);
router.patch('/:id/view', notificationController.markAsViewed);
router.get('/priority-inbox', notificationController.getPriorityInbox);

module.exports = router;
