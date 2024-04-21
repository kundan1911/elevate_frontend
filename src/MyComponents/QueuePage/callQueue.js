import React, { useState, useEffect } from 'react';
import CallBlock from './callBlock';
import axios from 'axios';
import './CallQueue.css';
import { useToast } from "@chakra-ui/react";

const CallQueue = (props) => {
  const [socket, setSocket] = useState(null);
  const toast = useToast();
  const [callQueue, setCallQueue] = useState([]);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/alerts/'); // Replace with your server URL
  
    newSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data?.type === 1 && data.phone_number) {
        toast({
          title: "type: " + data.type + "    phoneNo:" + data.phone_number.phone_number,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right", // Set position to "top-right"
        });
        console.log("call data:", data.phone_number)
        setCallQueue(prevCallQueue => [{ parking_slot_number: data.phone_number.parking_slot_number, startTimeStamp: Date.parse(data.phone_number.timestamp)},...prevCallQueue ]);
      } else if (data?.phone_number){
        toast({
          title: "type: " + data.type + "    phoneNo:" + (data?.phone_number?.phone_number || "N/A"), // Handling case when phone_number is undefined
          status: "error",
          duration: 50000,
          isClosable: true,
          position: "top-right", // Set position to "top-right"
        });
      }
      else{
        console.log("WebSocket connection established");
      }
    };
    setSocket(newSocket);
  
    axios.get('http://127.0.0.1:8000/get_all_received_call')
      .then(response => {
        console.log(response.data);
        setCallQueue([...response.data.data.map(call => ({ ...call, startTimeStamp: Date.parse(call.timestamp) }))]);
      })
      .catch(error => {
        console.error(error);
      });
  
    return () => {
      newSocket.close();
    };
  }, []);
  

  props.setbackButton(false)
  props.setlogButton(false)
  props.setadminButton(true)
  props.sethomeButton(false)

  const handleDone = (callData) => {
    console.log('Done with call:', callData);

    axios.post('http://127.0.0.1:8000/send_car_ready_sms', {
      phone_number: callData.phone_number,
      parking_slot_number: callData.parking_slot_number
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    setCallQueue(prevCallQueue => prevCallQueue.filter(call => call.phone_number !== callData.phone_number));
  };

  return (
    <div className="call-queue">
      <div className="call-blocks">
        {callQueue.map((call, index) => (
          <CallBlock
            key={index}
            slotNo={call.parking_slot_number} // Change to slotNo
            uniqueId={call.id} // Add unique ID if available
            startTimeStamp={call.startTimeStamp}
            onDone={() => handleDone(call)}
          />
        ))}
      </div>
    </div>
  );
};

export default CallQueue;
