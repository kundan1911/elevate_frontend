import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Stack, InputGroup, InputRightElement, FormControl, FormLabel, Heading, Text, Switch, HStack, useNumberInput } from '@chakra-ui/react';
import axios from 'axios';
import LevelInfo from './LevelInfo'; // Import the new component

const Register = ({ onRegister, onSwitchToLogin }) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: 2,
        min: 1,
        max: 10,
    });
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();
    const [buildingName, setBuildingName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [multipleFloors, setMultipleFloors] = useState(false);
    const [isProceed, setIsProceed] = useState(false); // Track if proceed button is clicked
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        if (multipleFloors) {
            const numberOfLevels = input.value;
            setLevels(Array.from({ length: numberOfLevels }, () => ({ name: '', pin: '' })));
        } else {
            setLevels([]);
        }
    }, [input.value, multipleFloors]);

    const validatePassword = (password) => {
        const hasLength = password.length >= 8;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNumber = /\d/.test(password);

        if (hasLength && hasSpecialChar && hasNumber) {
            setPasswordStrength('Strong password');
        } else {
            setPasswordStrength('Weak password');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleRegister = async () => {
        if (!buildingName || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (passwordStrength === 'Weak password') {
            setError('Password must be strong.');
            return;
        }

        try {
            const data = { buildingName, password };
            if (multipleFloors) {
                data.levels = levels;
            }
            const response = await axios.post('http://127.0.0.1:8000/register', data);
            if (response.data.success) {
                onRegister();
            } else {
                setError('Error registering. Please try again.');
            }
        } catch (err) {
            setError('Error registering. Please try again.');
        }
    };

    const handleProceed = () => {
        if (!buildingName || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (passwordStrength === 'Weak password') {
            setError('Password must be strong.');
            return;
        }

        setError('');
        setIsProceed(true);
    };

    const handleBack = () => {
        setIsProceed(false);
    };

    return (
        <>
            {!isProceed ? (
                <Box width={['85vw', '70vw', '65vw', '50vw']} mt={8} p={7} boxShadow="md" borderRadius="xl" bg="white">
                    <Heading mb={6}>Register</Heading>
                    {error && <Text color="red.500" mb={4}>{error}</Text>}
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>Building Name</FormLabel>
                            <Input value={buildingName} onChange={(e) => setBuildingName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Set Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {password && <Text mt={2} color={passwordStrength === 'Strong password' ? 'green.500' : 'red.500'}>{passwordStrength}</Text>}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </FormControl>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='multiple-floors' mb='0'>
                                Multiple parking floors?
                            </FormLabel>
                            <Switch
                                id='multiple-floors'
                                colorScheme='teal'
                                isChecked={multipleFloors}
                                onChange={(e) => {
                                    setMultipleFloors(e.target.checked);
                                    setIsProceed(false);
                                }}
                            />
                        </FormControl>

                        {multipleFloors && (
                            <HStack width='60%'>
                                <Button {...dec}>-</Button>
                                <Input textAlign={'center'} {...input} />
                                <Button {...inc}>+</Button>
                            </HStack>
                        )}

                        <Button mt={2} bg="#F7921C" color="white" _hover={{ bg: '#e6811b' }} onClick={multipleFloors ? handleProceed : handleRegister}>
                            {multipleFloors ? 'Proceed' : 'Register'}
                        </Button>

                        <Button variant="link" onClick={onSwitchToLogin}>Login</Button>
                    </Stack>
                </Box>
            ) : (
                <LevelInfo levels={levels} setLevels={setLevels} onRegister={handleRegister} onBack={handleBack} />
            )}
        </>
    );
};

export default Register;
