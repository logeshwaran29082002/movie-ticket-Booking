import React, { useEffect, useState } from "react";
import { moviesStyles } from "../assets/dummyStyles";
import movies from "../assets/dummymoviedata";
import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";

const API_BASE = "http://localhost:5000";

const PLACEHOLDER = "https://via.placeholder.com/400x600?text=No+Poster";

const getUploadUrl = (maybe) => {
  if (!maybe) return null;
  if (typeof maybe !== "string") return null;
  if (maybe.startsWith("http://") || maybe.startsWith("https://")) return maybe;
  return `${API_BASE}/uploads/${String(maybe).replace(/^uploads\//, "")}`;
};

function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  useEffect(()=>{
    const ac = new AbortController();
    setLoading(true)
    setError(null);

    async function loadFeaturedMovies() {
      try {
        const url = `${API_BASE}/api/movies?featured=true&limit=6`;
        const res = await fetch(url,{signal:ac.signal});
        if(!res.ok) throw new Error(`Fetch error: ${res.status}`);
        const json = await res.json();
        const items = json.items ?? (Array.isArray(json) ? json:[]);
        const featuredOnly = items.filter(
          (it) =>
            it?.featured === true ||
          it?.isFeatured === true ||
          String(it?.type)?.toLowerCase() === "Featured"
        );
   
        setMovies(featuredOnly.slice(0,6));
        setLoading(false);

      } catch (err) {
        if(err.name === "AbortError") return;
        console.log("Movies load error:",err);
        setError("Failed to Load Movies");
        setLoading(false);
      }
    }
    loadFeaturedMovies();
    return () => ac.abort();
  },[]);


  const visibleMovies = movies.slice(0, 6);

  return (
    <section className={moviesStyles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Pacifico&display=swap');
      `}</style>

      <h2
        style={{ fontFamily: "'Dancing Script', cursive" }}
        className={moviesStyles.title}
      >
        Featured Movie
      </h2>

      <div className={moviesStyles.grid}>
        {visibleMovies.map((m) => (
          <article key={m.id} className={moviesStyles.movieArticle}>
            <Link to={`/movie-home/${m.id}`} className={moviesStyles.movieLink}>
              <img
                src={m.img}
                alt={m.title}
                loading="lazy"
                className={moviesStyles.movieImage}
              />
            </Link>
            <div className={moviesStyles.movieInfo}>
              <div className={moviesStyles.titleContainer}>
                <Ticket className={moviesStyles.ticketsIcon} />
                <span
                  id={`movie-title-${m.id}`}
                  className={moviesStyles.movieTitle}
                  style={{ fontFamily: "'pacifico', cursive " }}
                >
                  {m.title}
                </span>
              </div>
              <div className={moviesStyles.categoryContainer}>
                <span className={moviesStyles.categoryText}>{m.category}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Movies;
