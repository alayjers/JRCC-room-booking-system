const express = require('express');
const router = express.Router();
const rooms = require('../data/rooms.json');
const bookings = require('../data/bookings.json');

// Get all rooms
router.get('/', (req, res) => {
  const { date, startTime, endTime } = req.query;
  
  // If date and time provided, filter available rooms
  if (date && startTime && endTime) {
    const bookedRoomIds = bookings
      .filter(b => b.date === date && 
        ((b.startTime < endTime && b.endTime > startTime)))
      .map(b => b.roomId);
    
    const availableRooms = rooms.filter(r => !bookedRoomIds.includes(r.id));
    return res.json(availableRooms);
  }
  
  res.json(rooms);
});

// Get specific room
router.get('/:id', (req, res) => {
  const room = rooms.find(r => r.id === req.params.id);
  
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  // Get bookings for this room
  const roomBookings = bookings.filter(b => b.roomId === req.params.id);
  res.json({ ...room, bookings: roomBookings });
});

// Check room availability for a date
router.get('/:id/availability', (req, res) => {
  const { date } = req.query;
  const roomId = req.params.id;
  
  const room = rooms.find(r => r.id === roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  const roomBookings = bookings.filter(b => 
    b.roomId === roomId && b.date === date && b.status === 'confirmed'
  );
  
  // Generate available time slots (9 AM - 5 PM, 1-hour slots)
  const allSlots = [];
  for (let hour = 9; hour <= 16; hour++) {
    const start = `${hour.toString().padStart(2, '0')}:00`;
    const end = `${(hour + 1).toString().padStart(2, '0')}:00`;
    
    // Check if slot is booked
    const isBooked = roomBookings.some(b => 
      (b.startTime <= start && b.endTime > start) ||
      (b.startTime < end && b.endTime >= end)
    );
    
    allSlots.push({
      start,
      end,
      available: !isBooked
    });
  }
  
  res.json({
    roomId,
    date,
    slots: allSlots
  });
});

module.exports = router;