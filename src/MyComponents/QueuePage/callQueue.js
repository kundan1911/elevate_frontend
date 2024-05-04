import React, { useState, useEffect } from 'react';
import CallBlock from './callBlock';
import axios from 'axios';
import './CallQueue.css';
// import { useToast } from "@chakra-ui/react";

const CallQueue = (props) => {
  // const [socket, setSocket] = useState(null);
  // const toast = useToast();
  // const [callQueue, setCallQueue] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/get_all_received_call')
      .then(response => {
        console.log(response.data);
       props.setCallQueue([...response.data.data.map(call => ({ ...call, startTimeStamp: Date.parse(call.timestamp) }))]);
      })
      .catch(error => {
        console.error(error);
      });

    props.setbackButton(false);
    props.setlogButton(false);
    props.setadminButton(true);
    props.sethomeButton(false);
  }, []);

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

    props.setCallQueue(prevCallQueue => prevCallQueue.filter(call => call.phone_number !== callData.phone_number));
  };

  return (
    <div className="call-queue">
      <div className="call-blocks">
        {props.callQueue.map((call, index) => (
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