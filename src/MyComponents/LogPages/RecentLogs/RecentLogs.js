import React from 'react';
import { Link } from 'react-router-dom';
import './RecentLogs.css'
import RecentLog_block from './RecentLog_block'; // Adjust the import path based on your project structure

const RecentLogs = (props) => {

  props.setlogButton(false)
  props.setadminButton(true)

  // Dummy data for testing
  const dummyLogs = [
    {
      name: "John Doe",
      parking_slot_number: "A12",
      car_number: "ABC123",
      time: "10:30 AM"
    },
    {
      name: "Jane Smith",
      parking_slot_number: "B34",
      car_number: "XYZ789",
      time: "11:45 AM"
    },
    {
      name: "Alice Johnson",
      parking_slot_number: "C56",
      car_number: "DEF456",
      time: "1:15 PM"
    },
    // Add more dummy entries
    {
      name: "Bob Brown",
      parking_slot_number: "D78",
      car_number: "GHI789",
      time: "2:45 PM"
    },
    {
      name: "Emily Davis",
      parking_slot_number: "E90",
      car_number: "JKL012",
      time: "4:00 PM"
    },
    {
      name: "Michael Wilson",
      parking_slot_number: "F23",
      car_number: "MNO345",
      time: "5:30 PM"
    },
    // Add 20 more dummy entries
    {
      name: "David Lee",
      parking_slot_number: "G45",
      car_number: "PQR678",
      time: "7:00 PM"
    },
    {
      name: "Sarah Miller",
      parking_slot_number: "H67",
      car_number: "STU901",
      time: "8:15 PM"
    },
    {
      name: "Alex Thompson",
      parking_slot_number: "I89",
      car_number: "VWX234",
      time: "9:30 PM"
    },
    {
      name: "Sophia White",
      parking_slot_number: "J10",
      car_number: "YZA567",
      time: "10:45 PM"
    },
    {
      name: "James Brown",
      parking_slot_number: "K11",
      car_number: "BCD890",
      time: "12:00 AM"
    },
    {
      name: "Olivia Johnson",
      parking_slot_number: "L12",
      car_number: "EFG123",
      time: "1:30 AM"
    },
    {
      name: "William Smith",
      parking_slot_number: "M13",
      car_number: "HIJ456",
      time: "3:00 AM"
    },
    {
      name: "Emma Davis",
      parking_slot_number: "N14",
      car_number: "KLM789",
      time: "4:30 AM"
    },
    {
      name: "Ethan Wilson",
      parking_slot_number: "O15",
      car_number: "NOP012",
      time: "6:00 AM"
    },
    {
      name: "Ava Martinez",
      parking_slot_number: "P16",
      car_number: "QRS345",
      time: "7:30 AM"
    },
    {
      name: "Liam Taylor",
      parking_slot_number: "Q17",
      car_number: "TUV678",
      time: "9:00 AM"
    },
    {
      name: "Isabella Thomas",
      parking_slot_number: "R18",
      car_number: "WXY901",
      time: "10:30 AM"
    },
    {
      name: "Noah Hernandez",
      parking_slot_number: "S19",
      car_number: "ZAB234",
      time: "12:00 PM"
    },
    {
      name: "Mia Moore",
      parking_slot_number: "T20",
      car_number: "BCD567",
      time: "1:30 PM"
    },
    // Add more dummy entries as needed
  ];

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
            {dummyLogs.map((log, index) => (
            <RecentLog_block key={index} log={log} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentLogs;


