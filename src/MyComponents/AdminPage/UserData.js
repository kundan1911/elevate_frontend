import React from 'react';
// import './UserData.css'
import { Box, Grid, GridItem, HStack, IconButton } from "@chakra-ui/react";

const UserData = ({ user, onEdit, onDelete }) => {
  const { name, parking_slot_number, phone_number, car_number } = user;

  return (
    <>
      <Grid
        bg={'white'}
        borderRadius={'lg'}
        templateColumns='1.2fr 0.7fr 1.3fr 1.2fr 0.7fr'
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
          <Box className="log-text-wrap">{parking_slot_number}</Box>
        </GridItem>
        <GridItem pl={2} width={'100%'}>
          <Box className="log-text-wrap">{phone_number}</Box>
        </GridItem>
        <GridItem pl={2} width={'100%'}>
          <Box className="log-text-wrap">{car_number}</Box>
        </GridItem>
        <GridItem width={'100%'} display="flex" justifyContent="center" alignItems="center">
          <HStack paddingInline={1} spacing={2} alignItems={'center'} justifyContent={'center'}>
            <IconButton
              aria-label="Undo"
              icon={
                <Box width="1.7rem" height="1.7rem">
                  <img src="/images/edit_button.png" alt="Undo" style={{ width: '100%', height: '100%' }} />
                </Box>
              }
              onClick={onEdit}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
            /> 
            <IconButton
              aria-label="Undo"
              icon={
                <Box width="1.7rem" height="1.7rem">
                  <img src="/images/Delete_button.png" alt="Undo" style={{ width: '100%', height: '100%' }} />
                </Box>
              }
              onClick={onDelete}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
            />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default UserData;


