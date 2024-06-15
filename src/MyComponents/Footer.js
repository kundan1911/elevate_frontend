import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import axios from 'axios';

export default function Footer({ adminButton, logButton }) {
  const off_buzzer = () => {
    axios.post("http://127.0.0.1:8000/off_buzzer")
      .then((response) => {
        console.log("Request sent successfully");
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  };

  return (
    <Box
      as="footer"
      width="100%"
      position="fixed"
      bottom="0"
      bg="#1F4563"
      color="white"
      py={3}
      px={6}
      boxShadow="0px -10px 18.3px 5px rgba(0, 0, 0, 0.25)"
      height={['10vh', '7vh', '7vh', '5vh']}
      display="flex"  // Add this line
      alignItems="center"  // Add this line
      zIndex={5}
    >
      <Flex justify="space-between" align="center" width="100%">
        <Button color={'#1F4563'} onClick={off_buzzer} fontWeight={'bold'} size={'lg'} fontSize='lg'>
          OFF
        </Button>
        {adminButton && (
          <Button as={Link} to="/admin" color={'#1F4563'} fontWeight={'bold'} size={'lg'} fontSize='lg'>
            <Image src="/images/user.png" alt="admin Icon" boxSize="1.3em" mr={2} />
            Admin
          </Button>
        )}
        {logButton && (
          <Button as={Link} to="/admin/Logs" color={'#1F4563'} fontWeight={'bold'} size={'lg'} fontSize='lg'>
            <Image src="/images/user.png" alt="admin Icon" boxSize="1.3em" mr={2} />
            Logs
          </Button>
        )}
      </Flex>
    </Box>
  );
}
