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
      console.log('dfkdjddfd')
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
  console.log(data)
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
  console.log("call data:",data.phone_number)
  if(data.phone_number)
  setCallQueue(prevCallQueue => [...prevCallQueue, data.phone_number]);
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
  props.setlogButton(false)
  props.setadminButton(true)
  props.sethomeButton(false)
  const handleDone = Calldata => {
    console.log('Done with call:', Calldata);

axios.post('http://127.0.0.1:8000/send_car_ready_sms', {
      phone_number: Calldata.phone_number,
      parking_slot_number:Calldata.parking_slot_number
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

    const updatedQueue = callQueue.filter(call => call.phone_number !== Calldata.phone_number);
    setCallQueue(updatedQueue);
  };

  return (
    <div className="call-queue">
      <div className="call-blocks">
        {callQueue.map((call,index) => (
          <CallBlock
            key={index}
            slotNo={call.parking_slot_number}
            onDone={() => handleDone(call)}
          />
        ))}
      </div>
    </div>
  );
};

export default CallQueue;