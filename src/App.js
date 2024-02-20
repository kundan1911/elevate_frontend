import './App.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import CallQueue from './MyComponents/QueuePage/callQueue';
import AdminPage from './MyComponents/AdminPage/AdminPage';
import AddUser from './MyComponents/AddUser/AddUser';
import CardContainer from './MyComponents/cardContainer';
import EditUser from './MyComponents/AddUser/EditUser';
import {BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
  import { useState  } from 'react';

function App() {

  const [backButton,setbackButton]=useState(true);
  return (
    <>
    <Router>
      <Header backButton={backButton}/>
      <Routes>
        <Route exact path="/" element={<CallQueue setbackButton={setbackButton}/>}/>
        {/* <Route exact path="/" element={<CardContainer setbackButton={setbackButton}/>}/> */}
        <Route exact path="/admin" element={<AdminPage  setbackButton={setbackButton}/>}/>
        {/* <Route exact path="/admin" element={<CRUDPage  setbackButton={setbackButton}/>}/> */}
        <Route exact path="/admin/AddUser" element={<AddUser  setbackButton={setbackButton}/>}/>
        <Route exact path="/admin/EditUser" element={<EditUser  setbackButton={setbackButton}/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>  
  );
}

export default App;
