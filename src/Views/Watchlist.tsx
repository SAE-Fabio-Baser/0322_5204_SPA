import React, { useEffect, useState } from 'react'
import useStore from '../store'
import { Link } from 'react-router-dom'
import { Input } from 'semantic-ui-react'
import { getFirestore, collection } from 'firebase/firestore/lite'
import { addDoc } from 'firebase/firestore'

function Watchlist() {
  const [newWLName, setNewWLName] = useState('')
  const firebaseUser = useStore(state => state.firebaseUser)
  const firebaseApp = useStore(state => state.firebaseApp)
  const watchlists = useStore(state => state.watchlists)
  const fetchWathclists = useStore(state => state.fetchWatchtlists)

  useEffect(() => {
    useStore.subscribe(newState => {
      if (newState.firebaseApp && newState.watchlists.length === 0) {
        fetchWathclists()
      }
    })
  }, [])

  async function createWatchlist() {
    if (!firebaseApp || !firebaseUser) return

    const db = getFirestore(firebaseApp)

    const watchlistsColl = collection(db, 'watchlists')

    await addDoc(watchlistsColl, {
      ownerId: firebaseUser.uid,
      name: newWLName,
    })

    fetchWathclists()
  }

  return (
    <div>
      Watchlist
      <Input
        value={newWLName}
        onInput={(e: any) => setNewWLName(e.target.value)}
        placeholder="Watchlist name"
        action={{ icon: 'add', onClick: createWatchlist }}
      />
      <div className="grid grid-cols-8 gap-4">
        {watchlists.map(list => {
          return (
            <Link key={list.id} to={'/watchlist/' + list.id}>
              <div>
                {/*<img
                style={{ width: '100%' }}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />*/}
                <p>{list.name}</p>
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

export default Watchlist