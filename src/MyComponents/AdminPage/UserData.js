import React from 'react';
import './UserData.css'

const UserData = ({ user, onEdit, onDelete }) => {
  const { name, parking_slot_number, phone_number, car_number } = user;

  return (
    <div className="user-row">
      <p className='data-item'>{name}</p>
      <p className='data-item'>{parking_slot_number}</p>
      <p className='data-item'>{phone_number}</p>
      <p className='data-item'>{car_number}</p>

      <div className="user-actions">
        <div className='editButton' onClick={onEdit}> 
            <img src="/images/edit_button.png" alt="??"/>
        </div>
        <div className='deleteButton'  onClick={onDelete}> 
            <img src="/images/Delete_button.png" alt="??"/>
        </div>  
      </div>

    </div>
  );
};

export default UserData;
