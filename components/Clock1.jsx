import React, { useState, useEffect, useRef } from 'react';

const Clock = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [alarmTime, setAlarmTime] = useState("");
  const [isRinging, setIsRinging] = useState(false);

  // Use a ref for the audio so it persists across renders
  const audioRef = useRef(new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'));

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

  // Combined Time/Alarm Logic
  useEffect(() => {
    const checkTime = setInterval(() => {
      const now = new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5);
      
      // Only trigger if the time matches and it's not already ringing
      if (alarmTime && now === alarmTime && !isRinging) {
        setIsRinging(true);
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
        audioRef.current.loop = true; // Keep playing until dismissed
      }
    }, 1000);

    return () => clearInterval(checkTime);
  }, [alarmTime, isRinging]);

  const stopAlarm = () => {
    setIsRinging(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset audio to beginning
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
      <h2>Stopwatch: {seconds}s</h2>
      <button onClick={() => setIsActive(true)}>Start</button>
      <button onClick={() => setIsActive(false)}>Stop</button>
      <button onClick={() => {setSeconds(0); setIsActive(false)}}>Reset</button>

      <hr />

      <h3>Set Alarm</h3>
      <input type="time" onChange={(e) => setAlarmTime(e.target.value)} />
      
      {isRinging && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ color: 'red', animation: 'blink 1s linear infinite' }}>🔔 ALARM RINGING! 🔔</h2>
          <button onClick={stopAlarm} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Dismiss
          </button>
        </div>
      )}

      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Clock;