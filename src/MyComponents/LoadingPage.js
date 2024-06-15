import React, { useState, useEffect } from 'react';
import { Center, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';

const LoadingPage = () => {
  const [backendAvailable, setBackendAvailable] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.post("http://127.0.0.1:8000/check_server")
      .then((response) => {
        if (response.ok) {
          setBackendAvailable(true);
          clearInterval(interval);
        }
      })
      .catch(error => console.error('Error checking backend availability:', error));
    }, 2000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (backendAvailable) {
      window.location.href = '/home'; // Redirect to the home page once the backend is available
    }
  }, [backendAvailable]);

  return (
    <Center h="100vh">
      <Spinner size="xl" color="blue.500" />
      <Text ml={4} fontSize="xl" fontWeight="bold">
        Loading...
      </Text>
    </Center>
  );
};

export default LoadingPage;
