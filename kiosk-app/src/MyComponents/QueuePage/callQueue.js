import React, { useState ,useEffect} from 'react';
import CallBlock from './callBlock';
import axios from 'axios';
import './CallQueue.css';
import { useToast } from "@chakra-ui/react";

const CallQueue = (props) => {
  const [socket, setSocket] = React.useState(null);
  const toast = useToast();
  const [callQueue, setCallQueue] = useState([
    { id: 1, slotNo: '506' },
  ]);
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/alerts/'); // Replace with your server URL

    newSocket.onmessage=function (event){
      const data = JSON.parse(event.data);
        console.log(data);
  // Your success toast and logic
  // console.log('Master Online');
  if(data?.type==="NewOwnerCall"){
  toast({
    title: "type: "+data.type+"    phoneNo:"+data.phone_number,
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top-right", // Set position to "top-right"
  });
  setCallQueue(prevCallQueue => [...prevCallQueue, {data}]);
}
else{
  toast({
    title: "type: "+data.type+"    phoneNo:"+data.phone_number,
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right", // Set position to "top-right"
  });
}
    };
    setSocket(newSocket);

    axios.get('http://127.0.0.1:8000/get_all_received_call')
    .then(response => {
      console.log(response.data);
      setCallQueue([...response.data.data]);
    })
    .catch(error => {
      console.error(error);
    });

    return () => {
      newSocket.close();
    };
  }, []);
  
  props.setbackButton(false)
  const handleDone = id => {
    console.log('Done with call:', id);

axios.post('http://127.0.0.1:8000/handle_incoming_call', {
      phone_number: '23432',
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
        {callQueue.map((call,index) => (
          <CallBlock
            key={index}
            slotNo={call.parking_slot_number}
            onDone={() => handleDone(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CallQueue;
