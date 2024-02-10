import React, { useState } from 'react';
import CallBlock from './callBlock';
import './CallQueue.css';

const CallQueue = (props) => {
  const [callQueue, setCallQueue] = useState([
    { id: 1, slotNo: '506' },
    { id: 2, slotNo: '304' },
    { id: 3, slotNo: '201' },
    { id: 4, slotNo: '201' },
    { id: 5, slotNo: '201' },
    { id: 6, slotNo: '201' },
    { id: 7, slotNo: '201' },
    { id: 8, slotNo: '201' },
    { id: 9, slotNo: '201' },
  ]);
  props.setbackButton(false)
  const handleDone = id => {
    const updatedQueue = callQueue.filter(call => call.id !== id);
    setCallQueue(updatedQueue);
  };

  return (
    <div className="call-queue">
      <div className="call-blocks">
        {callQueue.map(call => (
          <CallBlock
            key={call.id}
            slotNo={call.slotNo}
            onDone={() => handleDone(call.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CallQueue;
