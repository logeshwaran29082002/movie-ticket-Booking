const express = require("express");
const {
  createMovie,
  getMovies,
  getMovieById,
  deleteMovie
} = require("../controller/movieController");

const upload = require("../utils/multer");

const movieRouter = express.Router();

movieRouter.post(
  "/",
  upload.fields([
    { name: "poster", maxCount: 1 },

    { name: "castFiles", maxCount: 20 },
    { name: "directorFiles", maxCount: 20 },
    { name: "producerFiles", maxCount: 20 },

    { name: "ltThumbnail", maxCount: 1 },
    { name: "ltDirectorFiles", maxCount: 20 },
    { name: "ltProducerFiles", maxCount: 20 },
    { name: "ltSingerFiles", maxCount: 20 }
  ]),
  createMovie
);

movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.delete("/:id", deleteMovie);

module.exports = movieRouter;
