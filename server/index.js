require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mini-task-virid.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");


app.use("/api/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

