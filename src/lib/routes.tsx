import React, { ReactElement } from 'react'
import DiscoverView from '../Views/Discover'
import MovieView from '../Views/MovieView'
import WatchlistView from '../Views/Watchlist'
import GenresView from '../Views/Genres'
import AccountView from '../Views/Account'
import WatchlistDetailView from '../Views/WatchlistDetail'

const routes: RouteInfo<ReactElement>[] = [
  {
    path: '/',
    element: <h1 className="text-purple-700 font-bold">Home</h1>,
    navText: 'Home',
    showInMainNav: true,
  },
  {
    path: '/discover',
    element: <DiscoverView />,
    navText: 'Discover',
    showInMainNav: true,
  },
  {
    path: '/movie/:movieId',
    element: <MovieView />,
    navText: 'Movie Detail',
    showInMainNav: false,
  },
  {
    path: '/watchlist',
    element: <WatchlistView />,
    navText: 'My Watchlist',
    showInMainNav: true,
  },
  {
    path: '/watchlist/:watchlistId',
    element: <WatchlistDetailView />,
    navText: '',
    showInMainNav: false,
  },
  {
    path: '/genres',
    element: <GenresView />,
    navText: 'Genres',
    showInMainNav: true,
  },
  {
    path: '/genre/:genreId',
    element: <DiscoverView genreView />,
    navText: 'Genre',
    showInMainNav: false,
  },
  {
    path: '/account',
    element: <AccountView />,
    navText: 'Account',
    showInMainNav: false,
  },
  {
    path: '/impressum',
    element: <h1 className="text-purple-700 font-bold">Impressum</h1>,
    navText: 'Impressum',
    showInMainNav: false,
  },
]

export default routes