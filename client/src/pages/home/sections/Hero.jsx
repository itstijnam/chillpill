import React, { useState, useEffect } from 'react';
import '../style/Hero.scss';
import { useSelector } from 'react-redux';

function Hero() {
  const [movieData, setMovieData] = useState({
    title: "Loading...",
    heading: "",
    description: "",
    backgroundImage: "",
    bottomImages: []
  });

  const { movies } = useSelector(store => store.movie)


  useEffect(() => {
    // Simulate API fetch
    const fetchMovieData = async () => {
      try {
        // In a real app, this would be an actual API call
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();

        // Mock data - replace with actual API call
        const mockData = {
          title: "Avengers: Endgame",
          heading: "The epic conclusion to the Infinity Saga",
          description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
          backgroundImage: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
          bottomImages: [
            "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
            "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
            "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
          ]
        };

        setMovieData(mockData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        // Fallback data
        setMovieData({
          title: "Movie Title",
          heading: "Heading In one line",
          description: "Description\nLorem ipsum",
          backgroundImage: "https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg",
          bottomImages: [
            "https://via.placeholder.com/200x120",
            "https://via.placeholder.com/200x120",
            "https://via.placeholder.com/200x120"
          ]
        });
      }
    };

    fetchMovieData();
  }, []);

  return (
    <section className='hero_section'>
      <div className="hero">
        {/* Main background image - now in JSX */}
        <div className="hero__background">
          <img
            src={movies[0]?.filam_pics[0]}
            alt={movies[0]?.filam_pics[0]}
            className="hero__background-img"
          />
        </div>

        {/* Content */}
        <div className="hero__content">
          <h1 className="hero__title">{movies[0]?.film_name}</h1>
          <h2 className="hero__heading">{movies[0]?.heading}</h2>
          <p className="hero__description">
            {movies[0]?.filam_description?.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>

          <div className="hero__buttons">
            {/* <button className="hero__button hero__button--play">PLAY</button> */}
            <a
              href={movies[0]?.downloadable_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="hero__button hero__button--play">Download</button>
            </a>

            <button className="hero__button hero__button--secondary">Have Fun</button>
          </div>
        </div>
      </div>

      {/* Bottom image boxes - now from API array */}
      <div className="hero__bottom-images">
        {movies?.slice(0,3)?.map((movie, index) => (
          <div key={index} className="hero__bottom-image">
            <img
              src={movie?.filam_pics[0]}
              alt={`Movie scene ${index + 1}`}
              className="hero__bottom-image-img"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;