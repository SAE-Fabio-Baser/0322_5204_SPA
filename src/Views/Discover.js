import React, { useEffect, useState } from 'react'
import movieDB from '../lib/MovieDB'

function DiscoverView() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    movieDB.discoverMovies({}).then((data) => setMovies(data.results))
  }, [])

  console.log('Movies: ', movies)

  return (
    <div>
      {movies.map((movie) => {
        return (
          <div style={{ border: '1px solid black' }}>
            <img
              style={{ width: '100px' }}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
            <p>{movie.original_title}</p>
          </div>
        )
      })}
    </div>
  )
}

export default DiscoverView