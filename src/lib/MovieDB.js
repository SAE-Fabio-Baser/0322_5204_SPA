import config from '../config'
import qs from 'query-string'

async function get(endpoint, options = {}) {
  const params = {
    api_key: config.movieDbApiKey,
    ...options,
  }

  const response = await fetch(
    `https://api.themoviedb.org/3${endpoint}?${qs.stringify(params)}`
  )

  return await response.json()
}

export default {
  getGenres: (options) => get('/genre/movie/list', options),
  discoverMovies: (options) => get('/discover/movie', options),
}