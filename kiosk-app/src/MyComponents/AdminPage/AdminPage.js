// AdminPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css'
import UserData from './UserData'; // Adjust the import path based on your project structure

const AdminPage = () => {
  // Dummy data for demonstration
  const dummyUsers = [
    { id: 1, flatNo: '101', slotNo: 'A1', phoneNo: '1234567890', carNo: 'ABC123' },
    { id: 2, flatNo: '102', slotNo: 'B1', phoneNo: '9876543210', carNo: 'XYZ789' },
    { id: 3, flatNo: '103', slotNo: 'C1', phoneNo: '2345678901', carNo: 'PQR456' },
    { id: 4, flatNo: '104', slotNo: 'D1', phoneNo: '8765432109', carNo: 'LMN987' },
    { id: 5, flatNo: '105', slotNo: 'E1', phoneNo: '3456789012', carNo: 'DEF234' },
    { id: 6, flatNo: '106', slotNo: 'F1', phoneNo: '2109876543', carNo: 'GHI567' },
    { id: 7, flatNo: '107', slotNo: 'G1', phoneNo: '5432109876', carNo: 'JKL890' },
    { id: 8, flatNo: '108', slotNo: 'H1', phoneNo: '7890123456', carNo: 'MNO123' },
    { id: 9, flatNo: '109', slotNo: 'I1', phoneNo: '4321098765', carNo: 'UVW456' },
    { id: 10, flatNo: '110', slotNo: 'J1', phoneNo: '9876543212', carNo: 'XYZ789' },
    { id: 11, flatNo: '111', slotNo: 'K1', phoneNo: '1234567899', carNo: 'ABC321' },
    { id: 12, flatNo: '112', slotNo: 'L1', phoneNo: '8765432101', carNo: 'PQR987' },
    { id: 13, flatNo: '113', slotNo: 'M1', phoneNo: '2345678909', carNo: 'LMN654' },
    { id: 14, flatNo: '114', slotNo: 'N1', phoneNo: '7890123450', carNo: 'DEF876' },
    { id: 15, flatNo: '115', slotNo: 'O1', phoneNo: '5432109871', carNo: 'GHI234' },
    { id: 16, flatNo: '116', slotNo: 'P1', phoneNo: '2109876542', carNo: 'JKL567' },
    { id: 17, flatNo: '117', slotNo: 'Q1', phoneNo: '3456789015', carNo: 'MNO890' },
    { id: 18, flatNo: '118', slotNo: 'R1', phoneNo: '4321098768', carNo: 'UVW123' },
    { id: 19, flatNo: '119', slotNo: 'S1', phoneNo: '9876543214', carNo: 'XYZ456' },
    { id: 20, flatNo: '120', slotNo: 'T1', phoneNo: '1234567898', carNo: 'ABC987' },
    { id: 21, flatNo: '121', slotNo: 'U1', phoneNo: '8765432105', carNo: 'PQR321' },
    { id: 22, flatNo: '122', slotNo: 'V1', phoneNo: '2345678905', carNo: 'LMN678' },
    // Add more dummy data as needed
  ];

  const handleEdit = (user) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (userId) => {
    console.log('Delete user with ID:', userId);
  };

  return (
    <div>
      <div className="mini-header">
        <div className="UL-heading">Users List</div>
        <Link to='/admin/AddUser' className="add-user-button">Add User</Link>
      </div>
      <div className="users-grid">
        <div className='titles'>
          <p className='table-headings'>Flat No.</p>
          <p className='table-headings'>Slot No.</p>
          <p className='table-headings' id='Phone'>Phone No.</p>
          <p className='table-headings'>Car No.</p>
          <p className='table-headings'>Actions</p>
        </div>
        {/* Render UserData component for each user */}
        <div className="user-data">
          {dummyUsers.map((user) => (
          <UserData key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
