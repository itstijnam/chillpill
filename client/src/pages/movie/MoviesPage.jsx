import React, { useEffect } from 'react'
import './style/MoviesPage.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MoviesPage() {

  const { moviecat } = useParams();
  const { movies } = useSelector(store => store.movie)
  // const movies = [
  //   {
  //     title: "THE THIRD CASE",
  //     match: "66% match",
  //     rating: "1J/A 7+",
  //     duration: "2h 27m (UE)",
  //     genres: ["Crime", "Drama", "Thriller"],
  //     image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"
  //   },
  //   {
  //     title: "RAID 2",
  //     match: "72% match",
  //     rating: "2J/A 13+",
  //     duration: "1h 45m (UE)",
  //     genres: ["Action", "Thriller"],
  //     image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
  //   },
  //   {
  //     title: "SURYAVANSHI",
  //     match: "58% match",
  //     rating: "3J/A 16+",
  //     duration: "2h 15m (UE)",
  //     genres: ["Action", "Drama"],
  //     image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
  //   },
  //   {
  //     title: "SAMMARAM",
  //     match: "81% match",
  //     rating: "1J/A 7+",
  //     duration: "2h 05m (UE)",
  //     genres: ["Drama", "Romance"],
  //     image: "https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg"
  //   },
  //   {
  //     title: "CALLED OUT",
  //     match: "64% match",
  //     rating: "2J/A 13+",
  //     duration: "1h 55m (UE)",
  //     genres: ["Thriller", "Mystery"],
  //     image: "https://image.tmdb.org/t/p/w500/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg"
  //   },
  //   {
  //     title: "THE CARE GUY",
  //     match: "75% match",
  //     rating: "1J/A 7+",
  //     duration: "2h 10m (UE)",
  //     genres: ["Comedy", "Drama"],
  //     image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"
  //   },
  //   // Additional movies to make it 24
  //   {
  //     title: "DARK WATERS",
  //     match: "68% match",
  //     rating: "2J/A 13+",
  //     duration: "2h 05m (UE)",
  //     genres: ["Thriller", "Mystery"],
  //     image: "https://image.tmdb.org/t/p/w500/c9kVD7B7mNkQK1OtjLqwKQr5X0j.jpg"
  //   },
  //   {
  //     title: "MIDNIGHT RUN",
  //     match: "79% match",
  //     rating: "2J/A 13+",
  //     duration: "1h 58m (UE)",
  //     genres: ["Action", "Comedy"],
  //     image: "https://image.tmdb.org/t/p/w500/5Zv5KmgZzdIvXz2KC3n0MyecSNL.jpg"
  //   },
  //   {
  //     title: "SHADOW HUNT",
  //     match: "73% match",
  //     rating: "3J/A 16+",
  //     duration: "2h 12m (UE)",
  //     genres: ["Action", "Thriller"],
  //     image: "https://image.tmdb.org/t/p/w500/8rIoy8n0D0A7JbH3oFQlZ3Jo2jU.jpg"
  //   },
  //   {
  //     title: "SILENT WITNESS",
  //     match: "82% match",
  //     rating: "2J/A 13+",
  //     duration: "1h 50m (UE)",
  //     genres: ["Drama", "Mystery"],
  //     image: "https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg"
  //   },
  //   {
  //     title: "FINAL GAMBIT",
  //     match: "65% match",
  //     rating: "3J/A 16+",
  //     duration: "2h 08m (UE)",
  //     genres: ["Thriller", "Crime"],
  //     image: "https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg"
  //   },
  //   {
  //     title: "LOST HORIZON",
  //     match: "71% match",
  //     rating: "1J/A 7+",
  //     duration: "1h 45m (UE)",
  //     genres: ["Adventure", "Drama"],
  //     image: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg"
  //   },
  //   {
  //     title: "BLACK MIRROR",
  //     match: "84% match",
  //     rating: "3J/A 16+",
  //     duration: "2h 15m (UE)",
  //     genres: ["Sci-Fi", "Thriller"],
  //     image: "https://image.tmdb.org/t/p/w500/7Trl2aQpd1yDRhUZWM7YxwQYQPP.jpg"
  //   },
  //   {
  //     title: "GOLDEN EYE",
  //     match: "77% match",
  //     rating: "2J/A 13+",
  //     duration: "2h 10m (UE)",
  //     genres: ["Action", "Adventure"],
  //     image: "https://image.tmdb.org/t/p/w500/5VJSIAh0TKMN8sY2XCLk0O39WrS.jpg"
  //   },
  //   {
  //     title: "CRIMSON TIDE",
  //     match: "69% match",
  //     rating: "3J/A 16+",
  //     duration: "1h 55m (UE)",
  //     genres: ["Drama", "Thriller"],
  //     image: "https://image.tmdb.org/t/p/w500/keRL8DkdQJX9WrGkX7QcPgY5CJ.jpg"
  //   },
  //   {
  //     title: "MIDNIGHT EXPRESS",
  //     match: "76% match",
  //     rating: "3J/A 16+",
  //     duration: "2h 01m (UE)",
  //     genres: ["Drama", "Crime"],
  //     image: "https://image.tmdb.org/t/p/w500/5Zv5KmgZzdIvXz2KC3n0MyecSNL.jpg"
  //   },
  //   {
  //     title: "SILENT HILL",
  //     match: "72% match",
  //     rating: "3J/A 16+",
  //     duration: "2h 05m (UE)",
  //     genres: ["Horror", "Mystery"],
  //     image: "https://image.tmdb.org/t/p/w500/5BTnHWV4qYQz5hD8x3QOZgFJ1Zz.jpg"
  //   },
  //   {
  //     title: "DARK CITY",
  //     match: "81% match",
  //     rating: "2J/A 13+",
  //     duration: "1h 40m (UE)",
  //     genres: ["Sci-Fi", "Noir"],
  //     image: "https://image.tmdb.org/t/p/w500/q7btkR9Kf1FD9jYBB6XcdNqQYQj.jpg"
  //   },
  //   {
  //     title: "FINAL COUNTDOWN",
  //     match: "67% match",
  //     rating: "2J/A 13+",
  //     duration: "1h 50m (UE)",
  //     genres: ["Action", "Sci-Fi"],
  //     image: "https://image.tmdb.org/t/p/w500/5Zv5KmgZzdIvXz2KC3n0MyecSNL.jpg"
  //   },
  //   {
  //     title: "SHADOW DANCER",
  //     match: "74% match",
  //     rating: "3J/A 16+",
  //     duration: "1h 45m (UE)",
  //     genres: ["Thriller", "Drama"],
  //     image: "https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg"
  //   },
  //   {
  //     title: "BLACK RAIN",
  //     match: "78% match",
  //     rating: "3J/A 16+",
  //     duration: "2h 05m (UE)",
  //     genres: ["Action", "Crime"],
  //     image: "https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg"
  //   },
  //   {
  //     title: "GOLDEN CHILD",
  //     match: "70% match",
  //     rating: "2J/A 13+",
  //     duration: "1h 55m (UE)",
  //     genres: ["Action", "Fantasy"],
  //     image: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg"
  //   },
  //   {
  //     title: "CRIMSON PEAK",
  //     match: "83% match",
  //     rating: "3J/A 16+",
  //     duration: "1h 59m (UE)",
  //     genres: ["Horror", "Romance"],
  //     image: "https://image.tmdb.org/t/p/w500/7Trl2aQpd1yDRhUZWM7YxwQYQPP.jpg"
  //   },
  //   {
  //     title: "MIDNIGHT SPECIAL",
  //     match: "75% match",
  //     rating: "2J/A 13+",
  //     duration: "1h 52m (UE)",
  //     genres: ["Sci-Fi", "Drama"],
  //     image: "https://image.tmdb.org/t/p/w500/5VJSIAh0TKMN8sY2XCLk0O39WrS.jpg"
  //   }
  // ];

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='MoviesPage'>
      {movies?.map((movie, index) => (
        <div className="movie-card moviespage_movie_card" key={index}>
          <div className="movie-poster" style={{ backgroundImage: `url(${movie?.filam_pics[0]})` }}>
            <div className="movie-overlay">
              <div className="movie-stats moviespage_moviestats">
                <span className="match">{movie?.imdb_rating}</span>
                <span className="rating">{movie?.filam_language?.join(" • ")}</span>
                <span className="action_btn">
                  {/* <button>Play</button> */}
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
                {movie?.filam_genre?.join(" • ")}
              </div>
            </div>
            <div className="movie-title">{movie?.film_name}</div>
          </div>
        </div>
      ))}

    </div>
  )
}

export default MoviesPage