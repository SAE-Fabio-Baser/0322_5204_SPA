import config from '../config'

type Options = Record<string, string>

async function get(endpoint: string, options: Options = {}) {
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
  getGenres: (o: Options) => get('/genre/movie/list', o),
  discoverMovies: (o: Options) => get('/discover/movie', o),
  getMovie: ({ movie_id, ...o }: Options) => get(`/movie/${movie_id}`, o),
  getProviders: ({ movie_id, ...o }: Options) =>
    get(`/movie/${movie_id}/watch/providers`, o),
}