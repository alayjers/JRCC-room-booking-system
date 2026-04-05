const express = require('express');
const router = express.Router();
const notifications = require('../data/notifications.json');

// Get user notifications
router.get('/', (req, res) => {
  const userId = req.query.userId || '1';
  const userNotifications = notifications.filter(n => n.userId === userId);
  res.json(userNotifications);
});

// Mark notification as read
router.put('/:id/read', (req, res) => {
  const notificationId = req.params.id;
  const notification = notifications.find(n => n.id === notificationId);
  
  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }
  
  notification.read = true;
  res.json(notification);
});

module.exports = router;