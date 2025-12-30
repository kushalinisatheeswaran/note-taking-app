const express = require('express');
require('dotenv').config();
const cookieParser =require ("cookie-parser");
const authRoutes = require('./routes/authRouters');
const notesRouter=require("./routes/notesRouter");
const path = require('path');
const app = express();
const cors = require('cors');


// ✅ REQUIRED to read JSON body
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
}));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/notes",notesRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
