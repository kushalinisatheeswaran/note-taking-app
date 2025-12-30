import React, { useContext } from "react";
import { BrowserRouter,Routes,Route , Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from "./components/Profile";

import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; 
import './App.css';
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";

const App=() => {
  const {user, loading }=useContext(AuthContext);
  if(loading){
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path ="/" element ={user ? <Navigate to="/dashboard"/> :<Navigate to="/login"/>} />
        <Route path ="/login" element ={user ? <Navigate to="/dashboard"/> : <Login/>} />
        
        <Route path ="/register" element ={<Register/>} />
        <Route path ="/dashboard" element ={
          <ProtectedRoute><Dashboard/></ProtectedRoute>} />

        <Route path ="/profile" element ={<ProtectedRoute><Profile/></ProtectedRoute>} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;


