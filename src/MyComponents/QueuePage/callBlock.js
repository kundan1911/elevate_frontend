import React, { useState, useEffect } from 'react';

const CallBlock = ({ slotNo, onDone }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleDone = () => {
    onDone();
  };

  return (
    <div className="call-block">
      <div className="parkingNo">{slotNo}</div>
      <div className="timer-and-button">
        <div className="timer">{formatTime(elapsedTime)}</div>
        <button className='doneButton' onClick={handleDone}>Done</button>
      </div>
    </div>
  );
};

export default CallBlock;
