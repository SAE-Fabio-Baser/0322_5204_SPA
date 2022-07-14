import React, { useEffect, useState } from 'react'
import useStore from '../store'
import { Link } from 'react-router-dom'
import { Card, Input, Label } from 'semantic-ui-react'
import { getFirestore, collection } from 'firebase/firestore/lite'
import { addDoc } from 'firebase/firestore'
import { createWatchlist } from '../lib/db'

function Watchlist() {
  const [newWLName, setNewWLName] = useState('')
  const firebaseUser = useStore(state => state.firebaseUser)
  const firebaseApp = useStore(state => state.firebaseApp)
  const watchlists = useStore(state => state.watchlists)
  const fetchWatchlists = useStore(state => state.fetchWatchtlists)

  useEffect(() => fetchWatchlists, [firebaseApp])

  function handleAddClick() {
    if (firebaseApp && firebaseUser)
      createWatchlist(firebaseApp, firebaseUser, newWLName).then(
        fetchWatchlists
      )
  }

  const cardItems = watchlists.map(list => ({
    as: Link,
    to: '/watchlist/' + list.id,
    header: list.name,
    meta: {
      children: list.genres?.map(genre => (
        <Label key={genre.name}>{genre.name}</Label>
      )),
    },
    description: list.desc,
  }))

  return (
    <div>
      <Input
        value={newWLName}
        onInput={(e: any) => setNewWLName(e.target.value)}
        placeholder="Watchlist name"
        action={{ icon: 'add', onClick: handleAddClick }}
      />
      <Card.Group items={cardItems} />
    </div>
  )
}

export default Watchlist