import React from 'react';
import './UserData.css'

const UserData = ({ user, onEdit, onDelete }) => {
  const { name, parking_slot_number, phone_number, car_number } = user;

  return (
    <div className="user-row">
      <div className='data-item' id='med'>{name}</div>
      <div className='data-item' id='smol'>{parking_slot_number}</div>
      <div className='data-item' id='med'>{phone_number}</div>
      <div className='data-item' id='med'>{car_number}</div>

      <div className="user-actions"id='smol'>
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
