import React from 'react';
import './UserData.css'

const UserData = ({ user, onEdit, onDelete }) => {
  const { flatNo, slotNo, phoneNo, carNo } = user;

  return (
    <div className="user-row">
      <p className='data-item'>{flatNo}</p>
      <p className='data-item'>{slotNo}</p>
      <p className='data-item'>{phoneNo}</p>
      <p className='data-item'>{carNo}</p>

      <div className="user-actions">
        <div className='editButton'> 
            <img src="/images/edit_button.png" alt="??"/>
        </div>
        <div className='deleteButton'> 
            <img src="/images/Delete_button.png" alt="??"/>
        </div>  
      </div>

    </div>
  );
};

export default UserData;
