import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useStore from '../store'
import Watchlist from './Watchlist'
import { getWatchlistById } from '../lib/db'
import MovieDB from '../lib/MovieDB'
import {
  Label,
  Image,
  Input,
  Dropdown,
  Modal,
  Button,
  InputProps,
} from 'semantic-ui-react'
import MovieThumb from '../Components/MovieThumb'

function WatchlistDetailView() {
  const { watchlistId = '' } = useParams()
  const firebaseApp = useStore(state => state.firebaseApp)
  const [watchlist, setWatchlist] = useState<Watchlist | undefined>(undefined)
  const [genres, setGenres] = useState<
    { key: string; value: string; text: string; basic: true }[]
  >([])
  const [query, setQuery] = useState('')
  const [nameInputValue, setNameInputValue] = useState('')
  const [descInputValue, setDescInputValue] = useState('')

  useEffect(() => {
    if (!firebaseApp) return

    MovieDB.getGenres({}).then(genreInfos => {
      console.log(genreInfos)
      setGenres(
        genreInfos.genres.map(g => ({
          key: g.id,
          value: g.id,
          text: g.name,
          basic: true,
        }))
      )
    })

    getWatchlistById(firebaseApp, watchlistId).then(newWatchlist => {
      if (!newWatchlist) return

      console.debug('Watchlist: ', newWatchlist)

      setWatchlist(newWatchlist)
      setNameInputValue(newWatchlist.name)
      setDescInputValue(newWatchlist.desc || '')
    })
  }, [firebaseApp])

  const editors: WatchlistUser[] = watchlist
    ? [watchlist.owner, ...(watchlist.collaborators || [])]
    : []

  function handleUserSearch(e: MouseEvent, data: InputProps) {
    console.log(query)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '4rem',
          gap: '1rem',
        }}
      >
        <div
          style={{ background: '#262626', width: '200px', height: '200px' }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGrow: 1,
            gap: '0.5rem',
          }}
        >
          <Input
            transparent
            placeholder={'Name'}
            value={nameInputValue}
            onChange={(e, d) => setNameInputValue(d.value)}
            style={{ fontSize: '260%', fontWeight: 800 }}
          />
          <Input
            transparent
            placeholder={'Description'}
            value={descInputValue}
            onChange={(e, d) => setDescInputValue(d.value)}
          />
          <div>
            {watchlist?.genres?.map(genre => (
              <Label basic size="tiny" key={genre.id}>
                {genre.name.toUpperCase()}
              </Label>
            ))}
            <Dropdown
              placeholder="Genres"
              fluid
              multiple
              search
              selection
              options={genres}
              size={'small'}
            />
          </div>
          <div>
            {editors.map(collab => (
              <Image avatar src={collab.photoURL} key={collab.id} />
            ))}

            <Modal
              size="small"
              trigger={<Button basic>Invite</Button>}
              open={false}
            >
              <Modal.Header>Invite new Watchlist Collaborator</Modal.Header>
              <Modal.Content style={{ textAlign: 'center' }}>
                <Input
                  placeholder={'Username ...'}
                  value={query}
                  onChange={(e, data) => setQuery(data.value)}
                  action={{
                    icon: 'search',
                    basic: true,
                    onClick: handleUserSearch,
                  }}
                />
              </Modal.Content>
            </Modal>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4" style={{ padding: '4rem' }}>
        {watchlist?.movies?.map(movie => (
          <MovieThumb movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default WatchlistDetailView