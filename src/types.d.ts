declare interface Window {
  store: Record<any, any>
}

interface Watchlist {
  original_title: string
  moviedb_id: string
}

interface RouteInfo<ElementType> {
  path: string
  element: ElementType
  navText: string
  showInMainNav: Boolean
}

type SupportedProvider = 'google' | 'github'