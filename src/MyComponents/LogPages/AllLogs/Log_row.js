import React from 'react';
import { Grid, GridItem, Box } from "@chakra-ui/react";
import './log_row.css';

const Log_row = ({ log }) => {
  const { name, slotNo, carNo, time, date } = log;

  return (
    <Grid
      bg={'white'}
      borderRadius={'lg'}
      templateColumns='1.2fr 0.7fr 1fr 0.8fr 0.6fr'
      gap={2}
      marginBlock={3}
      fontSize={['medium', 'x-large', 'x-large', 'xx-large', 'xx-large']}
      alignItems={'center'}
      paddingBlock={3}
    >
      <GridItem pl={3} width={'100%'}>
        <Box wordBreak={'keep-all'}>{name}</Box>
      </GridItem > 
      <GridItem pl={2} width={'100%'}>
        <Box className="log-text-wrap">{slotNo}</Box>
      </GridItem>
      <GridItem pl={2} width={'100%'}>
        <Box className="log-text-wrap">{carNo}</Box>
      </GridItem>
      <GridItem pl={2} width={'100%'}>
        <Box className="log-text-wrap">{date}</Box>
      </GridItem>
      <GridItem pl={2} width={'100%'}>
        <Box className="log-text-wrap">{time}</Box>
      </GridItem>
    </Grid>
  );
};

export default Log_row;
