import React, { useState, useEffect, useRef } from 'react';
import Counter from './components/Counter';
import Clock from './components/Clock'; 
import './App.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('menu');
  
  const [alarmTime, setAlarmTime] = useState("");
  const [isRinging, setIsRinging] = useState(false);
  const audioRef = useRef(new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'));

  useEffect(() => {
    const checkTime = setInterval(() => {
      const now = new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5);
      if (alarmTime && now === alarmTime && !isRinging) {
        setIsRinging(true);
        audioRef.current.loop = true;
        audioRef.current.play().catch(e => console.log("Interaction required for audio"));
      }
    }, 1000);
    return () => clearInterval(checkTime);
  }, [alarmTime, isRinging]);

  const stopAlarm = () => {
    setIsRinging(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setAlarmTime(""); 
  };

  return (
    <div id="root">
      <h1 className="main-title">Minnie's Multi-Tool</h1>
      
      <nav className="nav-bar">
        <button className="nav-btn" onClick={() => setActiveComponent('counter')}>Show Counter</button>
        <button className="nav-btn" onClick={() => setActiveComponent('clock')}>Show Clock</button>
        <button className="nav-btn" onClick={() => setActiveComponent('menu')}>Home</button>
      </nav>

      <main className="main-content">
        {activeComponent === 'menu' && (
          <div className="welcome-screen" style={{textAlign: 'center', marginTop: '50px'}}>
            <p>Please select a tool above to wake up Minnie!</p>
            {alarmTime && <p style={{color: '#ff4d6d'}}>🎀 Alarm set for: {alarmTime} 🎀</p>}
          </div>
        )}

        {(activeComponent === 'counter' || activeComponent === 'clock') && (
          <div className="mickey-clock">
            <div className="ears-container">
               <div className="ear left-ear"></div>
               <div className="ear right-ear"></div>
            </div>
            
            <div className="bow-button"></div>

            {/* Added Eyebrows */}
            <div className="eyebrows-container">
              <div className="eyebrow"></div>
              <div className="eyebrow"></div>
            </div>

            <div className="eyes-container">
              {/* Left Eye with Eyelashes */}
              <div className="eye eye-left">
                <div className="eyelashes">
                  <div className="eyelashes-inner"></div>
                </div>
                <div className="pupil"></div>
              </div>
              
              {/* Right Eye with Eyelashes */}
              <div className="eye eye-right">
                <div className="eyelashes">
                  <div className="eyelashes-inner"></div>
                </div>
                <div className="pupil"></div>
              </div>
            </div>

            <div className="nose"></div>

            <div className="time-display">
              {activeComponent === 'counter' ? (
                <Counter />
              ) : (
                <Clock alarmTime={alarmTime} setAlarmTime={setAlarmTime} />
              )}
            </div>

            <div className="controls-container">
              <button className="btn-reset" onClick={() => setActiveComponent('menu')}>
                Back Home
              </button>
            </div>
          </div>
        )}
      </main>

      {isRinging && (
        <div className="alarm-overlay" style={{
            position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
            background: '#ff4d6d', padding: '20px', borderRadius: '20px', color: 'white', zIndex: 2000
          }}>
          <p>🎀 MINNIE ALARM! 🎀</p>
          <button className="btn-stop-alarm" onClick={stopAlarm}>STOP</button>
        </div>
      )}
    </div>
  );
}

export default App;