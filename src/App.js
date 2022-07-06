import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import Sidenav from './Components/Sidenav'
import GenresView from './Views/Genres'
import DiscoverView from './Views/Discover'

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
      <Sidenav routes={routes} />
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