import './App.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import CallQueue from './MyComponents/QueuePage/callQueue';
import AdminPage from './MyComponents/AdminPage/AdminPage';
import AddUser from './MyComponents/AddUser/AddUser';
import EditUser from './MyComponents/AddUser/EditUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure proper import
import { useState } from 'react';
import RecentLogs from './MyComponents/LogPages/RecentLogs/RecentLogs';
import AllLogs from './MyComponents/LogPages/AllLogs/AllLogs'


function App() {
  const [backButton, setbackButton] = useState(true);
  const [adminButton, setadminButton] = useState(true);
  const [logButton, setlogButton] = useState(false);
  const [homeButton, sethomeButton] = useState(true);
 
  return (
    <>
      <Router>
        <Header backButton={backButton} homeButton={homeButton} />
        <Routes>
          <Route exact path="/" element={<CallQueue setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton}/>} />
          <Route exact path="/admin" element={<AdminPage setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton}/>} />
          <Route exact path="/admin/AddUser" element={<AddUser setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton}/>} />
          <Route exact path="/admin/EditUser" element={<EditUser setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton}/>} />
          <Route exact path="/admin/Logs" element={<RecentLogs setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton}/>} />
          <Route exact path="/admin/Logs/allLogs" element={<AllLogs setbackButton={setbackButton} setadminButton={setadminButton} setlogButton={setlogButton} sethomeButton={sethomeButton}/>} />
        </Routes>
        <Footer adminButton={adminButton} logButton={logButton}/>
      </Router>
    </>
  );
}

export default App;
