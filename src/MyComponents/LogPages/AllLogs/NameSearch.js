import React, { useState } from 'react';
import { Flex, Input, Button } from '@chakra-ui/react';

const NameSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Flex position={'absolute'} bg={'white'} p={5} alignItems="center"
    borderRadius='xl' justifyContent="center" mt={4} right={'6%'}>
      <Input
        placeholder="Enter name"
        value={searchTerm}
        onChange={handleChange}
        mr={2}
      />
      <Button colorScheme="teal" onClick={handleSearch}>
        Search
      </Button>
    </Flex>
  );
};

export default NameSearch;
