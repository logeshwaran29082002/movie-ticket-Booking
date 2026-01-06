const express = require("express");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const connectDB = require("./config/db");

require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();

//Middleware
app.use(cors()); // Enable cors for all route
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Health check route
app.get("/auth", (req, res) => {
  res.send("API is running...");
});

// Auth routes
app.use("/auth", authRoutes);

module.exports = app;
