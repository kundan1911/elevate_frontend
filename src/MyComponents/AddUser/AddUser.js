import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useToast } from "@chakra-ui/react";
import './AddUser.css';

const AddUser = (props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = useState('');
  const [carNo, setCarNo] = useState('');
  const [slotNo, setSlotNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  props.setbackButton(true);

  const handleCancel = (e) => {
    navigate('/admin');
  }

  const handleNameChange = (e) => {
    setName(e.target.value.toUpperCase());
  }

  const handleCarNoChange = (e) => {
    setCarNo(e.target.value.toUpperCase());
  }

  const handleSlotNoChange = (e) => {
    setSlotNo(e.target.value.toUpperCase());
  }

  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value.replace(/\D/g, '').slice(0, 10));
  }

  const handleAddUser = (e) => {
    e.preventDefault();

    if (name === "" || carNo === "" || slotNo === "" || phoneNo.length !== 10) {
      toast({
        title: "Error",
        description: "Please fill all the fields correctly",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    axios.post('http://127.0.0.1:8000/new_car_owner', { name, car_number: carNo, parking_slot_number: slotNo, phone_number: phoneNo })
      .then(response => {
        console.log(response);
        const status = response.data.success ? "success" : "error";
        const description = response.data.success ? "User Added Successfully" : response.data.error;
        toast({
          title: "Car Owner Status",
          description,
          status,
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        if (response.data.success) {
          // setTimeout(() => {
          navigate('/admin');
          // },10);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="add-user-container">
      <div className="add-user-box">
        <h2 className="add-user-heading">ADD USER</h2>
        <div className='inputs'>
          <div className="input-container">
            <input type="text" id="name" value={name} onChange={handleNameChange} required />
            <label htmlFor="name">Enter Name</label>
          </div>

          <div className="input-container">
            <input type="text" id="carNo" value={carNo} onChange={handleCarNoChange} required />
            <label htmlFor="carNo">Enter Car No.</label>
          </div>

          <div className="input-container">
            <input type="text" id="slotNo" value={slotNo} onChange={handleSlotNoChange} required />
            <label htmlFor="slotNo">Enter Slot No.</label>
          </div>

          <div className="input-container">
            <input type="text" id="phoneNo" value={phoneNo} onChange={handlePhoneNoChange} required />
            <label htmlFor="phoneNo">Enter Phone No.</label>
          </div>
        </div>

        <div className="button-container">
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button className="add-button" onClick={handleAddUser}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
