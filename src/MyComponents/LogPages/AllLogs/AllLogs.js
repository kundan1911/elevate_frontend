import React, { useState, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import Log_row from "./Log_row";
import NavBar from "./NavBar";
import "./AllLogs.css";
import MonthComponent from "./MonthComponent";
import NameSearch from "./NameSearch";

const AllLogs = (props) => {
  const [postData, setPostData] = useState([]);

  const handleSubmit = () => {
    // Dummy data for testing
    const dummyallLogs = [
      {
        name: "Prabhjyot Singh",
        parking_slot_number: "A123",
        car_number: "ABC1223123",
        date: "2024-03-31",
        time: "10:00 AM",
      },
      {
        name: "Jane Smith",
        parking_slot_number: "B456",
        car_number: "XYZ789",
        date: "2024-04-15",
        time: "2:30 PM",
      },
      // Add more dummy data entries
      {
        name: "Emily Brown",
        parking_slot_number: "E345",
        car_number: "JKL012",
        date: "2024-03-25",
        time: "3:00 PM",
      },
      {
        name: "Michael Miller",
        parking_slot_number: "F678",
        car_number: "MNO345",
        date: "2024-04-10",
        time: "1:30 PM",
      },
      {
        name: "Olivia Wilson",
        parking_slot_number: "G901",
        car_number: "PQR678",
        date: "2024-03-20",
        time: "10:45 AM",
      },
      {
        name: "William Moore",
        parking_slot_number: "H234",
        car_number: "STU901",
        date: "2024-04-01",
        time: "4:15 PM",
      },
      {
        name: "Sophia Taylor",
        parking_slot_number: "I567",
        car_number: "VWX234",
        date: "2024-03-26",
        time: "12:00 PM",
      },
      {
        name: "James Anderson",
        parking_slot_number: "J890",
        car_number: "YZA567",
        date: "2024-04-12",
        time: "2:00 PM",
      },
      {
        name: "Emma Martinez",
        parking_slot_number: "K123",
        car_number: "BCD890",
        date: "2024-03-22",
        time: "3:30 PM",
      },
      {
        name: "Daniel Hernandez",
        parking_slot_number: "L456",
        car_number: "EFG123",
        date: "2024-03-29",
        time: "9:00 AM",
      },
      {
        name: "Ava Nelson",
        parking_slot_number: "M789",
        car_number: "HIJ456",
        date: "2024-04-08",
        time: "11:30 AM",
      },
      {
        name: "Alexander King",
        parking_slot_number: "N012",
        car_number: "KLM789",
        date: "2024-03-24",
        time: "2:45 PM",
      },
      {
        name: "Mia Cooper",
        parking_slot_number: "O345",
        car_number: "NOP012",
        date: "2024-04-03",
        time: "10:30 AM",
      },
      {
        name: "Ethan Ross",
        parking_slot_number: "P678",
        car_number: "QRS345",
        date: "2024-03-27",
        time: "1:15 PM",
      },
      {
        name: "Madison Hill",
        parking_slot_number: "Q901",
        car_number: "TUV678",
        date: "2024-04-06",
        time: "4:45 PM",
      },
      {
        name: "Alexander King",
        parking_slot_number: "R234",
        car_number: "WXY901",
        date: "2024-03-21",
        time: "11:00 AM",
      },
      {
        name: "Charlotte Hayes",
        parking_slot_number: "S567",
        car_number: "ZAB234",
        date: "2024-04-09",
        time: "3:15 PM",
      },
    ];
    setPostData(dummyallLogs);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <Box width="100%" p={8}>
        <Stack direction="row" spacing={20} align="center" mb={5} mt={2}>
          <div className="UL-heading">Logs</div>
          <NavBar />
        </Stack>
        {/* <MonthComponent/> */}
        <div className="log-titles">
          <div className="table-headings" id="big">
            Name
          </div>
          <div className="table-headings" id="smol">
            Slot No.
          </div>
          <div className="table-headings" id="med">
            Car No.
          </div>
          <div className="table-headings" id="smol">
            Date
          </div>
          <div className="table-headings" id="smol">
            Time
          </div>
        </div>
        <div className="log-data">
          {postData.map((log, index) => (
            <Log_row key={index} log={log} />
          ))}
        </div>
      </Box>
    </>
  );
};

export default AllLogs;

