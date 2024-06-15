import React from 'react';
import { Box, Grid, GridItem, IconButton } from "@chakra-ui/react";
// import './UserData.css'

const RecentLog_block = ({ log, onUndo }) => {
  const { name, slot_no, car_number, time } = log;

  return (
    <Grid
      bg={'white'}
      borderRadius={'lg'}
      templateColumns='1.2fr 0.7fr 1.1fr 0.8fr 0.5fr'
      gap={2}
      marginBlock={2.5}
      fontSize={['medium', 'x-large', 'x-large', 'xx-large', 'xx-large']}
      alignItems={'center'}
      paddingBlock={4}
    >
      <GridItem pl={3} width={'100%'}>
        <Box>{name}</Box>
      </GridItem>
      <GridItem pl={2} width={'100%'}>
        <Box className="log-text-wrap">{slot_no}</Box>
      </GridItem>
      <GridItem pl={2} width={'100%'}>
        <Box className="log-text-wrap">{car_number}</Box>
      </GridItem>
      <GridItem pl={2} width={'100%'}>
        <Box className="log-text-wrap">{time}</Box>
      </GridItem>
      <GridItem pl={2} width={'100%'} display="flex" justifyContent="center" alignItems="center">
        <Box>
          <IconButton
            aria-label="Undo"
            icon={
              <Box width="1.7rem" height="1.7rem">
                <img src="/images/undo-arrow 1.png" alt="Undo" style={{ width: '100%', height: '100%' }} />
              </Box>
            }
            onClick={onUndo}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
          />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default RecentLog_block;

