import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-seccontiner">
        <div className="dashboard-buttongroup">
        <button className="primary" onClick={() => navigate("/connect")}>
          Connect with People
        </button>
        <button className="primary" onClick={() => navigate("/clubs")}>
          Join Clubs
        </button>
        <button className="primary" onClick={() => navigate("/social")}>
          Post your Idea's
        </button>
       
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
