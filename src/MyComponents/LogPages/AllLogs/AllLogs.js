import React, { useState, useEffect } from "react";
import { Box, Stack, Text, Grid, GridItem } from "@chakra-ui/react";
import Log_row from "./Log_row";
import NavBar from "./NavBar";
import LevelFilter from "./LevelFilter";
import "./AllLogs.css"; // Ensure this import is present
import axios from "axios";

const AllLogs = (props) => {
  const [callonce, setCall] = useState(1);
  const [AllLogData, setAllLogData] = useState([]);
  const [filteredLogData, setFilteredLogData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [levels, setLevels] = useState([]);

  // Dummy data for testing
  const dummyData = [
    { name: "John Doe", slotNo: "101A", carNo: "MH01FL1771", date: "2024-06-01", time: "08:00", level: "1" },
    { name: "Jane Smith", slotNo: "202B", carNo: "MH02GL1772", date: "2024-06-01", time: "09:00", level: "2" },
    { name: "Alice Brown", slotNo: "303C", carNo: "MH03HL1773", date: "2024-06-02", time: "10:00", level: "3" },
    { name: "Bob White", slotNo: "404D", carNo: "MH04JL1774", date: "2024-06-03", time: "11:00", level: "1" },
    { name: "Charlie Black", slotNo: "505E", carNo: "MH05KL1775", date: "2024-06-04", time: "12:00", level: "2" },
    { name: "Diana Green", slotNo: "606F", carNo: "MH06ML1776", date: "2024-06-05", time: "13:00", level: "3" },
    { name: "Evan Red", slotNo: "707G", carNo: "MH07NL1777", date: "2024-06-06", time: "14:00", level: "1" },
    { name: "Fiona Blue", slotNo: "808H", carNo: "MH08PL1778", date: "2024-06-07", time: "15:00", level: "2" },
    { name: "George Yellow", slotNo: "909I", carNo: "MH09QL1779", date: "2024-06-08", time: "16:00", level: "3" },
    { name: "Hannah Purple", slotNo: "101J", carNo: "MH10RL1780", date: "2024-06-09", time: "17:00", level: "1" },
    { name: "Ivy Orange", slotNo: "202K", carNo: "MH11SL1781", date: "2024-06-10", time: "18:00", level: "2" },
    { name: "Jack Cyan", slotNo: "303L", carNo: "MH12TL1782", date: "2024-06-11", time: "19:00", level: "3" },
    { name: "Kate Magenta", slotNo: "404M", carNo: "MH13UL1783", date: "2024-06-12", time: "20:00", level: "1" },
    { name: "Leo Lime", slotNo: "505N", carNo: "MH14VL1784", date: "2024-06-13", time: "21:00", level: "2" },
    { name: "Mia Violet", slotNo: "606O", carNo: "MH15WL1785", date: "2024-06-14", time: "22:00", level: "3" },
    { name: "Nina Pink", slotNo: "707P", carNo: "MH16XL1786", date: "2024-06-15", time: "23:00", level: "1" },
    { name: "Oscar Beige", slotNo: "808Q", carNo: "MH17YL1787", date: "2024-06-16", time: "00:00", level: "2" },
    { name: "Paul Teal", slotNo: "909R", carNo: "MH18ZL1788", date: "2024-06-17", time: "01:00", level: "3" },
    { name: "Quinn Gray", slotNo: "101S", carNo: "MH19AL1789", date: "2024-06-18", time: "02:00", level: "1" },
    { name: "Rachel Gold", slotNo: "202T", carNo: "MH20BL1790", date: "2024-06-19", time: "03:00", level: "2" }
  ];

  const DisplayAllLogData = () => {
    console.log("log data request");
    // Simulating an API call with dummy data
    setTimeout(() => {
      setAllLogData([...dummyData]);
      setFilteredLogData([...dummyData]);
      console.log(dummyData);

      // Extract levels from the dummy data
      const levels = ["all", ...new Set(dummyData.map((log) => log.level))];
      setLevels(levels);
    }, 1000);
  };

  if (callonce === 1) {
    DisplayAllLogData();
    setCall(2);
  }

  useEffect(() => {
    if (selectedLevel === "all") {
      setFilteredLogData(AllLogData);
    } else {
      setFilteredLogData(AllLogData.filter((log) => log.level === selectedLevel));
    }
  }, [selectedLevel, AllLogData]);

  const onSelectMonth = (year, month) => {
    console.log("onselect in all log", year, month);
    // Simulating filtered data for the selected month
    const filteredData = dummyData.filter(
      (log) => new Date(log.date).getFullYear() === year && new Date(log.date).getMonth() + 1 === month
    );
    setAllLogData(filteredData);
  };

  const onSelectDate = (date) => {
    if (date) {
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const formattedDate = adjustedDate.toISOString().split("T")[0];
      console.log("Formatted date:", formattedDate);

      // Simulating filtered data for the selected date
      const filteredData = dummyData.filter((log) => log.date === formattedDate);
      setAllLogData(filteredData);
    }
  };

  const onSelectName = (name) => {
    console.log("name selected is ", name);
    // Simulating filtered data for the selected name
    const filteredData = dummyData.filter((log) => log.name === name);
    setAllLogData(filteredData);
  };

  const allSelect = () => {
    DisplayAllLogData();
  };

  return (
    <Box width="100%" pt={2} pr={3} pl={6} height={'80vh'}>
      <Stack direction="row" pr={2} spacing={20} align="center" mb={3} mt={2} justifyContent="space-between">
        <Text color={'#1F3453'} fontWeight={'bold'} fontSize={'xxx-large'} align={'center'} alignItems={'center'}>Logs</Text>
        {levels.length > 1 && (
          <LevelFilter levels={levels} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />
        )}
      </Stack>

      <NavBar
        onSelectMonth={onSelectMonth}
        onSelectDate={onSelectDate}
        onSelectName={onSelectName}
        allSelect={allSelect}
      />
      <Grid
        templateColumns='1.2fr 0.7fr 1fr 0.8fr 0.6fr'
        gap={2}
        mt={4}
        fontSize={['large', 'xx-large', 'x-large', 'xx-large', 'xx-large']}
        borderBottom="2px solid gray"
        pr={4}
      >
        <GridItem color={"gray"} bg={'none'} pl={2}>Name</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2}>Slot</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2}>Car no.</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2}>Date</GridItem>
        <GridItem color={"gray"} bg={'none'} pl={2}>Time</GridItem>
      </Grid>
      <Box pr={2} maxHeight={['53vh', '62vh', '65vh', '69vh']} overflowY="auto" className="custom-scrollbar">
        {filteredLogData.map((log, index) => (
          <Log_row key={index} log={log} />
        ))}
      </Box>
    </Box>
  );
};

export default AllLogs;
