// Mobile-responsive style constants
export const colors = {
  primary: '#1976d2',
  secondary: '#dc3545',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  gray: '#6c757d',
};

export const mobileStyles = {
  // Container that works on all devices
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    '@media (max-width: 768px)': {
      padding: '10px',
    },
  },

  // Card component
  card: {
    backgroundColor: colors.white,
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    '@media (max-width: 768px)': {
      padding: '16px',
      borderRadius: '8px',
    },
  },

  // Flex row that stacks on mobile
  flexRow: {
    display: 'flex',
    gap: '20px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '10px',
    },
  },

  // Grid that changes columns based on screen size
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },

  // Touch-friendly button
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    minHeight: '44px',
    minWidth: '44px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: colors.primary,
    color: colors.white,
    cursor: 'pointer',
    fontWeight: '500',
    '@media (max-width: 768px)': {
      padding: '14px 20px',
      width: '100%',
    },
    '&:active': {
      opacity: 0.8,
    },
    '&:disabled': {
      backgroundColor: colors.gray,
      cursor: 'not-allowed',
    },
  },

  // Input field
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '15px',
    '@media (max-width: 768px)': {
      padding: '14px',
    },
  },

  // Bottom navigation for mobile
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px',
    zIndex: 1000,
  },

  // Map container
  mapContainer: {
    width: '100%',
    height: '500px',
    backgroundColor: colors.light,
    borderRadius: '8px',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      height: '400px',
    },
  },

  // Room marker
  roomMarker: {
    position: 'absolute',
    padding: '8px 12px',
    backgroundColor: colors.white,
    border: '2px solid',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    '@media (max-width: 768px)': {
      padding: '10px 15px',
      fontSize: '16px',
    },
  },

  // Time slot button
  timeSlot: {
    padding: '12px',
    backgroundColor: colors.light,
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    '@media (max-width: 768px)': {
      padding: '14px',
      fontSize: '16px',
    },
    '&:hover': {
      backgroundColor: '#e9ecef',
    },
    '&.selected': {
      backgroundColor: colors.primary,
      color: colors.white,
    },
  },

  // Hide on desktop, show on mobile
  showOnMobile: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },

  // Hide on mobile, show on desktop
  hideOnMobile: {
    display: 'block',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
};