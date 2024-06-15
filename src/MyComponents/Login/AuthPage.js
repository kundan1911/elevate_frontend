import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import Login from './Login';
import Register from './Register';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSwitchToRegister = () => {
    setIsRegistering(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegistering(false);
  };

  const handleLogin = () => {
    // Handle successful login
  };

  const handleRegister = () => {
    // Handle successful registration
  };

  return (
    <Flex height="81vh" justifyContent="center" alignItems="center" >
      {isRegistering ? (
        <Register onRegister={handleRegister} onSwitchToLogin={handleSwitchToLogin} />
      ) : (
        <Login onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />
      )}
    </Flex>
  );
};

export default AuthPage;
