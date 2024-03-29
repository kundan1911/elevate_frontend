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
  const [carNoToUpdate, setCarNoToUpdate] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'name' || id === 'car_number' || id === 'parking_slot_number') {
      // Convert input to uppercase for name, car number, and parking slot number inputs
      setOwnerData({ ...ownerData, [id]: value.toUpperCase() });
    } else if (id === 'phone_number') {
      // Limit phone number input to 10 digits
      setOwnerData({ ...ownerData, [id]: value.replace(/\D/, '').slice(0, 10) });
    }
  };

  const handleEdit = () => {
    axios.post('http://127.0.0.1:8000/update_owner_data', { newOwnerData: ownerData, OwnerToUpdate: carNoToUpdate })
      .then(response => {
        console.log('Data updated successfully:', response.data);
        navigate('/admin');
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const car_number = searchParams.get('car_no');
    setCarNoToUpdate(car_number);

    axios.post('http://127.0.0.1:8000/get_car_owner_detail', { car_number: car_number })
      .then(response => {
        const ownerData = JSON.parse(response?.data?.data);
        setOwnerData(ownerData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCancel = () => {
    navigate('/admin');
  };

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
            <label htmlFor="car_number">Enter Car No.</label>
          </div>

          <div className="input-container">
            <input
              type="text"
              id="parking_slot_number"
              required
              value={ownerData.parking_slot_number}
              onChange={handleInputChange}
            />
            <label htmlFor="parking_slot_number">Enter Slot No.</label>
          </div>

          <div className="input-container">
            <input
              type="text"
              id="phone_number"
              required
              value={ownerData.phone_number}
              onChange={handleInputChange}
            />
            <label htmlFor="phone_number">Enter Phone No.</label>
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