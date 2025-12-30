import { createContext, useState, useEffect } from "react";
import axios from "axios";


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 const fetchUser = async () => {
     
    try{
        const response = await axios.get("http://localhost:5000/api/auth/me",
        { withCredentials:true,});
      
    setUser(response.data.user);
}
    catch(error){
        setUser(null);
        console.log("Fetch user error:",error);
    }finally{
        setLoading(false);  
    }
    };

 const login =async(userData)=>{
    try{
       const response = await axios.post("http://localhost:5000/api/auth/login",
        userData,
        {  withCredentials:true,});
       
       
     await fetchUser(); // ✅ load user after login
      return { success: true };
}
    catch(err){
        return {
      success: false,
      message: err.response?.data?.message || "Login failed"
    };
    }
    };


    const Logout = async()=>{
        try{
           await axios.post("http://localhost:5000/api/auth/logout",
            {},
            { withCredentials:true,});
            setUser(null);
        } catch(error){
            setUser(null);
            console.log("Logout error:",error);
        }

    };



    useEffect(() => {
        fetchUser();}, []);

    return (<AuthContext.Provider value={{ user, loading, login, Logout }}>
        { children }
        </AuthContext.Provider>

    );
};

