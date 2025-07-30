import React, { useRef, useState } from 'react';
import '../style/Movies.scss';

const IndianMovies = ({ movies, movieCat }) => {
  const moviesListRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);


  const filteredMovies = movies?.filter(movie =>
    movie?.filam_genre?.some(genre =>
      genre?.toLowerCase() === movieCat?.toLowerCase()
    )
  );

  const scrollLeft = () => {
    if (moviesListRef.current) {
      const container = moviesListRef.current;
      const scrollAmount = 300;
      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth;
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (moviesListRef.current) {
      const container = moviesListRef.current;
      const scrollAmount = 300;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (Math.ceil(container.scrollLeft) >= maxScrollLeft) {
        container.scrollLeft = 0;
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };


  return (
    <div
      className="movies-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="movies-header">
        <h2>{movieCat?.charAt(0).toUpperCase() + movieCat?.slice(1)}</h2>
      </div>

      {isHovered && (
        <button className="scroll-button left" onClick={scrollLeft}>
          &lt;
        </button>
      )}
      <div className="movies-list-wrapper">

        <div className="movies-list" ref={moviesListRef}>
          {filteredMovies?.map((movie, index) => (
            <div className="movie-card" key={index}>
              <div className="movie-poster" style={{ backgroundImage: `url(${movie?.filam_pics[0]})` }}>
                <div className="movie-overlay">
                  <div className="movie-stats">
                    <span className="match">{movie?.imdb_rating} imdb</span>
                    <span className="rating">{movie?.filam_language?.join(" • ")}</span>
                    <span className="action_btn">
                      <a
                        href={movie?.downloadable_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button>Download</button>
                      </a>
                    </span>

                  </div>
                  <div className="movie-genres">
                    {movie?.filam_genre?.slice(0,3)?.join(" • ")}
                  </div>
                </div>
                <div className="movie-title">{movie?.film_name}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
      {isHovered && (
        <button className="scroll-button right" onClick={scrollRight}>
          &gt;
        </button>
      )}
    </div>
  );
};

export default IndianMovies;