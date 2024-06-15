import React, { useState } from 'react';
import { Box, Button, Stack, FormControl, FormLabel, Heading, Input, Flex } from '@chakra-ui/react';
import { ArrowBackIcon } from "@chakra-ui/icons";

const LevelInfo = ({ levels, setLevels, onRegister, onBack }) => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleLevelChange = (field, value) => {
        const newLevels = [...levels];
        newLevels[currentTab][field] = value;
        setLevels(newLevels);
    };

    const handleNextTab = () => {
        if (levels[currentTab].name && levels[currentTab].pin) {
            setCurrentTab(currentTab + 1);
        }
    };

    const handlePreviousTab = () => {
        setCurrentTab(currentTab - 1);
    };

    const handleSubmit = () => {
        onRegister();
    };

    const allDetailsEntered = levels.every(level => level.name && level.pin);

    return (
        <Box width={['85vw', '70vw', '65vw', '50vw']} mt={8} p={7} boxShadow="md" borderRadius="xl" bg="white">
            <Heading mb={6}>Level {currentTab + 1}</Heading>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Level Name</FormLabel>
                    <Input
                        value={levels[currentTab].name || ''}
                        onChange={(e) => handleLevelChange('name', e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>4 Digit Pin</FormLabel>
                    <Input
                        type="password"
                        value={levels[currentTab].pin || ''}
                        onChange={(e) => handleLevelChange('pin', e.target.value)}
                    />
                </FormControl>
            </Stack>
            <Flex mt={4} justify={'space-between'} flexDirection={'row-reverse'}>

                {currentTab < levels.length - 1 && (
                    <Button
                        onClick={handleNextTab}
                        isDisabled={!levels[currentTab].name || !levels[currentTab].pin}
                    >
                        Next
                    </Button>
                )}
                {currentTab === levels.length - 1 && (
                    <Button
                        onClick={handleSubmit}
                        isDisabled={!allDetailsEntered}
                        bg="#F7921C"
                        color="white"
                        _hover={{ bg: '#e6811b' }}
                    >
                        Register
                    </Button>
                )}
                {currentTab > 0 && (
                    <Button onClick={handlePreviousTab}>
                        Previous
                    </Button>
                )}                
            </Flex>
            <Button variant="link" onClick={onBack} mt={6} leftIcon={<ArrowBackIcon />}>
                Back
            </Button>
        </Box>
    );
};

export default LevelInfo;
