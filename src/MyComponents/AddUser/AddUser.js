import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useToast, Box, Button, Input, FormControl, FormLabel, Heading, VStack } from "@chakra-ui/react";

const AddUser = (props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = useState('');
  const [carNo, setCarNo] = useState('');
  const [slotNo, setSlotNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isCarNoFocused, setIsCarNoFocused] = useState(false);
  const [isSlotNoFocused, setIsSlotNoFocused] = useState(false);
  const [isPhoneNoFocused, setIsPhoneNoFocused] = useState(false);

  props.setbackButton(true);

  const handleCancel = () => {
    navigate('/admin');
  };

  const handleNameChange = (e) => {
    setName(e.target.value.toUpperCase());
  };

  const handleCarNoChange = (e) => {
    setCarNo(e.target.value.toUpperCase());
  };

  const handleSlotNoChange = (e) => {
    setSlotNo(e.target.value.toUpperCase());
  };

  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value.replace(/\D/g, '').slice(0, 10));
  };

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
          navigate('/admin');
        }
      })
      .catch(error => {
        console.log(error);
      });
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
        <Heading as="h2" fontSize={'xx-large'} mb={8} textAlign="center" color="#1F3453">ADD USER</Heading>
        <VStack spacing={7}>
          <FormControl id="name" >
            <FormLabel fontWeight={'normal'} paddingInline={1} zIndex={3} style={getLabelStyle(isNameFocused, name)}>Enter Name</FormLabel>
            <Input
              size='lg'
              value={name}
              onChange={handleNameChange}
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
            />
          </FormControl>

          <FormControl id="carNo">
            <FormLabel fontWeight={'normal'} paddingInline={1} zIndex={3} style={getLabelStyle(isCarNoFocused, carNo)}>Enter Car No.</FormLabel>
            <Input
              size='lg'
              value={carNo}
              onChange={handleCarNoChange}
              onFocus={() => setIsCarNoFocused(true)}
              onBlur={() => setIsCarNoFocused(false)}
            />
          </FormControl>

          <FormControl id="slotNo">
            <FormLabel fontWeight={'normal'} paddingInline={1} zIndex={3} style={getLabelStyle(isSlotNoFocused, slotNo)}>Enter Slot No.</FormLabel>
            <Input
              size='lg'
              value={slotNo}
              onChange={handleSlotNoChange}
              onFocus={() => setIsSlotNoFocused(true)}
              onBlur={() => setIsSlotNoFocused(false)}
            />
          </FormControl>

          <FormControl id="phoneNo">
            <FormLabel fontWeight={'normal'} paddingInline={1} zIndex={3} style={getLabelStyle(isPhoneNoFocused, phoneNo)}>Enter Phone No.</FormLabel>
              <Input
                size='lg'
                value={phoneNo}
                onChange={handlePhoneNoChange}
                onFocus={() => setIsPhoneNoFocused(true)}
                onBlur={() => setIsPhoneNoFocused(false)}
              />
          </FormControl>

          <Box display="flex" justifyContent="space-between" width="100%">
            <Button colorScheme="gray" onClick={handleCancel} width="48%">Cancel</Button>
            <Button colorScheme='orange' onClick={handleAddUser} width="48%">Add</Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddUser;
