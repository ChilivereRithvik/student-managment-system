import React from "react";
import './adminStyle.css';
import Numberanimation from './Numberanimation';
import { Table } from 'antd';

function Admindashboard() {
 
  const columns = [
    {
      title:"Roll Number",
      dataIndex:"rollNumber"
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
  },
    {
        title: 'Email',
        dataIndex: 'email'
    },
{
  title:"Role",
  dataIndex:"role"
},
{
  title:"Department",
  dataIndex:"department"
},
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        render: (text, record) => (
            <div className='d-flex'>
                {record.status === 'pending' ? <button className='btn btn-success' onClick={() => handleAccountStatus(record, 'approved')}>Approve</button>
                    : <button className='btn btn-danger' style={{ background: 'red', color: 'aliceblue' }}>Reject</button>}
            </div>
        )
    }
];

  return (
    <div className="admindash">
      <div className="admind">
        <p>Wellcome Admin</p>
        <hr />
      </div>
      <div className="admindashcontent">
        <div className="firstcontainer">
          <div className="admindashcontent1 firstcon">
            <p>Total no of application</p>
            <Numberanimation number={56} duration={10} />
         
          </div>
          <div className="admindashcontent2 firstcon">
            <p>Total no of students</p>
            <Numberanimation number={40} duration={10} />
          </div>
          <div className="admindashcontent3 firstcon">
            <p>Total no of courses</p>
            <Numberanimation number={60} duration={10} />
          </div>
          <div className="admindashcontent4 firstcon">
            <p>Total no of users</p>
            <Numberanimation number={99} duration={10} />
          </div>
          <div className="admindashcontent5 firstcon">
            <p>Total no of Orgnizations</p>
            <Numberanimation number={50} duration={10} />
            </div>
        </div>
<div className="middlecon container btngroup">
<button>Add Course</button>
<button>Add Admin</button>
  <button>Add Orgnization</button>
  <button>Add Student</button>
  <button>Delete User</button>
</div>
        <div className="secondcontainer">
          <h2>Active Applicationss</h2>
          <Table columns={columns} />
          </div>
      </div>
    </div>
  );
}

export default Admindashboard;
