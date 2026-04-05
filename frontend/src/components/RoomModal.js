import React, { useState } from 'react';
import { bookingsAPI } from '../services/api';

function RoomModal({ visible, room, selectedTime, selectedDate, onClose, user, onBookingConfirmed }) {
  const [booking, setBooking] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!visible || !room) return null;

  const handleConfirmBooking = async () => {
    setBooking(true);
    try {
      // Create booking object
      const newBooking = {
        id: Date.now().toString(),
        teacherId: user?.id || '1',
        teacherName: user?.name || 'Teacher',
        roomId: room.id,
        roomName: room.name,
        date: selectedDate,
        startTime: selectedTime?.time.split('-')[0].trim(),
        endTime: selectedTime?.time.split('-')[1]?.trim() || '',
        status: 'confirmed',
        purpose: 'Class Booking'
      };

      // Call API to save booking
      await bookingsAPI.createBooking(newBooking);

      console.log('📱 RoomModal: Booking successful, onBookingConfirmed exists:', !!onBookingConfirmed);
      
      // Notify parent that booking succeeded
      if (onBookingConfirmed) {
        console.log('📱 RoomModal: Calling onBookingConfirmed');
      onBookingConfirmed();
      }
      
      setConfirmed(true);
      setTimeout(() => {
        setConfirmed(false);
        onClose();
      }, 2000);
    } catch (error) {
      alert('Booking failed');
    } finally {
      setBooking(false);
    }
  };

  return (
    <>
      {/* Dark Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(3px)'
        }}
      >
        {/* Modal Container - Centered */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '24px',
            width: '320px',
            maxWidth: '90%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.2s ease',
            position: 'relative'
          }}
        >
          {!confirmed ? (
            <>
              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#999',
                  padding: '4px 8px'
                }}
              >
                ✕
              </button>

              {/* Room Header */}
              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px 0' }}>
                  {room.name}
                </h2>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  Capacity: {room.capacity}
                </p>
              </div>

              {/* Booking Details */}
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '12px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #eee'
                }}>
                  <span style={{ color: '#666' }}>Date:</span>
                  <span style={{ fontWeight: '600', color: '#333' }}>{selectedDate}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '12px' 
                }}>
                  <span style={{ color: '#666' }}>Time:</span>
                  <span style={{ fontWeight: '600', color: '#1976d2' }}>{selectedTime?.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Teacher:</span>
                  <span style={{ fontWeight: '500' }}>{user?.name || 'Teacher'}</span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmBooking}
                disabled={booking}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: booking ? '#ccc' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: booking ? 'default' : 'pointer',
                  marginBottom: '12px',
                  transition: '0.2s'
                }}
              >
                {booking ? 'Booking...' : 'Confirm Booking'}
              </button>

              {/* Cancel Link */}
              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'transparent',
                  color: '#999',
                  border: 'none',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            // Success Message
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ 
                fontSize: '64px', 
                marginBottom: '20px',
                animation: 'popIn 0.3s ease'
              }}>
                ✅
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Booking Confirmed!</h3>
              <p style={{ color: '#666', margin: '0 0 16px 0', fontSize: '14px' }}>
                {room.name} booked for {selectedTime?.time}
              </p>
              <button
                onClick={onClose}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes popIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}

export default RoomModal;