import React, { useState } from 'react';
import FloorPlan from './FloorPlan';
import RoomModal from './RoomModal';

function MobileMapPage({ user,onBookingConfirmed }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  );

  // Mock rooms data with equipment
  const roomDetails = {
    '101': { equipment: 'Projector, Whiteboard' },
    '102': { equipment: 'Smart Board' },
    '103': { equipment: 'Computers (15)' },
    '203': { equipment: 'Computers (20)' },
    'Com lab A': { equipment: 'iMacs (25)' },
    '206': { equipment: 'Projector' },
    '205': { equipment: 'TV, Whiteboard' },
    '204': { equipment: 'Projector' },
    '201': { equipment: 'Whiteboard' },
    '202': { equipment: 'Whiteboard' },
  };

  // Time slots
  const timeSlots = [
    { id: 1, time: '09:00-11:00', available: true },
    { id: 2, time: '11:00-13:00', available: false },
    { id: 3, time: '13:00-15:00', available: true },
    { id: 4, time: '15:00-17:00', available: true },
    { id: 5, time: '17:00-19:00', available: false },
    { id: 6, time: '19:00-21:00', available: true },
  ];

  const handleRoomPress = (room) => {
    setSelectedRoom(room);
    setSelectedTime(null);
  };

  const handleTimeSelect = (timeSlot) => {
    if (timeSlot.available) {
      setSelectedTime(timeSlot);
    }
  };

  const handleBookPress = () => {
    if (selectedRoom && selectedTime) {
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Callback to refresh data when booking is confirmed
  const handleBookingConfirmed = () => {
    console.log('🗺️ MobileMapPage: handleBookingConfirmed called, onBookingConfirmed exists:', !!onBookingConfirmed);
    if (onBookingConfirmed) {
      console.log('🗺️ MobileMapPage: calling onBookingConfirmed');
      onBookingConfirmed();
    } else {
      console.log('🗺️ MobileMapPage: onBookingConfirmed is undefined!');
    }
  };

  const isBookButtonEnabled = selectedRoom && selectedTime;

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <h1 style={styles.mapTitle}>Map</h1>
        <div style={styles.dateContainer}>
          <span style={styles.dateIcon}>📅</span>
          <span style={styles.dateText}>{selectedDate}</span>
        </div>
      </div>

      {/* Floor Plan */}
      <div style={styles.mapContainer}>
        <FloorPlan 
          onRoomPress={handleRoomPress}
          selectedRoom={selectedRoom}
        />
      </div>

      {/* Room Details - Only shows when room selected */}
      {selectedRoom && (
        <div style={styles.roomDetailsCard}>
          <div style={styles.roomHeader}>
            <h2 style={styles.roomName}>{selectedRoom.name}</h2>
            <div style={styles.statusBadge}>
              <span style={styles.statusDot}>🟢</span>
              <span style={styles.statusText}>Available</span>
            </div>
          </div>
          
          <div style={styles.equipmentRow}>
            <span style={styles.equipmentIcon}>🖥️</span>
            <span style={styles.equipmentText}>
              {roomDetails[selectedRoom.id]?.equipment || 'Standard equipment'}
            </span>
            <span style={styles.capacity}>Cap: {selectedRoom.capacity}</span>
          </div>
        </div>
      )}

      {/* Time Slots */}
      <div style={styles.timeSection}>
        <div style={styles.timeGrid}>
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => handleTimeSelect(slot)}
              disabled={!slot.available}
              style={{
                ...styles.timeButton,
                backgroundColor: slot.available 
                  ? (selectedTime?.id === slot.id ? '#1976d2' : '#f8f9fa')
                  : '#ffebee',
                color: slot.available 
                  ? (selectedTime?.id === slot.id ? 'white' : '#333')
                  : '#f44336',
                borderColor: slot.available
                  ? (selectedTime?.id === slot.id ? '#1976d2' : '#e0e0e0')
                  : '#ffcdd2',
              }}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <button
        onClick={handleBookPress}
        disabled={!isBookButtonEnabled}
        style={{
          ...styles.bookButton,
          backgroundColor: isBookButtonEnabled ? '#4caf50' : '#ccc',
        }}
      >
        {!selectedRoom 
          ? 'Select a room' 
          : !selectedTime 
            ? 'Select a time' 
            : 'BOOK NOW'}
      </button>

      {/* Room Modal */}
      <RoomModal 
        visible={modalVisible}
        room={selectedRoom}
        selectedTime={selectedTime}
        selectedDate={selectedDate}
        onClose={handleCloseModal}
        user={user}
        onBookingConfirmed={handleBookingConfirmed}
      />
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '390px',
    margin: '0 auto',
    padding: '0',
    boxSizing: 'border-box',
    minHeight: '844px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa'
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 16px 8px 16px',
  },
  mapTitle: {
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
    color: '#333'
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  dateIcon: {
    fontSize: '14px'
  },
  dateText: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#1976d2'
  },
  mapContainer: {
    height: '280px',
    width: '100%',
    padding: '0 16px',
    marginBottom: '8px',
    boxSizing: 'border-box'
  },
  roomDetailsCard: {
    backgroundColor: 'white',
    margin: '0 16px 12px 16px',
    padding: '12px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  roomHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  roomName: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    color: '#333'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#e8f5e9',
    padding: '4px 8px',
    borderRadius: '20px'
  },
  statusDot: {
    fontSize: '12px'
  },
  statusText: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#2e7d32'
  },
  equipmentRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  },
  equipmentIcon: {
    fontSize: '14px'
  },
  equipmentText: {
    fontSize: '13px',
    color: '#666',
    flex: 1
  },
  capacity: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1976d2',
    backgroundColor: '#e3f2fd',
    padding: '4px 8px',
    borderRadius: '12px'
  },
  timeSection: {
    padding: '0 16px',
    marginBottom: '12px',
  },
  timeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '6px',
  },
  timeButton: {
    padding: '12px 8px',
    fontSize: '12px',
    fontWeight: '500',
    border: '1px solid',
    borderRadius: '8px',
    textAlign: 'center',
    minHeight: '44px',
    cursor: 'pointer',
    transition: '0.2s',
  },
  bookButton: {
    width: 'calc(100% - 32px)',
    margin: '0 16px 16px 16px',
    padding: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.2s',
  }
};

export default MobileMapPage;