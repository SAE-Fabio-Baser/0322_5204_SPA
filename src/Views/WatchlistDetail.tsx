import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useStore from '../store'
import Watchlist from './Watchlist'
import { getWatchlistById } from '../lib/db'

function WatchlistDetailView() {
  const { watchlistId = '' } = useParams()
  const [watchlist, setWatchlist] = useState<Watchlist | undefined>(undefined)
  const firebaseApp = useStore(state => state.firebaseApp)

  useEffect(() => {
    if (!firebaseApp) return
    getWatchlistById(firebaseApp, watchlistId).then(setWatchlist)
  }, [])

  return (
    <div>
      My watchlist: {watchlistId}
      <div className="grid grid-cols-8 gap-4">
        {watchlist?.movies?.map(movie => {
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

export default WatchlistDetailView