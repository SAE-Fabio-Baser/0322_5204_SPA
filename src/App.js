import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { initializeApp } from 'firebase/app'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import GenresView from './Views/Genres'
import DiscoverView from './Views/Discover'
import Topmenu from './Components/Topmenu'
import MovieView from './Views/MovieView'
import login from './lib/login'

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
  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCnXD2mD-u6Y41vcGlVirBgiFqwvz-8_b8',
      authDomain: 'movieparty-93773.firebaseapp.com',
      projectId: 'movieparty-93773',
      storageBucket: 'movieparty-93773.appspot.com',
      messagingSenderId: '40895682681',
      appId: '1:40895682681:web:19f65a7ba491157e8c5ca8',
    }

    const firebase = initializeApp(firebaseConfig)
  }, [])

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