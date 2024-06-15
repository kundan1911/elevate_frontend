import React, { useState } from 'react';
import {useDisclosure, Box, Button, Input, Stack, FormControl, InputGroup, InputRightElement, FormLabel, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [buildingId, setBuildingId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', { buildingId, password });
      if (response.data.success) {
        onLogin();
      } else {
        setError('Invalid building ID or password.');
      }
    } catch (err) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <Box width={['85vw', '70vw', '65vw', '50vw']} mt={8} p={7} boxShadow="md" borderRadius="xl" bg="white">
      <Heading mb={8}>Login</Heading>
      {/* {error && <Text color="red.500" mb={4}>{error}</Text>} */}
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Building ID</FormLabel>
          <Input value={buildingId} onChange={(e) => setBuildingId(e.target.value)} />
        </FormControl>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
        <Button onClick={handleLogin} mt={2} bg="#F7921C" color="white" _hover={{ bg: '#e6811b' }}>Login</Button>
        <Button variant="link" onClick={onSwitchToRegister}>New user? Register</Button>
      </Stack>
    </Box>
  );
};

export default Login;
