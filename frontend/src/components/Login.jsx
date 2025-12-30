import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const Login = () => {
const navigate = useNavigate();

  const[username,setUsername]= React.useState("");
  const[password,setPassword]=React.useState("");
  const[error,setError]=React.useState("");

  const{user,loading,login}=React.useContext(AuthContext);

  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const result = await login({username,password});
    try{
      if(result.success){
        navigate("/dashboard");
    }
    else{
      setError("Invalid username or password");
  }
    }
    catch(error){
      setError(error.response?.data?.message || "Login failed");
    } 
    console.log(username, password);

  };

  if(loading){
    return <div>Loading...</div>;
  }

  return (
     <div className='form-container'>
      <div className='form-card'>
        <h4 className='form-title'>Login</h4>
        {error && <p className='error'>{error}</p>}
        <div className='form-group'>
          <input type='text' placeholder='User name or Email' className='form-input' value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <input type='password' placeholder='password' className='form-input' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className='form-button' onClick={handleSubmit}>Login</button>
          <p> Don't have an account? <Link to={"/register"}>Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login