📝 Note Taking App (Full Stack)

A full-stack Note Taking Application built with React, Node.js, Express, and MySQL.
Users can register, log in, create notes, edit/delete notes, and upload a profile image securely using JWT authentication.

🚀 Features

🔐 User Authentication (Register / Login / Logout)

🍪 JWT-based authentication with cookies

📝 Create, Read, Update, Delete (CRUD) notes

👤 User-specific notes (each user sees only their notes)

🖼️ Profile image upload

🔒 Protected routes (frontend & backend)

📦 RESTful API

📱 Responsive UI

🛠️ Tech Stack
Frontend

React (Vite)

Axios

React Router

Context API

CSS

Backend

Node.js

Express.js

MySQL

JWT (JSON Web Tokens)

Multer (file uploads)

Cookie-parser

dotenv

📁 Project Structure
note-taking-app/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── db.js
│   └── index.js
│
├── package.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/kushalinisatheeswaran/note-taking-app.git
cd note-taking-app

2️⃣ Backend Setup
cd server
npm install


Create a .env file inside server/:

PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=note_app


Start backend:

npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend runs on:

http://localhost:5000

🔐 API Routes (Backend)
Auth

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

POST /api/auth/upload-profile-image

Notes

POST /api/notes

GET /api/notes

PUT /api/notes/:id

DELETE /api/notes/:id

(All protected using JWT)


🎯 Future Improvements

Search notes

Note categories

Rich text editor

Deployment (Vercel + Render)

Dark mode
