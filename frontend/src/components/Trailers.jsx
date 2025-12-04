import React, { useEffect, useRef, useState } from "react";
import { trailersStyles, trailersCSS } from "../assets/dummyStyles";
import { trailersData } from "../assets/trailerdata";
import { ChevronLeft, ChevronRight, Clipboard } from "lucide-react"; // ✅ MISSING IMPORT FIXED

function Trailers() {
  const [featuredTrailer, setFeaturedTrailer] = useState(trailersData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    // no-op kept for parity
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };
  return (
    <div className={trailersStyles.container}>
      <main className={trailersStyles.main}>
        <div className={trailersStyles.layout}>
          {/* Left Side */}
          <div className={trailersStyles.leftSide}>
            <div className={trailersStyles.leftCard}>
              <h2
                className={trailersStyles.leftTitle}
                style={{
                  fontFamily: "Monotom, cursive",
                }}
              >
                <Clipboard className={trailersStyles.titleIcon} />
                Latest Trailer
              </h2>
              <div className={trailersStyles.carouselControls}>
                <div className={trailersStyles.controlButtons}>
                  <button
                    onClick={scrollLeft}
                    className={trailersStyles.controlButton}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={scrollRight}
                    className={trailersStyles.controlButton}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <span className={trailersStyles.trailerCount}>
                  {trailersData.length} trailers
                </span>
              </div>
              <div
                ref={carouselRef}
                className={trailersStyles.carousel}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {trailersData.map((trailer) => {
                  return (
                    <div
                      key={trailer.id}
                      data-id={trailer.id}
                      className={`${trailersStyles.carouselItem.base} ${
                        featuredTrailer.id === trailer.id
                          ? trailersStyles.carouselItem.active
                          : trailersStyles.carouselItem.inactive
                      }`}
                      style={{
                        width: "220px",
                        height: "124px",
                        minWidth: "220px",
                      }}
                      onClick={() => selectTrailer(trailer)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          selectTrailer(trailer);
                      }}
                      aria-pressed={featuredTrailer.id === trailer.id}
                    >
                      <img
                        src={trailer.thumbnail}
                        alt={trailer.title}
                        className={trailersStyles.carouselImage}
                        loading="lazy"
                      />
                      <div className={trailersStyles.carouselOverlay}>
                        <h3 className={trailersStyles.carouselTitle}>
                          {trailer.title}
                        </h3>
                        <p className={trailersStyles.carouselGenre}>
                          {trailer.genre}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={trailersStyles.trendingSection}>
                <h3 className={trailersStyles.trendingTitle}>Now Tranding</h3>
                {trailersData.slice(0, 3).map((trailer) => (
                  <div
                    onClick={() => selectTrailer(trailer)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        selectTrailer(trailer);
                      }
                    }}
                    key={trailer.id}
                    className={trailersStyles.trendingItem}
                  >
                    <div className=""></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Trailers;
