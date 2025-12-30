import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from "axios";

const Register = () => {

const [username,setUsername]= useState("");
const[email,setEmail]=useState("");
const[contact,setContact]=useState("");
const[password,setPassword]=useState("");
const[profileImage,setProfileImage]=useState(null);
const[error,setError]=useState("");
const navigate = useNavigate();

const handleSubmit =async(e)=>{
  e.preventDefault();
  const formData =new FormData();
  formData.append("username",username);
  formData.append("email",email);
  formData.append("contact",contact);
  formData.append("password",password);
  
  if(profileImage){
  formData.append("profileImage",profileImage);
  }
  try{
   await axios.post("http://localhost:5000/api/auth/register",formData,{
    headers:{
      "Content-Type":"multipart/form-data"
    },withCredentials:true,
  });
    navigate("/login");

  }catch(error){
  setError(error.response?.data?.message || "Registration failed");
  };
};
  return (
    <div className='form-container'>
      <div className='form-card'>
        <h4 className='form-title'>Register</h4>
       {error &&  <p className='error'>{error}</p> }
        <div className='form-group'>
          <input type='text' placeholder='user name'  value={username} onChange={(e)=>setUsername(e.target.value)} className='form-input'/>
          <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='form-input'/>
          <input type='contact' placeholder='Contact (optional)' value={contact} onChange={(e)=>setContact(e.target.value)} className='form-input'/>
          <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='form-input'/>
          <input type='file' accept='image/*' onChange={(e)=>setProfileImage(e.target.files[0])} className='form-input'/>
          <button type="submit" className='form-button' onClick={handleSubmit}>Register</button>

          <p> Already have an account? <Link to={"/login"}>Sign in</Link></p>
        </div>
      </div>
    </div>
  )
};


export default Register