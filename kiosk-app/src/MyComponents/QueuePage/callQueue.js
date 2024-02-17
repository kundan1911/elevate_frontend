import React, { useState ,useEffect} from 'react';
import CallBlock from './callBlock';
import axios from 'axios';
import './CallQueue.css';
import { useToast } from "@chakra-ui/react";

const CallQueue = (props) => {
  const [socket, setSocket] = React.useState(null);
  const toast = useToast();

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/alerts'); // Replace with your server URL

    newSocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

  // Your success toast and logic
  console.log('Master Online');
  toast({
    title: "success",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top-right", // Set position to "top-right"
  });
  
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);
  const [callQueue, setCallQueue] = useState([
    { id: 1, slotNo: '506' },
    { id: 2, slotNo: '304' },
    { id: 3, slotNo: '201' },
    { id: 4, slotNo: '201' },
    { id: 5, slotNo: '201' },
    { id: 6, slotNo: '201' },
    { id: 7, slotNo: '201' },
    { id: 8, slotNo: '201' },
    { id: 9, slotNo: '201' },
  ]);
  props.setbackButton(false)
  const handleDone = id => {
    console.log('Done with call:', id);

axios.post('http://127.0.0.1:8000/websocketTestingview', {
      phone_number: '86858466',
      message: "4584859489ijkgjkjgk"
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

    const updatedQueue = callQueue.filter(call => call.id !== id);
    setCallQueue(updatedQueue);
  };

  return (
    <div className="call-queue">
      <div className="call-blocks">
        {callQueue.map(call => (
          <CallBlock
            key={call.id}
            slotNo={call.slotNo}
            onDone={() => handleDone(call.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CallQueue;
