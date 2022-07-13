import React, { useEffect, useState } from 'react'
import { Accordion, Button, Grid, Image } from 'semantic-ui-react'
import movieDB from '../lib/MovieDB'
import { useParams } from 'react-router-dom'
import useStore from '../store'
import { getFirestore, addDoc } from 'firebase/firestore'
import { collection } from 'firebase/firestore/lite'

export default function MovieView() {
  const firebaseApp = useStore(state => state.firebaseApp)
  const { movieId } = useParams()
  const [language] = useState('DE')
  const [movie, setMovie] = useState(null)
  const [providers, setProviders] = useState([])

  useEffect(() => {
    movieDB.getMovie({ movie_id: movieId }).then(setMovie)

    movieDB
      .getProviders({ movie_id: movieId })
      .then(data => setProviders(data.results[language]))
  }, [])

  function handleAddToWatchlist(event, data) {
    if (!firebaseApp) return
    const db = getFirestore(firebaseApp)

    const watchlistsColl = collection(db, 'watchlists')
    const createdWatchlist = addDoc(watchlistsColl, {
      moviedb_id: movieId,
      original_title: movie?.original_title,
    })

    console.log(createdWatchlist)
  }

  return (
    <div
      style={{
        height: '100%',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundSize: 'cover',
        paddingTop: '24rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          background: '#060c16',
          borderRadius: '20px',
          margin: 'auto',
        }}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              />
            </Grid.Column>
            <Grid.Column width={10} className={'text-white'}>
              <h3 className={'text-lg'}>{movie?.title}</h3>
              <Button
                color="yellow"
                icon="add"
                circular
                basic
                onClick={handleAddToWatchlist}
              />
              <p>{movie?.overview}</p>
              <Accordion fluid className={'text-white'}>
                <Accordion.Title style={{ color: 'white' }}>
                  Kaufen
                </Accordion.Title>
                <Accordion.Content active={true} style={{ display: 'flex' }}>
                  {providers?.buy?.map(item => (
                    <a target="_blank" href={providers.link}>
                      <Image
                        key={item.provider_id}
                        src={`https://image.tmdb.org/t/p/original${item?.logo_path}`}
                        style={{ width: '40px', marginRight: '0.4rem' }}
                      />
                    </a>
                  ))}
                </Accordion.Content>
              </Accordion>
            </Grid.Column>
            <Grid.Column width={2}>Upcoming</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  )
}