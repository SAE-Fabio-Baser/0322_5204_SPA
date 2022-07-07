import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Sidenav from './Components/Sidenav'
import GenresView from './Views/Genres'
import DiscoverView from './Views/Discover'
import Topmenu from './Components/Topmenu'
import MovieView from './Views/MovieView'

const routes = [
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
    element: <h1 className="text-purple-700 font-bold">Watchlist</h1>,
    navText: 'My Watchlist',
    showInMainNav: true,
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
    path: '/impressum',
    element: <h1 className="text-purple-700 font-bold">Impressum</h1>,
    navText: 'Impressum',
    showInMainNav: false,
  },
]

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Topmenu routes={routes} />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App