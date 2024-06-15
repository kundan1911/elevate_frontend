import './App.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import CallQueue from './MyComponents/QueuePage/callQueue';
import AdminPage from './MyComponents/AdminPage/AdminPage';
import AddUser from './MyComponents/AddUser/AddUser';
import EditUser from './MyComponents/AddUser/EditUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure proper import
import { useState, useEffect } from 'react';
import RecentLogs from './MyComponents/LogPages/RecentLogs/RecentLogs';
import AllLogs from './MyComponents/LogPages/AllLogs/AllLogs';
import LoadingPage from './MyComponents/LoadingPage';
import logo from './logo.svg';
import axios from 'axios';
import LevelChoose from './MyComponents/LevelChoose';
import AuthPage from './MyComponents/Login/AuthPage';
function App() {
  const [backButton, setbackButton] = useState(true);
  const [adminButton, setadminButton] = useState(true);
  const [logButton, setlogButton] = useState(false);
  const [homeButton, sethomeButton] = useState(true);
  const [callQueue, setCallQueue] = useState([]);
  const [backendStarted, setBackendStarted] = useState(false); // State to track backend availability

  // useEffect(() => {
  //   // Check backend availability here
  //   const interval = setInterval(() => {
  //     axios.post("http://127.0.0.1:8000/check_server")
  //     .then((response) => {
  //       if (response.data.success) {
  //         setBackendStarted(true);
  //         clearInterval(interval);
  //       }
  //     })
  //       .catch(error => console.error('Error checking backend availability:', error));
  //   }, 2000); // Adjust the interval as needed

  //   return () => clearInterval(interval);
  // }, []);

  // if (!backendStarted) {
  //   return <LoadingPage />; // Render loading page if backend is not available
  // }

  return (
    <>
      <Router>
        <Header backButton={backButton} homeButton={homeButton} setCallQueue={setCallQueue} />
        <Routes>
          <Route exact path="/login" element={<AuthPage setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton} setCallQueue={setCallQueue} callQueue={callQueue} />} />
          <Route exact path="/" element={<CallQueue setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton} setCallQueue={setCallQueue} callQueue={callQueue} />} />
          <Route exact path="/admin" element={<AdminPage setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton} />} />
          <Route exact path="/admin/AddUser" element={<AddUser setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton} />} />
          <Route exact path="/admin/EditUser" element={<EditUser setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton} />} />
          <Route exact path="/admin/Logs" element={<RecentLogs setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton} />} />
          <Route exact path="/admin/Logs/allLogs" element={<AllLogs setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton} />} />
        </Routes>
        <Footer adminButton={adminButton} logButton={logButton} />
      </Router>
    </>
  );
}

export default App;
