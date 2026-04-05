import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SettingsPage({ user, onLogout }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  // TAILORED FOR 390px WIDTH
  const mobileContainerStyle = {
    width: '100%',
    maxWidth: '390px', // Matches your tool exactly
    margin: '0 auto',
    padding: '20px 16px', // Balanced padding for mobile edges
    boxSizing: 'border-box',
    minHeight: '844px',
    backgroundColor: '#f8f9fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  const sectionStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #eee',
    marginBottom: '16px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  return (
    <div style={mobileContainerStyle}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', margin: '0 0 4px 0' }}>Settings</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Account & Application</p>
      </div>

      {/* Profile Section - Now stretches to full mobile width */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: '14px', color: '#888', textTransform: 'uppercase', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>
          Profile
        </h2>
        
        <div>
          <div style={{ fontSize: '13px', color: '#999' }}>Name</div>
          <div style={{ fontSize: '16px', fontWeight: '500' }}>{user?.name || 'Academic Staff'}</div>
        </div>

        <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '12px' }}>
          <div style={{ fontSize: '13px', color: '#999' }}>Email</div>
          <div style={{ fontSize: '16px', fontWeight: '500' }}>{user?.email || 'staff@university.edu'}</div>
        </div>

        <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '12px' }}>
          <div style={{ fontSize: '13px', color: '#999' }}>Department</div>
          <div style={{ fontSize: '16px', fontWeight: '500' }}>{user?.department || 'Mathematics'}</div>
        </div>
      </div>

      {/* Appearance Section */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>Dark Mode</div>
            <div style={{ fontSize: '13px', color: '#888' }}>Switch theme</div>
          </div>
          <div 
            onClick={() => setDarkMode(!darkMode)}
            style={{
              width: '50px',
              height: '26px',
              backgroundColor: darkMode ? '#007aff' : '#e9e9eb',
              borderRadius: '15px',
              position: 'relative',
              transition: '0.2s'
            }}
          >
            <div style={{
              width: '22px',
              height: '22px',
              backgroundColor: 'white',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: darkMode ? '26px' : '2px',
              transition: '0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }} />
          </div>
        </div>
      </div>

      {/* System Section */}
      <div style={{ ...sectionStyle, alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: '14px', color: '#333' }}>Room Booking System</div>
        <div style={{ fontSize: '12px', color: '#999' }}>Version 1.0.0 • 2026</div>
      </div>

      {/* Logout - Red Background, Large Tap Target */}
      <button
        onClick={handleLogout}
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: '#ff3b30', // Standard iOS Red
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          marginTop: '8px',
          cursor: 'pointer'
        }}
      >
        LOGOUT
      </button>
    </div>
  );
}

export default SettingsPage;