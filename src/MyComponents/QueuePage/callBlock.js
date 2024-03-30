import React, { useState, useEffect } from 'react';

const CallBlock = ({ slotNo, onDone, uniqueId, startTimeStamp }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [donePressed, setDonePressed] = useState(false);
  const [undoPressed, setUndoPressed] = useState(false);

  useEffect(() => {
    let timer;
    let countdownTimer;
  
    if (!donePressed) {
      // Calculate elapsed time based on start timestamp
      const currentTimeStamp = Date.now();
      const differenceInSeconds = Math.floor((currentTimeStamp - startTimeStamp) / 1000);
      const initialElapsedTime = Math.max(0, differenceInSeconds);
  
      setElapsedTime(initialElapsedTime);
  
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      countdownTimer = setTimeout(() => {
        if (!undoPressed) {
          onDone(); // Call onDone only if undo is not pressed within 10 seconds
        }
        setDonePressed(false);
        setUndoPressed(false);
        setCountdown(0);
      }, 10000);
    }
  
    return () => {
      clearInterval(timer);
      clearTimeout(countdownTimer);
    };
  }, [donePressed, undoPressed, onDone, startTimeStamp]);
  

  useEffect(() => {
    if (donePressed && countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [donePressed, countdown]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleDone = () => {
    setDonePressed(true);
    setCountdown(10);
  };

  const handleUndo = () => {
    setDonePressed(false);
    setCountdown(0);
  };

  return (
    <div className={`call-block ${countdown > 0 ? 'blurred' : ''}`}>
      {/* <div className={`background ${countdown > 0 ? 'blurred' : ''}`}> */}
        <div className="parkingNo">{slotNo}</div>
      {/* </div> */}
      <div className="timer-and-button">
        <div className="timer">{countdown > 0 ? formatTime(countdown) : formatTime(elapsedTime)}</div>
        {countdown > 0 ? (
          <button className='undoButton' onClick={handleUndo}>Undo</button>
        ) : (
          <button className='doneButton' onClick={handleDone}>Done</button>
        )}
      </div>
    </div>
  );
};

export default CallBlock;
