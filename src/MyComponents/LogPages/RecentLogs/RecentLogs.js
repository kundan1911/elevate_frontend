import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecentLog_block from './RecentLog_block';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast, Box, HStack, Text, Link as ChakraLink, Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const RecentLogs = (props) => {
  const [callonce, setCall] = useState(1);
  const [recentLogData, setrecentLogData] = useState([]);
  const toast = useToast();
  const navigator = useNavigate();
  const [selectedUser, setSelectedUser] = useState({
    id: '',
    name: '',
    slot_no: '',

  });
  const [showModal, setShowModal] = useState(false);
  props.setlogButton(false)
  props.setadminButton(true)

  const DisplayRecentLogData = () => {
    console.log("log data  request")
    axios.get('http://localhost:8000/get_all_recent_log')
      .then(response => {
        setrecentLogData([...response.data.data]);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  if (callonce === 1) {
    DisplayRecentLogData();
    setCall(2);
  }
  const handleUndo = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmUndo = () => {

    axios.post('http://192.168.0.176:8000/undo_recent_log', { id: selectedUser.id, name: selectedUser.name, slot_no: selectedUser.slot_no, time: selectedUser.time })
      .then(response => {
        console.log(response);
        // Refresh users after deletio
        if (response.data.success == true)
          navigator('/')
        else {
          toast({
            title: (response.data.message), // Handling case when phone_number is undefined
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right", // Set position to "top-right"
          });
        }

      })
      .catch(error => {
        console.log(error);
      });
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <Box width="100%" pt={2} pr={3} pl={6} height={'80vh'}>
      <HStack direction="row" pr={2} align="center" mb={3} mt={2} justifyContent="space-between">
        <Text color={'#1F3453'} fontWeight={'bold'} fontSize={['xx-large','xxx-large','xxx-large']} align={'center'} alignItems={'center'}> Recent Logs</Text>
        <ChakraLink
          as={Link}
          to="/admin/Logs/allLogs"
          color="white"
          bg="#F7921C"
          px={4}
          py={2}
          mr={2}
          fontSize='large'
          fontWeight={'medium'}
          borderRadius="md"
          _hover={{ bg: "#e6811b" }}
          _active={{ bg: "#e6811b" }}
        >
          All Logs
        </ChakraLink>
      </HStack>
      <Grid
        templateColumns='1.2fr 0.7fr 1.1fr 0.8fr 0.5fr'
        gap={2}
        mt={4}
        fontSize={['large', 'xx-large', 'x-large', 'xx-large', 'xx-large']}
        borderBottom="2px solid gray"
        pr={4}
        fontFamily={'arial'}
      >
        <GridItem color={"gray"} bg={'none'} pl={2}>Name</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2}>Slot</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2}>Car No.</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2}>Time</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2} display="flex" justifyContent="center">Undo</GridItem>
      </Grid>

        {/* Rendering RecentLog_block for each log */}
      <Box pr={2} pb={4} maxHeight={['65.5vh', '67vh', '67.5vh', '72.5vh']} overflowY="auto" className="custom-scrollbar">
        {recentLogData.map((log, index) => (
          <RecentLog_block key={index} log={log} onUndo={() => { handleUndo(log) }} />
        ))}
      </Box>

      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Undo Log</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to Undo user <strong>{selectedUser && selectedUser.name}</strong> at Slot No <strong>{selectedUser && selectedUser.slot_no}</strong>?
          </ModalBody>
          <ModalFooter>

            <Button colorScheme="orange" mr={3} onClick={confirmUndo}>
              Undo
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RecentLogs;