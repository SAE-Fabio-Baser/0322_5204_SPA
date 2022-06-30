import React, { useEffect, useState } from 'react'

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import Navbar from './Components/Navbar'
import TodoList from './TodoList'
import RegisterBox from './Components/RegisterBox'
import LoginBox from './Components/LoginBox'
import UserList from './Components/UserList'

function Logout(props) {
  const navigate = useNavigate()

  props.setLoggedIn(false)
  localStorage.removeItem('token')
  useEffect(() => {
    toast('Erfolgreich abgemeldet', { type: 'success' })
    navigate('/')
  }, [])

  return null
}

function App() {
  const token = localStorage.getItem('token')

  const [loggedIn, setLoggedIn] = useState(!!token)

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar loggedIn={loggedIn} />
      <Routes>
        <Route path={'/'} element={<h1>Home</h1>} />
        <Route path={'/about'} element={<h1>Über uns</h1>} />
        <Route path={'/todo'} element={<TodoList />} />
        <Route path={'/users'} element={<UserList loggedIn={loggedIn} />} />

        <Route
          path={'/register'}
          element={<RegisterBox setLoggedIn={setLoggedIn} />}
        />
        <Route
          path={'/login'}
          element={<LoginBox setLoggedIn={setLoggedIn} />}
        />
        <Route
          path={'/logout'}
          element={<Logout setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App