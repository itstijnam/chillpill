import React from 'react'
import Hero from './sections/Hero'
import './style/Home.scss'
import IndianMovies from './sections/IndianMovies'
import useGetAllMovies from '../../hooks/getAllMovies'
import { useSelector } from 'react-redux'


function Home() {

  useGetAllMovies();
  const {movies} = useSelector(store => store.movie)
  console.log(movies)

  return (
    <div className='home'>
      <Hero/>
      
      <IndianMovies movies={movies} movieCat={'comedy'} />
      <IndianMovies movies={movies} movieCat={'action'} />
      <IndianMovies movies={movies} movieCat={'adventure'} />
      <IndianMovies movies={movies} movieCat={'horror'} />

    </div>
  )
}

export default Home