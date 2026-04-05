# Room Booking System - Development Documentation

## System Flow Summary

### User Flow (Teacher's Experience):

Login → Dashboard → Select Room → Book Room

Dashboard features:
- View schedule
- Check notifications
- Go to Settings
- Calendar View
- Room Map (Interactive)
- Booking confirmation

### Technical Data Flow:

Frontend (React - localhost:3000) ↔ Backend (Node.js - localhost:5000)

API Endpoints:
- POST /api/auth/login - Login with email/password
- GET /api/rooms - Get all rooms
- GET /api/bookings - Get user bookings
- POST /api/bookings - Create new booking
- GET /api/notifications - Get user notifications

## Current Feature Status

### Implemented:
- Login/Logout with JWT tokens
- Dashboard overview
- Room listing with availability
- Booking list display
- Notifications panel
- API integration frontend ↔ backend
- Interactive floor plan with SVG
- Room modal for booking
- Calendar view
- Settings page with dark mode
- Mobile-responsive design (390x844)

### To Be Built (Optional):
- Room Map enhancements
- Real database (currently JSON files)
- User management

## Navigation Structure

Top Navigation Bar (Icon-only):
-  Dashboard (Home)
-  Map
-  Calendar
-  Settings (contains logout button)

## Mobile Optimization (390x844)

- Fixed width: 390px
- Fixed height: 844px
- Vertical scroll only
- No horizontal scroll
- Touch targets: minimum 44px
- Bottom navigation for mobile
- Scrollable containers for lists

## Room Layout (SVG Floor Plan)

Rooms included:
- 101, 102, 103 (top row)
- Main Hall (center) - later divided into 4 rooms (104-107)
- 3 rooms on right side (108-110)
- 201, 202 (bottom left)
- Comlab B (203)
- Com Lab A
- 206, 205, 204

Time slots: 2-hour intervals (9 AM - 9 PM)
- 09:00-11:00
- 11:00-13:00
- 13:00-15:00
- 15:00-17:00
- 17:00-19:00
- 19:00-21:00

## Booking Flow

1. User selects room on map
2. Room details appear below with equipment and capacity
3. User selects available time slot (green = available, red = booked)
4. "BOOK NOW" button becomes active
5. Modal opens for confirmation
6. Confirm booking
7. Booking appears in Dashboard recent bookings and Calendar

## Dashboard Layout Order

1. Welcome header
2. Quick Actions (Map, Calendar buttons)
3. Recent Bookings (scrollable, shows 3 at a time)
4. Available Rooms (scrollable, shows 3 at a time)

## Settings Page Features

- Profile Information (name, email, department)
- Appearance (Dark Mode toggle)
- About (version info)
- Logout button

## Project Structure
MobileWebApp/
├── backend/
│ ├── data/
│ │ ├── users.json
│ │ ├── rooms.json
│ │ ├── bookings.json
│ │ └── notifications.json
│ ├── routes/
│ │ ├── auth.js
│ │ ├── rooms.js
│ │ ├── bookings.js
│ │ └── notifications.js
│ └── server.js
├── frontend/
│ └── src/
│ ├── components/
│ │ ├── Login.js
│ │ ├── Dashboard.js
│ │ ├── MobileMapPage.js
│ │ ├── CalendarPage.js
│ │ ├── CalendarView.js
│ │ ├── RoomModal.js
│ │ ├── FloorPlan.js
│ │ ├── SettingsPage.js
│ │ └── Navbar.js
│ ├── services/
│ │ └── api.js
│ ├── styles/
│ │ └── mobileStyles.js
│ ├── App.js
│ └── App.css
└── README.md

text

## Demo Credentials

- Email: teacher1@school.edu
- Password: password123

## Running the App

### Backend:
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
Frontend:
bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
Color Coding
🟢 Green = Available

🔴 Red = Booked

🔵 Blue = Selected time slot

Key Design Decisions
Mobile-first approach (390x844 viewport)



