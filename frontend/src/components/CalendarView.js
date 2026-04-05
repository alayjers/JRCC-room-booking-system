import React, { useState } from 'react';

function CalendarView({ onDateSelect, bookings = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Get month and year
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names (short)
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Get first day of month (0 = Sunday, adjust to Monday = 0)
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Adjust to Monday first

  // Get last day of month
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Previous month days
  const prevMonthLastDate = new Date(year, month, 0).getDate();

  // Generate calendar days
  const days = [];

  // Previous month days
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDate - i,
      currentMonth: false,
      date: new Date(year, month - 1, prevMonthLastDate - i)
    });
  }

  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    days.push({
      day: i,
      currentMonth: true,
      date: new Date(year, month, i)
    });
  }

  // Next month days (to fill 6 rows = 42 cells)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      currentMonth: false,
      date: new Date(year, month + 1, i)
    });
  }

  // Check if date has bookings
  const hasBooking = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.some(b => b.date === dateStr);
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is selected
  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  // Navigation
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
    if (onDateSelect) {
      onDateSelect(new Date());
    }
  };

  return (
    <div style={styles.container}>
      {/* Month Header with Navigation */}
      <div style={styles.header}>
        <button onClick={goToPrevMonth} style={styles.navButton}>←</button>
        <h2 style={styles.monthTitle}>
          {monthNames[month]} {year}
        </h2>
        <button onClick={goToNextMonth} style={styles.navButton}>→</button>
      </div>

      {/* Day Names */}
      <div style={styles.weekDays}>
        {dayNames.map(day => (
          <div key={day} style={styles.weekDay}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={styles.grid}>
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day.date)}
            style={{
              ...styles.dayButton,
              opacity: day.currentMonth ? 1 : 0.3,
              backgroundColor: isSelected(day.date) ? '#1976d2' : 
                             isToday(day.date) ? '#e3f2fd' : 'transparent',
              color: isSelected(day.date) ? 'white' : '#333',
              border: isToday(day.date) && !isSelected(day.date) ? '2px solid #1976d2' : '1px solid #eee'
            }}
          >
            <span>{day.day}</span>
            {hasBooking(day.date) && (
              <div style={styles.bookingDot} />
            )}
          </button>
        ))}
      </div>

      {/* Today Button */}
      <div style={styles.todayContainer}>
        <button onClick={goToToday} style={styles.todayButton}>
          Today
        </button>
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <div style={styles.selectedDate}>
          Selected: {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '390px',
    margin: '0 auto',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    boxSizing: 'border-box'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '0 5px'
  },
  monthTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    color: '#333'
  },
  navButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '10px',
    minWidth: '44px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1976d2'
  },
  weekDays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    marginBottom: '5px',
    textAlign: 'center'
  },
  weekDay: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
    padding: '8px 0'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px'
  },
  dayButton: {
    position: 'relative',
    aspectRatio: '1 / 1',
    border: '1px solid #eee',
    borderRadius: '8px',
    background: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '500',
    minHeight: '44px',
    padding: 0,
    transition: 'all 0.2s'
  },
  bookingDot: {
    position: 'absolute',
    bottom: '4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#ff4444'
  },
  todayContainer: {
    marginTop: '15px',
    textAlign: 'center'
  },
  todayButton: {
    background: 'none',
    border: '1px solid #1976d2',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '14px',
    color: '#1976d2',
    cursor: 'pointer',
    minHeight: '44px',
    fontWeight: '500'
  },
  selectedDate: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#333',
    textAlign: 'center'
  }
};

export default CalendarView;