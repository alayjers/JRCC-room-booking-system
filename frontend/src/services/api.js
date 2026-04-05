import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

// Rooms API
export const roomsAPI = {
  getRooms: () => api.get('/rooms'),
  getRoomById: (id) => api.get(`/rooms/${id}`),
  getRoomAvailability: (roomId, date) => 
    api.get(`/rooms/${roomId}/availability?date=${date}`),
};

// Bookings API
export const bookingsAPI = {
  getUserBookings: (userId) => api.get(`/bookings?userId=${userId}`),
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
};

// Notifications API
export const notificationsAPI = {
  getUserNotifications: (userId) => api.get(`/notifications?userId=${userId}`),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
};

export default api;