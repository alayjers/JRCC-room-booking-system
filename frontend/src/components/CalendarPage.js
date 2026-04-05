import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarView from './CalendarView';
import { bookingsAPI } from '../services/api';

function CalendarPage({ user,bookingUpdate }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchBookings = async () => {
      console.log('📅 CalendarPage: fetching bookings, bookingUpdate =', bookingUpdate);
      try {
        const response = await bookingsAPI.getUserBookings(user?.id || '1');
        setBookings(response.data || []);
        console.log('Calendar fetched bookings:', response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id, bookingUpdate]); // Re-fetch when bookingUpdate changes

  useEffect(() => {
    console.log('📅 CalendarPage: bookingUpdate changed to:', bookingUpdate);
  }, [bookingUpdate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleBookRoom = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      navigate(`/map?date=${dateStr}`);
    }
  };

  // Filter bookings for selected date
  const selectedDateBookings = selectedDate 
    ? bookings.filter(b => b.date === selectedDate.toISOString().split('T')[0])
    : [];

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading calendar...
      </div>
    );
  }

  return (
    <div className="content" style={styles.container}>
      <CalendarView 
        onDateSelect={handleDateSelect}
        bookings={bookings}
      />
      
      {selectedDate && (
        <div style={styles.bookingsSection}>
          <div style={styles.bookingsHeader}>
            <h3 style={styles.bookingsTitle}>
              Bookings for {selectedDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </h3>
            <button 
              onClick={handleBookRoom}
              style={styles.bookButton}
            >
              + Book Room
            </button>
          </div>

          {selectedDateBookings.length > 0 ? (
            <div style={styles.bookingsList}>
              {selectedDateBookings.map(booking => (
                <div key={booking.id} style={styles.bookingItem}>
                  <div style={styles.bookingTime}>
                    {booking.startTime} - {booking.endTime}
                  </div>
                  <div style={styles.bookingRoom}>
                    {booking.roomName}
                  </div>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: booking.status === 'confirmed' ? '#d4edda' : '#fff3cd',
                    color: booking.status === 'confirmed' ? '#155724' : '#856404'
                  }}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.noBookings}>
              <p>No bookings for this date</p>
              <button 
                onClick={handleBookRoom}
                style={styles.smallBookButton}
              >
                Book a room
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '390px',
    margin: '0 auto',
    padding: '10px',
    paddingBottom: '80px',
    boxSizing: 'border-box'
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    color: '#666'
  },
  bookingsSection: {
    marginTop: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  bookingsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  bookingsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    color: '#333'
  },
  bookButton: {
    padding: '8px 12px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    minHeight: '36px',
    cursor: 'pointer'
  },
  smallBookButton: {
    padding: '8px 16px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  bookingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  bookingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #f0f0f0',
    flexWrap: 'wrap',
    gap: '8px'
  },
  bookingTime: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1976d2',
    minWidth: '100px'
  },
  bookingRoom: {
    fontSize: '14px',
    color: '#333',
    flex: 1
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '500'
  },
  noBookings: {
    textAlign: 'center',
    padding: '20px',
    color: '#999',
    fontSize: '14px'
  }
};

export default CalendarPage;