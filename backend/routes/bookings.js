const express = require('express');
const router = express.Router();
const bookings = require('../data/bookings.json');

// Get user bookings
router.get('/', (req, res) => {
  const userId = req.query.userId || '1';
  const userBookings = bookings.filter(b => b.teacherId === userId);
  res.json(userBookings);
});

// Create new booking
router.post('/', (req, res) => {
  const newBooking = {
    id: Date.now().toString(),
    ...req.body,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  
  // In real app, save to database
  bookings.push(newBooking);
  
  res.status(201).json(newBooking);
});

// Update booking
router.put('/:id', (req, res) => {
  const bookingId = req.params.id;
  const index = bookings.findIndex(b => b.id === bookingId);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  bookings[index] = { ...bookings[index], ...req.body };
  res.json(bookings[index]);
});

// Cancel booking
router.delete('/:id', (req, res) => {
  const bookingId = req.params.id;
  const index = bookings.findIndex(b => b.id === bookingId);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  const deleted = bookings.splice(index, 1);
  res.json({ message: 'Booking cancelled', booking: deleted[0] });
});

module.exports = router;