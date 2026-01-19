const express = require("express");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const connectDB = require("./config/db");
const movieRouter = require("./routes/movieRoutes");
const path = require("path");
const bookingRouter = require("./routes/bookingRouter");
require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();

//Middleware
app.use(cors()); // Enable cors for all route
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Health check route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Auth routes
app.use('/uploads', express.static(path.join(process.cwd(), '../uploads')));
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRouter);
app.use('/api/bookings',bookingRouter)
module.exports = app;
