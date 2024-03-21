import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Input, Box, Button, Stack, Divider, HStack } from '@chakra-ui/react'; // Import Button component from Chakra UI
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    // Perform search operation with selectedDate
    console.log('Searching for logs of date:', selectedDate);
  };

  // Disable future dates
  const isFutureDate = (date) => {
    return date > new Date();
  };

  return (
      <HStack p={5} mt={3} position={'absolute'} bg={'white'} left={'47%'} borderRadius='xl' boxShadow="xl">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy" // Specify date format
          customInput={<Input />} // Use Chakra UI Input component
          placeholderText="Select a date" // Placeholder text
          showPopperArrow={false} // Hide arrow icon
          maxDate={new Date()} // Disable future dates
      />
      <Button ml="2" colorScheme="teal" onClick={handleSearch}>Search</Button> {/* Add Search button with color */}
    </HStack>
  );
};

export default MyDatePicker;
