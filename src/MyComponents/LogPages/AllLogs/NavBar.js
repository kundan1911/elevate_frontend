import React, { useState } from 'react';
import { Flex, Button, Box } from '@chakra-ui/react';
import MyDatePicker from './MyDatePicker'; // Import the date picker component
import MonthComponent from './MonthComponent';
import NameSearch from './NameSearch';

const NavBar = () => {
    const [activeOption, setActiveOption] = useState('All');
    const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of the date picker
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showNamePicker, setShowNamePicker] = useState(false);
    const handleOptionClick = (option) => {
      setActiveOption(option);
      if (option === 'Date') {
        if(showDatePicker === false)
            setShowDatePicker(true); // Show the date picker when "Date" is clicked
        else
            setShowDatePicker(false)
      } else {
        setShowDatePicker(false); // Hide the date picker for other options
      }

      if (option === 'Month') {
        if(showMonthPicker === false)
        setShowMonthPicker(true); // Show the date picker when "Date" is clicked
        else
            setShowMonthPicker(false)

      } else {
        setShowMonthPicker(false); // Hide the date picker for other options
      }
      if (option === 'Name'){
        if(showNamePicker === false)
          setShowNamePicker(true)
        else
          setShowNamePicker(false) 
      }
      else{
        setShowNamePicker(false)
      }
    };
  

  return (
    <Box minWidth="70vw" bg={'white'} h="auto" borderRadius="md" p={0}>
      <Flex position={'relative'} justifyContent="center" mt={0}>
        <Button
          flex="1"
          size="lg" // Set button size to large
          fontSize="xl"
          onClick={() => handleOptionClick('All')}
          bg={activeOption === 'All' ? '#F7921C' : 'transparent'} // Set background color
          color={activeOption === 'All' ? 'white' : 'grey'} // Set text color
          border="none" // Remove border
          _hover={{ bg: activeOption === 'All' ? '#F7921C' : '#f0f0f0', color: activeOption === 'All' ? 'white' : 'gray.800' }} // Change background color and text color on hover
        >
          All
        </Button>
        <Button
          flex="1"
          size="lg" // Set button size to large
          fontSize="xl"
          onClick={() => handleOptionClick('Month')}
          bg={activeOption === 'Month' ? '#F7921C' : 'transparent'} // Set background color
          color={activeOption === 'Month' ? 'white' : 'grey'} // Set text color
          border="none" // Remove border
          _hover={{ bg: activeOption === 'Month' ? '#F7921C' : '#f0f0f0', color: activeOption === 'Month' ? 'white' : 'gray.800' }} // Change background color and text color on hover
        >
          Month
        </Button>
        <Button
          flex="1"
          size="lg" // Set button size to large
          fontSize="xl"
          onClick={() => handleOptionClick('Date')}
          bg={activeOption === 'Date' ? '#F7921C' : 'transparent'} // Set background color
          color={activeOption === 'Date' ? 'white' : 'grey'} // Set text color
          border="none" // Remove border
          _hover={{ bg: activeOption === 'Date' ? '#F7921C' : '#f0f0f0', color: activeOption === 'Date' ? 'white' : 'gray.800' }} // Change background color and text color on hover
        >
          Date
        </Button>
        <Button
          flex="1"
          size="lg" // Set button size to large
          fontSize="xl"
          onClick={() => handleOptionClick('Name')}
          bg={activeOption === 'Name' ? '#F7921C' : 'transparent'} // Set background color
          color={activeOption === 'Name' ? 'white' : 'grey'} // Set text color
          border="none" // Remove border
          _hover={{ bg: activeOption === 'Name' ? '#F7921C' : '#f0f0f0', color: activeOption === 'Name' ? 'white' : 'gray.800' }} // Change background color and text color on hover
        >
          Name
        </Button>
      </Flex>
      {showDatePicker && <MyDatePicker />} {/* Render the date picker when showDatePicker is true */}
      {showMonthPicker && <MonthComponent />}
      {showNamePicker && <NameSearch/>}
    </Box>
  );
};

export default NavBar;

