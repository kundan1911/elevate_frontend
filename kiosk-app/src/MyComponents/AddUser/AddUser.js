// AddUser.jsx
import React from 'react';
import './AddUser.css';

const AddUser = () => {
  return (
    <div className="add-user-container">
      <div className="add-user-box">
        <h2 className="add-user-heading">ADD USER</h2>
        <div className='inputs'>
          <div className="input-container">
            <input type="text" id="name" required/>
            <label htmlFor="name">Enter Name</label>
          </div>

          <div className="input-container"> 
            <input type="text" id="carNo" required/>
            <label htmlFor="carNo">Enter Car No.</label>
          </div>

          <div className="input-container">            
            <input type="text" id="slotNo" required/>
            <label htmlFor="slotNo">Enter Slot No.</label>
          </div>

          <div className="input-container">
            <input type="text" id="phoneNo" required/>
            <label htmlFor="phoneNo">Enter Phone No.</label>
          </div>
        </div>

        <div className="button-container">
          <button className="cancel-button">Cancel</button>
          <button className="add-button">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
