// AddUser.jsx
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useToast } from "@chakra-ui/react";
import './AddUser.css';

const AddUser = (props) => {
  const navigate = useNavigate();
  const toast = useToast();
  props.setbackButton(true)
  const handleCancel=(e)=>{
    navigate('/admin');
  }
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const carNo = document.getElementById('carNo').value;
    const slotNo = document.getElementById('slotNo').value;
    const phoneNo = document.getElementById('phoneNo').value;

    if(name==="" || carNo==="" || slotNo==="" || phoneNo===""){
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right", // Set position to "top-right"
      });
      return;
    }
    axios.post('http://127.0.0.1:8000/new_car_owner', { name:name, car_number:carNo, parking_slot_number:slotNo, phone_number:phoneNo })
      .then(response => {
        console.log(response);
        const sts=response.data.success?"success":"error";
        var despt;
        if(sts==="success"){
          despt="User Added Successfully";

          setTimeout(() => {
            navigate('/admin');
          }, 3000);
        }
        else{
          despt=response.data.error
        }
        toast({
          title: "Car Owner Status",
          description: despt ,
          status: sts,
          duration: 3000,
          isClosable: true,
          position: "top-right", // Set position to "top-right"
        });
        
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
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button className="add-button"  onClick={handleAddUser}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
