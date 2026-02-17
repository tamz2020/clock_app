import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isAutoIncrementing, setIsAutoIncrementing] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isAutoIncrementing) {
      timer = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAutoIncrementing]);

  return (
    <div style={{ textAlign: 'center', color: '#000' }}>
      <div style={{ fontSize: '3rem', fontWeight: '900', textShadow: '2px 2px #ff85a2' }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
        <button 
          className="nav-btn" 
          style={{ background: '#ff85a2', color: 'white', fontSize: '1.2rem' }}
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
        <button 
          className="nav-btn" 
          style={{ background: '#333', color: 'white', fontSize: '1.2rem' }}
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <button 
          className="nav-btn"
          style={{ background: isAutoIncrementing ? '#ff4d6d' : '#4CAF50', color: 'white', fontSize: '0.8rem', width: '100%' }}
          onClick={() => setIsAutoIncrementing(!isAutoIncrementing)}
        >
          {isAutoIncrementing ? 'Stop Counter' : 'Start Auto-Counter'}
        </button>
      </div>

      <button 
        style={{ marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.8rem' }}
        onClick={() => {setCount(0); setIsAutoIncrementing(false);}}
      >
        Reset Count
      </button>
    </div>
  );
};

export default Counter;