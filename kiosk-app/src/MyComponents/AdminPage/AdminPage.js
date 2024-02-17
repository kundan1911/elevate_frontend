import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import UserData from './UserData'; // Adjust the import path based on your project structure

const AdminPage = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    name: '',
    car_number: ''
  });
  const [showModal, setShowModal] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/get_all_car_owner')
      .then(response => {
        console.log(response);
        setUsers(response.data.data); // Assuming response.data is an array of user objects
      })
      .catch(error => {
        console.log(error);
      });
  }, []); // Empty dependency array to run the effect only once after initial render

  props.setbackButton(true)
  // Dummy functions for demonstration
  const handleEdit = (user) => {
    console.log('Edit user:', user);
    navigator(`/admin/EditUser?car_no=${user}`)

  };
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = () => {
    axios.post('http://127.0.0.1:8000/delete_owner_data', { OwnerToDeleteCarNo: selectedUser.car_number })
      .then(response => {
        console.log(response);
        // Refresh users after deletion
        axios.get('http://127.0.0.1:8000/get_all_car_owner')
          .then(response => {
            setUsers(response.data.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // const handleDelete = (userId) => {
  //   console.log('Delete user with ID:', userId);
  //   axios.post('http://127.0.0.1:8000/delete_owner_data',{ OwnerToDeleteCarNo:userId }
  //   ).then(response => {  
  //     console.log(response);
  //   } ).catch(error => {    
  //     console.log(error);
  //   })
  // };

  return (
    <div>
      <div className="mini-header">
        <div className="UL-heading">Users List</div>
        <Link to='/admin/AddUser' className="add-user-button">Add User</Link>
      </div>
      <div className="users-grid">
        <div className='titles'>
          <p className='table-headings'>Name</p>
          <p className='table-headings'>Slot No.</p>
          <p className='table-headings' id='Phone'>Phone No.</p>
          <p className='table-headings'>Car No.</p>
          <p className='table-headings'>Actions</p>
        </div>
        {/* Render UserData component for each user */}
        <div className="user-data">
          {users.map((user) => (
            <UserData key={user.id} user={user} onEdit={()=>{handleEdit(user.car_number)}} onDelete={()=>{handleDelete(user)}} />
          ))}
        </div>
      </div>
      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
  Are you sure you want to delete user <strong>{selectedUser && selectedUser.name}</strong> with car number <strong>{selectedUser && selectedUser.car_number}</strong>?
</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={confirmDelete}>
              Confirm
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminPage;
