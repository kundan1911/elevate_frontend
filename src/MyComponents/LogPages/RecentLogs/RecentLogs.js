import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RecentLogs.css'
import RecentLog_block from './RecentLog_block'; // Adjust the import path based on your project structure
import axios from 'axios'; 
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button,useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
const RecentLogs = (props) => {
  const [callonce, setCall] = useState(1);
  const [recentLogData, setrecentLogData] = useState([]);
  const toast = useToast();
  const navigator = useNavigate();
  const [selectedUser, setSelectedUser] = useState({
    id:'',
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
   
    axios.post('http://127.0.0.1:8000/undo_recent_log', {id:selectedUser.id, name: selectedUser.name,slot_no:selectedUser.slot_no ,time:selectedUser.time})
      .then(response => {
        console.log(response);
        // Refresh users after deletio
        if(response.data.success==true)
        navigator('/')
        else{
          toast({
            title: (response.data.message ), // Handling case when phone_number is undefined
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
    <div>
      <div className="mini-header">
        <div className="UL-heading">Recent Logs</div>
        <Link to='/admin/Logs/allLogs' className="viewAll-btn">All Logs</Link>
      </div>
      <div className="logs-grid">
        <div className='log-titles'>
          <div className='table-headings' id='med'>Name</div>
          <div className='table-headings' id='smol'>Slot No.</div>
          <div className='table-headings' id='med'>Car No.</div>
          <div className='table-headings' id='smol'>Time</div>
          <div className='table-headings' id='xs'>Actions</div>
        </div>

        {/* Rendering RecentLog_block for each log */}
        <div className="log-data">
            {recentLogData.map((log, index) => (
            <RecentLog_block key={index} log={log} onUndo={()=>{handleUndo(log)}}/>
            ))}
        </div>
      </div>
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
    </div>
  );
};

export default RecentLogs;