
 const bcrypt = require("bcryptjs");
 const db = require("../db"); 
const jwt =require("jsonwebtoken");


 const register = async (req, res) => {
 try {
    const { username, password, email, contact } = req.body;
    const profile_image = req.file? `/uploads/${req.file.filename}`:null;
    if(!username || !email || !password){
      return res.status(400).send("username ,mail and passsword are required ");
    }
   // console.log(username, password, email, contact);
    
   const [existinguser]= await db.query("SELECT *from users where username =? or email =?",[username,email]);
    console.log(existinguser);
    if(existinguser.length>0){
      return res.status(409).send("username or email already exists");
    }

    //hashed password
    const hashedpassword = await bcrypt.hash(password, 10);

    //store data to db
    const [result] = await db.query("INSERT INTO users (username, email, contact, password, profile_image) VALUES (?, ?, ?, ?, ?)",[username,email,contact||null,hashedpassword,profile_image]);
    res.status(200).json({message: "User registered successfully", userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login= async (req, res) => {
  try {
    const { username, password } = req.body;
    const [users] = await db.query("SELECT * FROM users WHERE username = ? OR  email=?", [username,username]);
    console.log(users);

    //check user is available
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const user =users[0];
    //verify password
    const isMatch =await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:"invalid password"})
    }
    
    //generate token
    const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
    

    res.cookie("token",token,{
      httpOnly: true,
      sameSite: "lax",     
      secure: false, 
      expires:new Date(Date.now()+process.env.COOKIE_EXPIRES *24*60*60*1000),

    });
    res.send ({message:"login successful"});
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getCurrentUser =async(req,res)=>{
  try {
    const user_id =req.user.id;
    const [users]=await db.query("SELECT id,username,email,contact,profile_image from users WHERE id=?",[user_id]);
    if(users.length===0){
      return res.status(404).json({message:"user not found"});
    }
    res.json({user:users[0]});
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const uploadProfileImage= async(req,res)=>{
   try {
    const user_id =req.user.id;
    const profile_image = req.file? `/uploads/${req.file.filename}`:null;

    const [result]=await db.query("UPDATE USERS SET profile_image=? WHERE id=?",[profile_image,user_id]);
    if(result.affectedRows === 0){
      return res.status(404).json({message:"User not found"});
    }
    res.json({message:"profile image uploaded ",profile_image});
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const logout = (req, res) => {
  try{
    res.clearCookie("token");
    res.json({message:"logout successful"});
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { register ,login,getCurrentUser,uploadProfileImage, logout };
