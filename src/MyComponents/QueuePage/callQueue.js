import React, { useState, useEffect } from 'react';
import CallBlock from './callBlock';
import axios from 'axios';
// import './CallQueue.css';
import { Box, Grid } from "@chakra-ui/react";
import LevelChoose from '../LevelChoose';

const CallQueue = (props) => {
  useEffect(() => {
    console.log("call queue request")
    axios.get('http://localhost:8000/get_all_received_call')
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

  // Dummy data for testing
  // const dummyData = [
  //   {
  //     id: 1,
  //     parking_slot_number: "101A",
  //     timestamp: "2024-06-15T08:00:00Z",
  //     startTimeStamp: Date.parse("2024-06-15T08:00:00Z")
  //   },
  //   {
  //     id: 2,
  //     parking_slot_number: "202B",
  //     timestamp: "2024-06-15T09:00:00Z",
  //     startTimeStamp: Date.parse("2024-06-15T09:00:00Z")
  //   },
  //   {
  //     id: 3,
  //     parking_slot_number: "303C",
  //     timestamp: "2024-06-15T10:00:00Z",
  //     startTimeStamp: Date.parse("2024-06-15T10:00:00Z")
  //   },
  //   {
  //     id: 4,
  //     parking_slot_number: "101A",
  //     timestamp: "2024-06-15T08:00:00Z",
  //     startTimeStamp: Date.parse("2024-06-15T08:00:00Z")
  //   },
  //   {
  //     id: 5,
  //     parking_slot_number: "202B",
  //     timestamp: "2024-06-15T09:00:00Z",
  //     startTimeStamp: Date.parse("2024-06-15T09:00:00Z")
  //   },
  //   {
  //     id: 6,
  //     parking_slot_number: "303C",
  //     timestamp: "2024-06-15T10:00:00Z",
  //     startTimeStamp: Date.parse("2024-06-15T10:00:00Z")
  //   },
  //   {
  //     id: 7,
  //     parking_slot_number: "101A",
  //     timestamp: "2024-06-15T08:00:00Z",
  //     startTimeStamp: Date.parse("2024-06-15T08:00:00Z")
  //   },
  //   {
  //     id: 8,
  //     parking_slot_number: "202B",
  //     timestamp: "2024-06-15T09:00:00Z",
  //     startTimeStamp: Date.parse("2024-06-15T09:00:00Z")
  //   },
  //   {
  //     id: 9,
  //     parking_slot_number: "303C",
  //     timestamp: "2024-06-15T10:00:00Z",
  //     startTimeStamp: Date.parse("2024-06-15T10:00:00Z")
  //   },
  //   // Add more dummy data as needed
  // ];

  // useEffect(() => {
  //   // Set dummy data to state
  //   props.setCallQueue(dummyData);

  //   // Simulate setting buttons
  //   props.setbackButton(false);
  //   props.setlogButton(false);
  //   props.setadminButton(true);
  //   props.sethomeButton(false);
  // }, []); // Empty dependency array ensures this runs only once on component mount

  const handleDone = (callData) => {
    console.log('Done with call:', callData);

    // Simulate sending SMS
    axios.post('http://localhost:8000/send_car_ready_sms', {
      car_owner_id: callData.id,
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Remove the call from the queue
    props.setCallQueue(prevCallQueue => prevCallQueue.filter(call => call.id !== callData.id));
  };

  return (
    <Box height={'80vh'} pr={2} width={'100%'}>
      <Grid gap={'6vw'} className="custom-scrollbar" templateColumns={['1fr', 'repeat(2, 1fr)']} p={'6vw'} pr={'4vw'} height={'80vh'} overflowY={'scroll'}>
        {/* <button onClick={test}>Test</button> */}
        {props.callQueue.map((call, index) => (
          <CallBlock
            key={index}
            slotNo={call.parking_slot_number} // Change to slotNo
            uniqueId={call.id} // Add unique ID if available
            startTimeStamp={call.startTimeStamp}
            onDone={() => handleDone(call)}
          />
        ))}
      </Grid>      
    </Box>

  );
};

export default CallQueue;


