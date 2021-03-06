import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { initializeApp } from 'firebase/app'
import Topmenu from './Components/Topmenu'
import useStore from './store'
import createNotification from './lib/createNotification'

import routes from './lib/routes'
import config from './config'

function App() {
  const setFirebaseApp = useStore(state => state.setFirebaseApp)

  useStore.subscribe(newState => (window.store = newState))

  useEffect(() => {
    const firebaseApp = initializeApp(config.firebaseConfig)

    setFirebaseApp(firebaseApp)

    // @ts-ignore
    window.createNotif = (options, data) =>
      // @ts-ignore
      createNotification(firebaseApp, options, data)
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer />
      <Topmenu />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App