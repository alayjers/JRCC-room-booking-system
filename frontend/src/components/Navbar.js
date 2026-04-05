import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiMap, FiCalendar, FiUser } from 'react-icons/fi';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navbar on login page
  if (location.pathname === '/login') return null;

  return (
    <>
      {/* Top Navigation Bar - Icon Only */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#9afda2',
        borderBottom: '1px solid #f0f0f0',
        padding: '4px 0',
        width: '100%',
        maxWidth: '390px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        {/* Icons container with equal spacing */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          padding: '0 4px'
        }}>
          {/* Home/Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: location.pathname === '/dashboard' ? 1 : 0.5,
              color: '#333333',
              transition: 'all 0.2s',
              flex: '0 0 auto'
            }}
          >
            <FiHome size={24} />
          </button>

          {/* Map */}
          <button
            onClick={() => navigate('/map')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: location.pathname === '/map' ? 1 : 0.5,
              color: '#333333',
              transition: 'all 0.2s',
              flex: '0 0 auto'
            }}
          >
            <FiMap size={24} />
          </button>

          {/* Calendar (was Bookings) */}
          <button
            onClick={() => navigate('/calendar')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: location.pathname === '/calendar' ? 1 : 0.5,
              color: '#333333',
              transition: 'all 0.2s',
              flex: '0 0 auto'
            }}
          >
            <FiCalendar size={24} />
          </button>

          {/* Profile/Settings */}
          <button
            onClick={() => navigate('/settings')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: location.pathname === '/settings' ? 1 : 0.5,
              color: '#333333',
              transition: 'all 0.2s',
              flex: '0 0 auto'
            }}
          >
            <FiUser size={24} />
          </button>
        </div>
      </div>

      {/* Small spacer */}
      <div style={{ height: '4px' }} />
    </>
  );
}

export default Navbar;