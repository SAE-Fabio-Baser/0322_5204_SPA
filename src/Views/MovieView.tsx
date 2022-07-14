import React, { useEffect, useState } from 'react'
import {
  Accordion,
  Button,
  Dropdown,
  DropdownItemProps,
  Grid,
  Image,
} from 'semantic-ui-react'
import movieDB from '../lib/MovieDB'
import { useParams } from 'react-router-dom'
import useStore from '../store'
import {
  addMovieToWatchlist,
  createWatchlist,
  getAllWatchlists,
} from '../lib/db'
import { DropdownProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown'
import create from 'zustand'

export default function MovieView() {
  const firebaseApp = useStore(state => state.firebaseApp)
  const firebaseUser = useStore(state => state.firebaseUser)
  const { movieId = '' } = useParams()
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [language] = useState('DE')
  const [movie, setMovie] = useState<TMDB_Movie | null>(null)
  const [providers, setProviders] = useState<TMDB_Provider>({ link: '' })

  useEffect(() => {
    movieDB.getMovie({ movie_id: movieId }).then(setMovie)

    movieDB
      .getProviders({ movie_id: movieId })
      .then(data => setProviders(data.results[language]))

    if (firebaseApp) getAllWatchlists(firebaseApp).then(setWatchlists)
  }, [])

  function handleAddToWatchlist(
    event: React.MouseEvent<HTMLDivElement>,
    data: DropdownItemProps
  ) {
    const watchlistId = data.value as string

    if (!firebaseApp || !movie) return

    addMovieToWatchlist(firebaseApp, watchlistId, movie)
  }

  function handleCreateListClick(
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) {
    if (!firebaseUser || !firebaseApp) return
    const name = data.value as string
    createWatchlist(firebaseApp, firebaseUser, name)
  }

  const watchlistOptions = watchlists.map(wl => ({
    text: wl.name,
    key: wl.id,
    value: wl.id,
    onClick: handleAddToWatchlist,
  }))

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
              <Dropdown
                button
                className="icon"
                labeled
                allowAdditions
                icon="add"
                onAddItem={handleCreateListClick}
                options={watchlistOptions}
                search
                text="Add to watchlist"
              />
              <p>{movie?.overview}</p>
              <Accordion fluid className={'text-white'}>
                <Accordion.Title style={{ color: 'white' }}>
                  Kaufen
                </Accordion.Title>
                <Accordion.Content active={true} style={{ display: 'flex' }}>
                  {providers?.buy?.map(item => (
                    <a
                      key={item.provider_id}
                      target="_blank"
                      href={providers.link}
                    >
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