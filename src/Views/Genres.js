import React, { useEffect, useState } from 'react'

import movieDB from '../lib/MovieDB'

function GenresView() {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    movieDB.getGenres().then((res) => setGenres(res.genres))

    movieDB.discoverMovies({ page: 2 }).then(console.log)
  }, [])

  console.log('Genres: ', genres)

  return (
    <div>
      {genres.map((genre) => (
        <p key={genre.id}>{genre.name}</p>
      ))}
    </div>
  )
}

export default GenresView