import config from '../config'

async function get(endpoint, options = {}) {
  const params = new URLSearchParams('')
  params.set('api_key', config.movieDbApiKey)

  Object.entries(options).forEach(([key, value]) => {
    params.append(key, value)
  })

  const url = `https://api.themoviedb.org/3${endpoint}?${params.toString()}`

  const response = await fetch(url)

  return await response.json()
}

export default {
  getGenres: (o) => get('/genre/movie/list', o),
  discoverMovies: (o) => get('/discover/movie', o),
  getMovie: ({ movie_id, ...o }) => get(`/movie/${movie_id}`, o),
  getProviders: ({ movie_id, ...o }) =>
    get(`/movie/${movie_id}/watch/providers`, o),
}