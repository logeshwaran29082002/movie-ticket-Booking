import React from "react";
import MoviePage from "../components/MoviePage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Movie() {
  return (
    <div>
      <Navbar />
      <MoviePage />
      <Footer />
    </div>
  );
}

export default Movie;
