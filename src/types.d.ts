declare interface Window {
  store: Record<any, any>
}

declare namespace MovieParty {
  interface Notification {
    id?: string
    code: string
    data?: Record<string, string | number | boolean>
    time: number
  }
}

interface GenreInfo {
  id: string
  name: string
}

interface WatchlistUser {
  name: string
  id: string
  photoURL: string
}

interface Watchlist {
  id: string
  name: string
  owner: WatchlistUser
  movies?: TMDB_Movie[]
  desc?: string
  genres?: { name: string; id: string }[]
  collaborators?: WatchlistUser[]
}

interface MovieSearchResult {
  page: number
  total_pages: number
  total_results: number
  results: TMDB_Movie[]
}

interface TMDB_Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  tagline?: string
}

interface TMDB_Provider {
  buy?: any[]
  rent?: any[]
  stream?: any[]
  link: string
}

interface RouteInfo<ElementType> {
  path: string
  element: ElementType
  navText: string
  showInMainNav: Boolean
}

type SupportedProvider = 'google' | 'github'