import React from 'react';
import './log_row.css'
// import './RecentLog_block.css'
// import './UserData.css'

const Log_row = ({log}) => {
  const { name, parking_slot_number, car_number, date, time } = log;

  return (
    <div className="log-row">
      <div className='log_data-item' id='big'>{name}</div>
      <div className='log_data-item' id='smol'>{parking_slot_number}</div>
      <div className='log_data-item' id='med'>{car_number}</div>
      <div className='log_data-item' id='smol'>{date}</div>
      <div className='log_data-item' id='smol'>{time}</div>
    </div>
  );
};

export default Log_row;
