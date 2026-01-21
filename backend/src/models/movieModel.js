const mongoose = require("mongoose");

/* ---------------- Person ---------------- */
const personSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "" },
    role: { type: String, trim: true, default: "" },
    file: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

/* ---------------- Slot ---------------- */
const slotSchema = new mongoose.Schema(
  {
    date: { type: String, default: "" },
    time: { type: String, default: "" },
    ampm: { type: String, enum: ["AM", "PM"], default: "AM" },
  },
  { _id: false }
);

/* ---------------- Latest Trailer ---------------- */
const latestTrailerSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },

    // ❌ geners → ✅ genres
    genres: [{ type: String }],

    // ❌ hour → ✅ hours
    duration: {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
    },

    year: { type: Number },
    description: { type: String, trim: true },

    // image + video
    thumbnail: { type: String, trim: true }, // filename or url
   videoUrl: { type: String, trim: true },   // youtube / video url

    directors: [personSchema],

    // ❌ producer → ✅ producers
    producers: [personSchema],

    singers: [personSchema],
  },
  { _id: false }
);

/* ---------------- Movie ---------------- */
const movieSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["normal", "featured", "releaseSoon", "latestTrailers"],
      default: "normal",
    },

    movieName: { type: String, trim: true },
    categories: [{ type: String }],

    poster: { type: String, trim: true },
    trailerUrl: { type: String, trim: true },
    videoUrl: { type: String, trim: true },

    rating: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },

    slots: [slotSchema],
    seatPrices: {
      standard: { type: Number, default: 0 },
      recliner: { type: Number, default: 0 },
    },

    auditorium: { type: String, trim: true, default: "Audi 1" },

    cast: [personSchema],
    directors: [personSchema],
    producers: [personSchema],

    story: { type: String, trim: true },

    // 🔥 MOST IMPORTANT FIX
    latestTrailer: latestTrailerSchema,
  },
  { timestamps: true }
);

const Movie =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema);

module.exports = Movie;
