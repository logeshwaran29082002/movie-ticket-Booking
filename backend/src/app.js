const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const movieRouter = require("./routes/movieRoutes");
const bookingRouter = require("./routes/bookingRouter");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors({
  origin: [
    "https://movie-ticket-booking-nqfa.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRouter);
app.use("/api/bookings", bookingRouter);

module.exports = app;
