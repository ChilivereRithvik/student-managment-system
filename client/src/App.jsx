import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Applycation from "./pages/Applycation";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import { useContext } from "react";
import { Context } from "./main";
import {useEffect} from 'react';
import axios from 'axios';
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  useEffect(() => {
    const fetctUser= async()=>{
    try{
      const res= await axios.get("http://localhost:8080/api/v1/user/userapil/me",{
        withCredentials:true
      })
      if(res.status===200){
        setIsAuthenticated(true);
        setUser(res.data);
      }
    }catch(err){
      console.log(err);
      setIsAuthenticated(false);
      setUser({});
    };
  };
    fetctUser();
}, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/application" element={<Applycation />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
      
    </>
  );
}

export default App;
