# 🚀 Mini Task Management System (MERN Stack)

A scalable REST API with authentication, role-based access control (RBAC), and a simple React frontend for testing APIs.

---

## 📌 Live Links

- 🌐 Frontend: https://your-vercel-link.vercel.app  
- ⚙️ Backend: https://your-render-link.onrender.com  

---

## 🧰 Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)

### Frontend:
- React.js (Vite)
- Axios
- React Router DOM

---

## 🔐 Features

### 👤 Authentication
- User Registration
- User Login
- Password hashing (bcrypt)
- JWT token authentication

---

### 🛡️ Role-Based Access Control (RBAC)
- Two roles: `user` and `admin`
- Admin-only routes protected using middleware
- Normal users cannot access admin panel

---

### 📊 User Features
- View Dashboard
- Manage Tasks (CRUD operations)

---

### 🧑‍💼 Admin Features
- View all users
- Delete users
- Admin dashboard access only

---

## 📂 Project Structure

### Backend

server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── index.js


### Frontend
```

client/
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx


🔐 API Endpoints

Auth Routes

POST /api/v1/auth/register
POST /api/v1/auth/login


User Routes

GET /api/v1/tasks
POST /api/v1/tasks
PUT /api/v1/tasks/:id
DELETE /api/v1/tasks/:id

Admin Routes

GET /api/v1/admin/users
DELETE /api/v1/admin/users/:id

⚙️ Setup Instructions

Backend
cd server
npm install
npm start
Frontend
cd client
npm install
npm run dev

🔐 Environment Variables

Backend .env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
