import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CalendarPage from './components/CalendarPage';
import MobileMapPage from './components/MobileMapPage';
import SettingsPage from './components/SettingsPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  // Add booking update counter to trigger refreshes
  const [bookingUpdate, setBookingUpdate] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Function to trigger refresh in Dashboard and Calendar
  const refreshBookings = () => {
    console.log('🔄 App.js: refreshBookings called, setting bookingUpdate to', bookingUpdate + 1);
    setBookingUpdate(prev => {
      const newValue = prev + 1;
      console.log('🔄 App.js: bookingUpdate changed from', prev, 'to', newValue);
      return newValue;
    });
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
        
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login onLoginSuccess={handleLoginSuccess} />
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
                <Dashboard user={user} bookingUpdate={bookingUpdate} /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/calendar" 
            element={
              isAuthenticated ? 
                <CalendarPage user={user} bookingUpdate={bookingUpdate} /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/map" 
            element={
              isAuthenticated ? 
                <MobileMapPage user={user} onBookingConfirmed={refreshBookings} /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              isAuthenticated ? 
                <SettingsPage user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/" 
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            } 
          />
          
          <Route 
            path="*" 
            element={
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>404 - Page Not Found</h2>
                <button 
                  onClick={() => window.location.href = isAuthenticated ? '/dashboard' : '/login'}
                  style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}
                >
                  Go Home
                </button>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;