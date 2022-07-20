import React from 'react'
import { Link } from 'react-router-dom'

import './MovieThumb.sass'

function MovieThumb(props: { movie: TMDB_Movie }) {
  const { movie } = props

  return (
    <Link key={movie.id} to={'/movie/' + movie.id} className="MovieThumb">
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
    </Link>
  )
}

export default MovieThumb