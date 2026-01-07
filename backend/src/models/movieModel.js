const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
    file: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const slotSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    ampm: {
      type: String,
      enum: ["AM", "PM"],
      default: "AM",
    },
  },
  {
    _id: false,
  }
);

const latestTrailerSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    geners: { type: String },
    duration: {
      hour: { type: Number, default: 0 },
      minutes: { type: String },
    },
    year: { type: Number },
    description: { type: String, trim: true },
    thumbnail: { type: String, trim: true }, // filename or url
    videoId: { type: String, trim: true }, // storing the url

    directors: [personSchema],
    producer: [personSchema],
    singers: [personSchema],
  },
  {
    _id: false,
  });


  const movieSchema = new mongoose.Schema({
     type: {
      type: String,
      enum: ["normal", "featured", "releaseSoon", "latestTrailers"],
      default: "normal",
    },

    movieName: { type: String, trim: true },
    categories: [{ type: String }],
    poster: { type: String, trim: true }, // url or file name
    trailerUrl: { type: String, trim: true },
    videoUrl: { type: String, trim: true },
    rating: { type: Number, default: 0 },
    duration: { type: Number, default: 0 }, // total minutes

    // for pricing
    slots: [slotSchema],
    seatPrices: {
      standard: { type: Number, default: 0 },
      recliner: { type: Number, default: 0 },
    },

    auditorium: { type: String, trim: true, default: "Audi 1" }, // audi selection
// people details
    cast: [personSchema],
    directors: [personSchema],
    producers: [personSchema],

    story: { type: String, trim: true },
  },{
    timestamps:true
  })

const Movie = mongoose.models.Movie || mongoose.model('Movie',movieSchema);

module.exports = Movie;
