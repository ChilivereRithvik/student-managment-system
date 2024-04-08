import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://studenthubserver.netlify.app/api/v1/user/userapil/me",
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
    <div className="dash">
      <div className="dashcon">
        <div className="con1">
          <div className="con1con1">
            <h7>
              Welcome <p>{firstName} {lastName}</p>
            </h7>
            <h7>Email:<p>{email}</p></h7>
            <button>Report Issues</button>
            <button>Change Password</button>
            <button>Logout</button>
          </div>
          <div className="con1con">
            <h7>Organization : <p>Vidya Jyothi Institute of Engineerion And Technology</p></h7>
            <h7>ID No : <p>21911A85207410</p></h7>
            <div className="accur">
              <h7>Your Overall Accuracy</h7>
              <input type="range"></input>
            </div>
            <div className="cource">
              <p>Course Activity</p>
              <h7>InProgress: <p>10/20</p></h7>
              <h7>YetToStart <p>5/20</p></h7>
            </div>
          </div>
        </div>
      </div>
      <div className="dashcon2"></div>
      <div className="dashcon3"></div>
    </div>
  );
}

export default Dashboard;
