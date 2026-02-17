import React, { useState, useEffect } from 'react';

const Clock = ({ alarmTime, setAlarmTime }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  // State for the real-time clock
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time Clock Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Stopwatch Logic
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Formatting for the Date and Time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="clock-internal">
      {/* Time Display Area (Inside Minnie's Smile) */}
      <div style={{ fontSize: '1.5rem', marginBottom: '10px', lineHeight: '1.2' }}>
        {isActive ? (
          `⏱️ ${seconds}s`
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.8rem' }}>{formatTime(currentTime)}</span>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.8 }}>{formatDate(currentTime)}</span>
          </div>
        )}
      </div>

      {/* Buttons  */}
      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '10px' }}>
        <button 
          className="nav-btn" 
          style={{ padding: '5px 15px', fontSize: '0.7rem' }} 
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          className="nav-btn" 
          style={{ padding: '5px 15px', fontSize: '0.7rem' }} 
          onClick={() => {setSeconds(0); setIsActive(false);}}
        >
          Reset
        </button>
      </div>

      {/* Alarm Input  */}
      <input
        type="time"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
        style={{
          border: '2px solid #ff4d6d',
          borderRadius: '10px',
          padding: '5px',
          fontFamily: 'inherit',
          fontWeight: 'bold'
        }}
      />
    </div>
  );
};

export default Clock;