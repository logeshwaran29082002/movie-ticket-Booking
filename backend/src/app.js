const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const movieRouter = require("./routes/movieRoutes");
const bookingRouter = require("./routes/bookingRouter");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FIXED uploads path
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRouter);
app.use("/api/bookings", bookingRouter);

module.exports = app;
