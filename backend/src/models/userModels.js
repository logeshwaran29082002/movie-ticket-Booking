const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    userName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    birthdate: {
      type: Date,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 hide password by default
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite error
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
