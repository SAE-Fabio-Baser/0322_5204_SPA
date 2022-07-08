import React, { useEffect, useState } from 'react'
import movieDB from '../lib/MovieDB'
import { Label } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom'

function DiscoverView({ genreView = false }) {
  const { genreId = '' } = useParams()
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])

  console.log(genreId)

  useEffect(() => {
    movieDB.getGenres({ language: 'de_DE' }).then((data) => {
      const genres = {}
      data.genres.forEach((genre) => {
        genres[genre.id] = genre.name
      })

      setGenres(genres)
    })

    const discoverOptions = {}
    if (genreView) {
      discoverOptions.with_genres = genreId
    }

    movieDB
      .discoverMovies(discoverOptions)
      .then((data) => setMovies(data.results))
  }, [genreId])

  console.debug('Movies: ', movies)
  console.debug('Genres: ', genres)

  return (
    <div style={{ background: '262626 !important' }}>
      <h1 className={'text-7xl text-center m-8'}>{genres[genreId]}</h1>

      <div className="grid grid-cols-8 gap-4">
        {movies.map((movie) => {
          return (
            <Link key={movie.id} to={'/movie/' + movie.id}>
              <div>
                <img
                  style={{ width: '100%' }}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
                {/*<div>
                <p>{movie.original_title}</p>
                {movie.genre_ids.map((genreId) => (
                  <Link to={'/genre/' + genreId}>
                    <Label size="mini">{genres[genreId]}</Label>
                  </Link>
                ))}
              </div>*/}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default DiscoverView