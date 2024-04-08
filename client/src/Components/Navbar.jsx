import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { Context } from "../main";
import {message} from 'antd';
import { PiStudentDuotone } from "react-icons/pi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    try{
    const res =await axios
      .get("http://localhost:8080/api/v1/user/userapil/logout", {
        withCredentials: true,
      })
      if(res.status===200){
        message.success('Logout Successfully');
        setIsAuthenticated(false);
      }
    }catch(err){
      console.log(err);

        message.error('Logout Failed');
    }
      
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
        <PiStudentDuotone />
          <p className="logo-img">StudentHub</p>
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/application"} onClick={() => setShow(!show)}>
              Application
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
            <Link to={"/dashboard"} onClick={() => setShow(!show)}>
              Dashboard
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
    
        </div>
      </nav>
    </>
  );
};

export default Navbar;