const mysql =require ('mysql2/promise');
//require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ,
    database :process.env.DB_DATABASE,
});

db.getConnection().then((connection)=>{
    console.log("database connected successfully");
    connection.release();
})

.catch((err)=>{
    console.error("database connection failed:", err);
});

module.exports = db;