import React, { useState, useEffect } from 'react';
import './AddUser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EditUser = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [ownerData, setOwnerData] = useState({
      name: '',
      car_number: '',
      parking_slot_number: '',
      phone_number: ''
    });
    const [carNoToUpdate,setcarNoToUpdate]=useState('')
  
//   const handleInputChange = (e) => {
//     if (e.target.id === 'phoneNo') {
//       // Allow only numbers for phone number input
//       e.target.value = e.target.value.replace(/[^0-9]/g, '');
//     } else {
//       // Convert input to uppercase for name and carNo inputs
//       e.target.value = e.target.value.toUpperCase();
//     }
//   };\

  // Function to handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value)
    setOwnerData({ ...ownerData, [id]: value });
  };

  // Function to handle edit button click
  const handleEdit = () => {
    // Send updated owner data to the backend
    axios.post('http://127.0.0.1:8000/update_owner_data', {newOwnerData:ownerData,OwnerToUpdate:carNoToUpdate})
      .then(response => {
        console.log('Data updated successfully:', response.data);
        // Redirect to admin page after successful update
        navigate('/admin');
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };



  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Get the value of the 'creator' parameter
            const car_number = searchParams.get('car_no');
    
          console.log(car_number);
    setcarNoToUpdate(car_number)
    // Now you can use the user data in your component
    // For example:
    // console.log('User data:', user);
    axios.post('http://127.0.0.1:8000/get_car_owner_detail',{ car_number:car_number })
      .then(response => {
        const ownerData=JSON.parse(response?.data?.data);
        setOwnerData(ownerData)
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 
  const handleCancel = () => {
    // Handle cancel button click
    navigate('/admin')
  }

  return (
    <div className="add-user-container">
    <div className="add-user-box">
      <h2 className="add-user-heading">EDIT USER</h2>
      <div className='inputs'>
        <div className="input-container">
          <input
            type="text"
            id="name"
            required
            value={ownerData.name}
            onChange={handleInputChange}
          />
          <label htmlFor="name">Enter Name</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="car_number"
            required
            value={ownerData.car_number}
            onChange={handleInputChange}
          />
          <label htmlFor="carNo">Enter Car No.</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="parking_slot_number"
            required
            value={ownerData.parking_slot_number}
            onChange={handleInputChange}
          />
          <label htmlFor="slotNo">Enter Slot No.</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="phone_number"
            required
            value={ownerData.phone_number}
            onChange={handleInputChange}
          />
          <label htmlFor="phoneNo">Enter Phone No.</label>
        </div>
      </div>

      <div className="button-container">
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        <button className="add-button" onClick={handleEdit}>Edit</button>
      </div>
    </div>
  </div>
  );
};

export default EditUser;