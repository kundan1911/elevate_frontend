import React from 'react';
import './RecentLog_block.css'
// import './UserData.css'

const RecentLog_block = ({log,onUndo}) => {
  const { name, slot_no, car_number, time } = log;

  return (
    <div className="log-row">
      <div className='recent-data-item' id='med'>{name}</div>
      <div className='recent-data-item' id='smol'>{slot_no}</div>
      <div className='recent-data-item' id='med'>{car_number}</div>
      <div className='recent-data-item' id='smol'>{time}</div>

      <div className="undoBtn" id='xs'  onClick={onUndo}>
            <img src="/images/undo-arrow 1.png" alt="??"/>
      </div>
    </div>
  );
};

export default RecentLog_block;
