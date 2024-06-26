// Header.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
import { useToast, Button,useDisclosure,HStack, PinInput, PinInputField, Select, Modal, ModalBody, ModalHeader, ModalCloseButton, ModalContent, ModalOverlay, ModalFooter } from "@chakra-ui/react";

const Header = ({ backButton, homeButton, setCallQueue }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [socket, setSocket] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/alerts/');

    newSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data?.type === 1 && data.phone_number) {
        const handleReceive = (id) => {
          axios.post("http://127.0.0.1:8000/off_buzzer")
            .then((response) => {
              console.log("Request sent successfully");
              toast.close(id); // Close the toast with the generated id
            })
            .catch((error) => {
              console.error("Error sending request:", error);
            });
        };

        toast({
          id: data.phone_number.user_id, // Assign the generated id to the toast
          title: "New Incoming Request",
          description: (
            <div style={{ paddingBlock: '10px' }}>
              PhoneNo: {data.phone_number.phone_number}
              <Button style={{ color: 'green', backgroundColor: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} size="sm" ml={4} onClick={() => handleReceive(data.phone_number.user_id)}>
                Receive
              </Button>

            </div>
          ),
          status: "success",
          duration: null, // Set duration to null to keep the toast open indefinitely
          isClosable: false, // Disable the default close button
          position: "top-right",
          variant: "solid", // This is to ensure the green color of the button
          containerStyle: {
            padding: 1,
          }
        });


        console.log("call data:", data.phone_number)
        setCallQueue(prevCallQueue => [...prevCallQueue, { id: data.phone_number.user_id, parking_slot_number: data.phone_number.parking_slot_number, startTimeStamp: Date.parse(data.phone_number.timestamp) }]);
      } else if (data?.phone_number) {
        toast({
          title: "type: " + data.type + "    phoneNo:" + (data?.phone_number?.phone_number || "N/A"), // Handling case when phone_number is undefined
          status: "error",
          isClosable: true,
          position: "top-right", // Set position to "top-right"
        });
      }
      else {
        console.log("WebSocket connection established");
      }
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleNavigation = () => {
    console.log("header button clicked");
    if (location.pathname === "/admin") {
      navigate("/");
    }
    else if (location.pathname === "/admin/AddUser") {
      navigate("/admin");
    }
    else if (location.pathname === "/admin/AddUser") {
      navigate("/admin");
    }
    else {
      // Default behavior, go back one step
      navigate(-1);
    }
  };

  return (
    <header className='App-header'>
      {backButton && (
        <div className='backButton' onClick={handleNavigation}>
          <img id='ButtonImage' src="/images/backButton.png" alt="Back" />
        </div>
      )}
      <div className='logo'>
        <img src="/images/ELEVATE_logo_1.png" alt="Logo" />
      </div>
      {homeButton && (
        <Link to='/' className="home-Btn">
          <img id='homeButtonImage' src="/images/home (5).png" alt="Back" />
        </Link>
      )}

<>
      <Button position={'absolute'} left={'15%'} onClick={onOpen}>Switch Level</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Parking Level</ModalHeader>
          <ModalBody>
            <Select mb={4} placeholder='Select Parking Level'>
              <option value='option1'>Level 1</option>
              <option value='option2'>Level 2</option>
              <option value='option3'>Level 3</option>
            </Select>
            {/* Use appropriate content here */}
            <HStack justifyContent={'center'} width={'100%'} mt={7}>
              <PinInput>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    </header>
  );
};

export default Header;