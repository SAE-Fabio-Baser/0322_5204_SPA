import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { Grid, Input, InputProps, Pagination } from 'semantic-ui-react'
import movieDB from '../lib/MovieDB'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import getQueryParams from '../lib/getQueryParams'
import { PaginationProps } from 'semantic-ui-react/dist/commonjs/addons/Pagination/Pagination'

let timer: number

function SearchView() {
  const location = useLocation()
  const navigate = useNavigate()

  const [searchResult, setSearchResult] = useState<MovieSearchResult | null>(
    null
  )
  const [query, setQuery] = useState(getQueryParams(location).get('q') || '')

  function search({ page } = { page: 1 }) {
    movieDB
      .searchForMovies({ query, language: 'de-DE', page })
      .then(setSearchResult) // TODO: Use Browser Language
  }

  console.debug({ query, searchResult })

  useEffect(() => {
    const params = new URLSearchParams()
    if (query) {
      params.append('q', query)
    } else {
      params.delete('q')
    }
    navigate({ search: params.toString() })
  }, [query, navigate])

  useEffect(() => {
    search()
  }, [])

  function handlePageChange(
    event: MouseEvent<HTMLAnchorElement>,
    data: PaginationProps
  ) {
    console.log(data.activePage)
    search({ page: data.activePage as number })
  }

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement>,
    data: InputProps
  ) => {
    setQuery(data.value)

    clearTimeout(timer)

    timer = setTimeout(() => {
      search()
    }, 300)
  }

  return (
    <div style={{ margin: '4rem' }}>
      <Input
        value={query}
        fluid
        onChange={handleSearchChange}
        size="huge"
        placeholder={'Wonach suchst du?'}
        icon={{ name: 'search', circular: true }}
      />

      <Pagination
        activePage={searchResult?.page || 1}
        boundaryRange={1}
        defaultActivePage={1}
        siblingRange={1}
        totalPages={searchResult?.total_pages || 0}
        onPageChange={handlePageChange}
      />
      <Grid>
        <Grid.Row columns={6}>
          {searchResult?.results?.map(
            movie =>
              movie.poster_path && (
                <Grid.Column style={{ marginTop: '1rem' }} key={movie.id}>
                  <img
                    style={{ width: '100%' }}
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
                </Grid.Column>
              )
          )}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default SearchView