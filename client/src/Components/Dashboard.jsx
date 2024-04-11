import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/user/userapil/me",
          {
            withCredentials: true,
            
          }
        );
        if (res.status === 200) {
          const userData = res.data.user; // Accessing nested user object
          console.log("User data:", userData); // Log response data for debugging
          if (userData && userData.firstName && userData.lastName && userData.email) {
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setEmail(userData.email);
            setrole(userData.role);
          } else {
            console.error("User data is incomplete:", userData);
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    
    
    fetchUser();
  }, []);
console.log(firstName,lastName,email);

  return (
    <div className="dashboard container">
      <h1>Dashboard</h1>
      <hr />
     <div className="dashsecond container">
      <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="profile" />
      <div>
      <p>
        Welcome,{role}<span>{firstName} {lastName}!</span>
      </p>
      <p>Email: 
        <span>{email}</span></p>
        <div className="btn">
        <button className="primary">Report Issue</button>
        <button className="orange">Reset Password</button>
        <button className="danger">Logout</button>
      </div>
      </div>
      
    </div>
    
    </div>
  );
}

export default Dashboard;
