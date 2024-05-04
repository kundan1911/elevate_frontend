// Header.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
import { useToast, Button } from "@chakra-ui/react";

const Header = ({ backButton, homeButton,setCallQueue }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [socket, setSocket] = useState(null);

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
          title: "type: " + data.type,
          description: (
            <>
              phoneNo: {data.phone_number.phone_number}
              <Button colorScheme="blue" ml={4} onClick={()=>handleReceive(data.phone_number.user_id)}>
                Receive
              </Button>
            </>
          ),
          status: "success",
          duration: null, // Set duration to null to keep the toast open indefinitely
          isClosable: false, // Disable the default close button
          position: "top-right",
        });
        console.log("call data:", data.phone_number)
        setCallQueue(prevCallQueue => [{ parking_slot_number: data.phone_number.parking_slot_number, startTimeStamp: Date.parse(data.phone_number.timestamp)},...prevCallQueue ]);
      } else if (data?.phone_number){
        toast({
          title: "type: " + data.type + "    phoneNo:" + (data?.phone_number?.phone_number || "N/A"), // Handling case when phone_number is undefined
          status: "error",
          isClosable: true,
          position: "top-right", // Set position to "top-right"
        });
      }
      else{
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
          <img id='ButtonImage' src="/images/backButton.png" alt="Back"  />
        </div> 
      )}
      <div className='logo'>
        <img src="/images/ELEVATE_logo_1.png" alt="Logo" />
      </div>
      {homeButton && (
        <Link to='/' className="home-Btn">
          <img id='homeButtonImage' src="/images/home (5).png" alt="Back"  />
        </Link>
      )}
    </header>
  );
};

export default Header;