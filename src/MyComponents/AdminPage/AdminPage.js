import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, HStack, Text, Link as ChakraLink, Grid, GridItem } from "@chakra-ui/react";
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
  props.setadminButton(false)
  props.setlogButton(true)
  props.sethomeButton(true)
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
    <Box width="100%" pt={2} pr={3} pl={6} height={'80vh'}>
      <HStack direction="row" pr={2} align="center" mb={3} mt={2} justifyContent="space-between">
        <Text color={'#1F3453'} fontWeight={'bold'} fontSize={['xx-large', 'xxx-large', 'xxx-large']} align={'center'} alignItems={'center'}>Users List</Text>
        <ChakraLink
          as={Link}
          to='/admin/AddUser'
          color="white"
          bg="#F7921C"
          px={4}
          py={2}
          mr={2}
          fontSize='large'
          fontWeight={'medium'}
          borderRadius="md"
          _hover={{ bg: "#e6811b" }}
          _active={{ bg: "#e6811b" }}
        >
          Add User
        </ChakraLink>
      </HStack>

      <Grid
        templateColumns='1.2fr 0.7fr 1.3fr 1.2fr 0.7fr'
        gap={2}
        mt={4}
        fontSize={['large', 'xx-large', 'x-large', 'xx-large', 'xx-large']}
        borderBottom="2px solid gray"
        pr={4}
        fontFamily={'arial'}
      >
        <GridItem color={"gray"} bg={'none'} pl={2}>Name</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2}>Slot</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2}>Phone</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2}>Car No.</GridItem>
        <GridItem color={"gray"} bg={'none'} display="flex" justifyContent="center">Actions</GridItem>
      </Grid>

      <Box pr={2} pb={4} maxHeight={['65.5vh', '67vh', '67.5vh', '72.5vh']} overflowY="auto" className="custom-scrollbar">
        {users.map((user) => (
          <UserData key={user.id} user={user} onEdit={() => { handleEdit(user.car_number) }} onDelete={() => { handleDelete(user) }} />
        ))}
      </Box>
 

       <Modal isOpen={showModal} onClose={closeModal}>
         <ModalOverlay />
         <ModalContent>
           <ModalHeader>Delete User</ModalHeader>
           <ModalCloseButton />
           <ModalBody>
             Are you sure you want to delete user <strong>{selectedUser && selectedUser.name}</strong> with car number <strong>{selectedUser && selectedUser.car_number}</strong>?
           </ModalBody>
           <ModalFooter>

             <Button colorScheme="orange" mr={3} onClick={confirmDelete}>
               Confirm
             </Button>
             <Button onClick={closeModal}>Cancel</Button>
           </ModalFooter>
         </ModalContent>
       </Modal>

      </Box>
      );
};

      export default AdminPage;