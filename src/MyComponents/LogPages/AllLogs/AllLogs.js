import React, { useState, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import Log_row from "./Log_row";
import NavBar from "./NavBar";
import "./AllLogs.css";
import MonthComponent from "./MonthComponent";
import NameSearch from "./NameSearch";
import axios from "axios";

const AllLogs = (props) => {
  const [callonce, setCall] = useState(1);
  const [AllLogData, setAllLogData] = useState([]);


  const DisplayAllLogData = () => {
    console.log("log data  request")
    axios.get('http://localhost:8000/get_all_log')
      .then(response => {
        setAllLogData([...response.data.data]);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  if (callonce === 1) {
    DisplayAllLogData();
    setCall(2);
  }


  const onSelectMonth = (year, month) => {
    console.log('onselect in all log', year, month)
    axios.post('http://127.0.0.1:8000/get_particular_logs', { type: 1, month: month, year: year })
      .then(response => {
        console.log('Data updated successfully:', response.data);
        setAllLogData([...response.data.logs]);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });

  }
  const onSelectDate = (date) => {
    // Adjust the date to account for the time zone difference
    console.log(date)
    if (date) {
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

      // Format the adjusted date in YYYY-MM-DD format
      const formattedDate = adjustedDate.toISOString().split('T')[0];

      console.log('Formatted date:', formattedDate);

      axios.post('http://127.0.0.1:8000/get_particular_logs', { type: 2, date: formattedDate })
        .then(response => {
          console.log('Data updated successfully:', response.data);
          setAllLogData([...response.data.logs]);
        })
        .catch(error => {
          console.error('Error updating data:', error);
        });
    }

  }

  const onSelectName = (name) => {
    console.log('name selected is ', name)
    axios.post('http://127.0.0.1:8000/get_particular_logs', { type: 3, name: name, })
      .then(response => {
        console.log('Data updated successfully:', response.data);
        setAllLogData([...response.data.logs]);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  }
  const allSelect = () => {
    DisplayAllLogData()
  }
  return (
    <>
      <Box width="100%" p={8}>
        <Stack direction="row" spacing={20} align="center" mb={5} mt={2}>
          <div className="UL-heading">Logs</div>
          <NavBar onSelectMonth={onSelectMonth} onSelectDate={onSelectDate} onSelectName={onSelectName} allSelect={allSelect} />
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
          {AllLogData.map((log, index) => (
            <Log_row key={index} log={log} />
          ))}
        </div>
      </Box>
    </>
  );
};

export default AllLogs;

