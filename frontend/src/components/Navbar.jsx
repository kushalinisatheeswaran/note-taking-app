import React ,{ useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const {user, Logout} =useContext(AuthContext);
  return (
    <nav>
        <div className='navbar-container'>
        <div className="logo">
            <Link to="/">Notes App </Link>
        </div>
        <div className="nav-links">
          {user ? (
            <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={()=>Logout()}>Logout</button>
            </>
          )  : (  <><Link to="/login">Login</Link>
            <Link to="/register">Register</Link></>)}

        </div>
        </div>
    </nav>
  )
}

export default Navbar;