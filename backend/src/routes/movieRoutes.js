const express = require("express");
const { createMovie, getMovies, getMovieById, deleteMovie } = require("../controller/movieController");
const upload = require("../utils/multer");

const movieRouter = express.Router();

movieRouter.post("/", upload.single("poster"), createMovie);
movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.delete("/:id", deleteMovie);

module.exports = movieRouter;
