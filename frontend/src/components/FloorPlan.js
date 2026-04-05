import React from 'react';

function FloorPlan({ onRoomPress, selectedRoom }) {
  const rooms = [
    { id: '301', name: 'Room 301', path: 'M225 125 h120 v90 h-120 z', capacity: 30 },
    { id: '302', name: 'Room 302', path: 'M350 125 h120 v90 h-120 z', capacity: 25 },
    { id: '303', name: 'Room303', path: 'M475 125 h120 v90 h-120 z', capacity: 40 },
    { id: '304', name: 'Comlab B', path: 'M380 250 h120 v90 h-120 z', capacity: 50 }, // Changed from 'Room 203' to 'Comlab B'
    { id: '305', name: 'Comlab A', path: 'M500 250 h90 v120 h-90 z', capacity: 50 },
    { id: '306', name: 'Room 306', path: 'M500 370 h90 v100 h-90 z', capacity: 40 },
    { id: '307', name: 'Room 307', path: 'M654 257 h90 v120 h-90 z', capacity: 50 },
    { id: '308', name: 'Room 308', path: 'M380 340 h120 v90 h-120 z', capacity: 30 },
    { id: '309', name: 'Room 309', path: 'M225 250 h120 v70 h-120 z', capacity: 20 },
    { id: '310', name: 'Room 310', path: 'M225 322 h120 v70 h-120 z', capacity: 20 },
    { id: '311', name: 'Room 311', path: 'M225 395 h120 v70 h-120 z', capacity: 20 },
  ];

  return (
    <svg
      viewBox="286 90 400 460"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1a1a1a',
        borderRadius: '12px'
      }}
    >
      {/* SVG content */}
      <path
        d="M220 120 H620 V250 H750 V525 H350 V470 H220 V120 Z"
        fill="none"
        stroke="#666"
        strokeWidth="3"
      />

      {rooms.map((room) => (
        <g key={room.id}>
          <path
            d={room.path}
            fill={selectedRoom?.id === room.id ? 'rgba(25, 118, 210, 0.3)' : 'transparent'}
            stroke={selectedRoom?.id === room.id ? '#1976d2' : 'white'}
            strokeWidth="2"
            onClick={() => onRoomPress(room)}
            style={{ cursor: 'pointer', transition: '0.2s' }}
          />
          <text
            x={
              room.id === '301' ? 285 : 
              room.id === '302' ? 410 :
              room.id === '303' ? 535 :
              room.id === '304' ? 440 :
              room.id === '308' ? 440 :
              room.id === '309' ? 285 : 
              room.id === '310' ? 285 :
              room.id === '305' ? 545 :
              room.id === '306' ? 545 :
              room.id === '307' ? 699 : 
              room.id === '311' ? 285 : 475
            }
            y={
              room.id === '304' ? 295 :
              room.id === '308' ? 385 : 
              room.id === '309' ? 290 : 
              room.id === '310' ? 360 : 
              room.id === '305' ? 310 :
              room.id === '306' ? 420 :
              room.id === '307' ? 317 : 
              room.id === '311' ? 430 : 170
            }
            fill="white"
            fontSize="14"
            textAnchor="middle"
            fontWeight="bold"
            pointerEvents="none"
          >
            {room.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default FloorPlan;