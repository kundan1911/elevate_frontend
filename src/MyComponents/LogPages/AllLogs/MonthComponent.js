import React, { useState } from 'react';
import { Flex, Select, Button } from '@chakra-ui/react';

const MonthComponent = ({ onSelectMonth }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2022; year--) {
    years.push(year);
  }

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const handleSelectYear = (year) => {
    setSelectedYear(year);
  };

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
  };

  const handleButtonClick = () => {
    onSelectMonth(selectedYear, selectedMonth);
  };

  return (
    <Flex justifyContent="center" alignItems="center" m={4} p={3} width={'50vw'} bg={'white'} borderRadius="xl" position={'absolute'} boxShadow="xl">
      <Select placeholder="Select Year" value={selectedYear} m={2} onChange={(e) => handleSelectYear(e.target.value)}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <Select placeholder="Select Month" value={selectedMonth} m={2} onChange={(e) => handleSelectMonth(e.target.value)}>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </Select>
      <Button onClick={handleButtonClick} m={2} colorScheme="teal" minWidth={"20%"}>
        Search
      </Button>
    </Flex>
  );
};

export default MonthComponent;