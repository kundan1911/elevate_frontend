import React, { useState, useEffect } from 'react';
// import './AddUser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack } from "@chakra-ui/react";

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

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isCarNoFocused, setIsCarNoFocused] = useState(false);
  const [isSlotNoFocused, setIsSlotNoFocused] = useState(false);
  const [isPhoneNoFocused, setIsPhoneNoFocused] = useState(false);

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

    const getLabelStyle = (isFocused, value) => {
      return {
        position: 'absolute',
        top: isFocused || value ? '-0.7rem' : '.6rem',
        left: '0.5rem',
        fontSize: isFocused || value ? 'small' : 'large',
        transition: '0.2s ease-in-out',
        pointerEvents: 'none',
        backgroundColor: 'white',
        px: 1,
      };
    };


    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="81vh">
          <Box bg="white" p={8} rounded="xl" shadow="xl" width="100%" maxW="md">
            <Heading as="h2" fontSize={'xx-large'} mb={8} textAlign="center" color="#1F3453">EDIT USER</Heading>
            <VStack spacing={7}>
              <FormControl id="name" >
                <FormLabel fontWeight={'normal'} paddingInline={1} zIndex={3} style={getLabelStyle(isNameFocused, ownerData.name)}>Enter Name</FormLabel>
                <Input
                  size='lg'
                  type="text"
                  required
                  value={ownerData.name}
                  onChange={handleInputChange}
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={() => setIsNameFocused(false)}
                />
              </FormControl>

              <FormControl id="carNo">
                <FormLabel fontWeight={'normal'} paddingInline={1} zIndex={3} style={getLabelStyle(isCarNoFocused, ownerData.car_number)}>Enter Car No.</FormLabel>
                <Input
                  size='lg'
                  type="text"
                  required
                  value={ownerData.car_number}
                  onChange={handleInputChange}
                  onFocus={() => setIsCarNoFocused(true)}
                  onBlur={() => setIsCarNoFocused(false)}
                />
              </FormControl>

              <FormControl id="slotNo">
                <FormLabel fontWeight={'normal'} paddingInline={1} zIndex={3} style={getLabelStyle(isSlotNoFocused, ownerData.parking_slot_number)}>Enter Slot No.</FormLabel>
                <Input
                  size='lg'
                  required
                  type="text"
                  value={ownerData.parking_slot_number}
                  onChange={handleInputChange}
                  onFocus={() => setIsSlotNoFocused(true)}
                  onBlur={() => setIsSlotNoFocused(false)}
                />
              </FormControl>

              <FormControl id="phoneNo">
                <FormLabel fontWeight={'normal'} paddingInline={1} zIndex={3} style={getLabelStyle(isPhoneNoFocused, ownerData.phone_number)}>Enter Phone No.</FormLabel>
                <Input
                  size='lg'
                  required
                  type="text"
                  value={ownerData.phone_number}
                  onChange={handleInputChange}
                  onFocus={() => setIsPhoneNoFocused(true)}
                  onBlur={() => setIsPhoneNoFocused(false)}
                />
              </FormControl>

              <Box display="flex" justifyContent="space-between" width="100%">
                <Button colorScheme="gray" onClick={handleCancel} width="48%">Cancel</Button>
                <Button colorScheme='orange' onClick={handleEdit} width="48%">Edit</Button>
              </Box>
            </VStack>
          </Box>
        </Box>
    );
  };

  export default EditUser;