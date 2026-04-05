import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomsAPI, bookingsAPI } from '../services/api';
import { mobileStyles } from '../styles/mobileStyles';

function Dashboard({ user, bookingUpdate }) {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, bookingsRes] = await Promise.all([
          roomsAPI.getRooms(),
          bookingsAPI.getUserBookings(user?.id || '1'),
        ]);
        
        setRooms(roomsRes.data || []);
        setBookings(bookingsRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user?.id, bookingUpdate]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return '#28a745';
      case 'partially-booked': return '#ffc107';
      case 'fully-booked': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{ fontSize: '18px', color: '#6c757d' }}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="content" style={mobileStyles.container}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '5px' }}>
          Welcome back, {user?.name}!
        </h1>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>{user?.department} Department</p>
      </div>

      {/* Quick Actions - Side by side */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '25px'
      }}>
        <button
          onClick={() => navigate('/map')}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            minHeight: '44px',
            cursor: 'pointer'
          }}
        >
          🗺️ Map
        </button>
        <button
          onClick={() => navigate('/calendar')}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            minHeight: '44px',
            cursor: 'pointer'
          }}
        >
          📅 Calendar
        </button>
      </div>

      {/* 🔵 RECENT BOOKINGS - NOW FIRST */}
      {bookings.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '16px 16px 8px 16px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>Recent Bookings</h2>
            </div>
            
            <div style={{
              maxHeight: '200px',
              overflowY: 'auto',
              padding: '0 16px'
            }}>
              {bookings.map((booking, index) => (
                <div key={booking.id}>
                  <div style={{
                    padding: '14px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    minHeight: '44px'
                  }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '500' }}>{booking.roomName}</div>
                      <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                        {booking.date} | {booking.startTime}
                      </div>
                    </div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: booking.status === 'confirmed' ? '#d4edda' : '#fff3cd',
                      color: booking.status === 'confirmed' ? '#155724' : '#856404'
                    }}>
                      {booking.status}
                    </span>
                  </div>
                  {index < bookings.length - 1 && (
                    <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '0' }} />
                  )}
                </div>
              ))}
              
              {bookings.length > 3 && (
                <div style={{
                  padding: '12px 0',
                  textAlign: 'center',
                  fontSize: '13px',
                  color: '#999',
                  borderTop: '1px solid #f0f0f0',
                  marginTop: '4px'
                }}>
                  ↓ {bookings.length - 3} more bookings
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🟢 AVAILABLE ROOMS - NOW SECOND */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e0e0e0',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px 16px 8px 16px',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <h2 style={{ fontSize: '18px', margin: 0 }}>Available Rooms</h2>
          </div>
          
          <div style={{
            maxHeight: '180px',
            overflowY: 'auto',
            padding: '0 16px'
          }}>
            {rooms.map((room, index) => (
              <div key={room.id}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 0',
                  minHeight: '44px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(room.status || 'available')
                    }}></div>
                    <span style={{ fontSize: '15px', fontWeight: '500' }}>{room.name}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/map?room=${room.id}`)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '13px',
                      backgroundColor: '#1976d2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      minHeight: '36px'
                    }}
                  >
                    View
                  </button>
                </div>
                
                {index < rooms.length - 1 && (
                  <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '0' }} />
                )}
              </div>
            ))}
            
            {rooms.length > 3 && (
              <div style={{
                padding: '12px 0',
                textAlign: 'center',
                fontSize: '13px',
                color: '#999',
                borderTop: '1px solid #f0f0f0',
                marginTop: '4px'
              }}>
                ↓ {rooms.length - 3} more rooms
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;