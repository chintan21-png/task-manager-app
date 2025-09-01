require("dotenv").config();
const express = require('express')
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const app = express()
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

console.log("taskRoutes router:", taskRoutes);

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type", 'Authorization'],
    })
);

connectDB();

app.use(express.json());

console.log('reportRoutes:', reportRoutes);
console.log('typeof reportRoutes:', typeof reportRoutes);

console.log('authRoutes:', typeof authRoutes);
console.log('userRoutes:', typeof userRoutes);
console.log('taskRoutes:', typeof taskRoutes);
//Routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports",reportRoutes);

//Server upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))