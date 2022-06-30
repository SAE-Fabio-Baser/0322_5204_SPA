import React, { useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import config from '../config'
import { toast } from 'react-toastify'

function LoginBox(props) {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  function handleSubmit() {
    const loginData = {
      username,
      password,
    }

    console.log(loginData)

    fetch(config.backendUrl + '/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response)
        if (response.success) {
          localStorage.setItem('token', response.data.token)
          props.setLoggedIn(true)
          toast('Erfolgreich angemeldet', { type: 'success' })
          navigate('/')
        }
      })
      .catch(console.error)
  }

  return (
    <Form
      loading={loading}
      style={{
        padding: '2rem',
        margin: 'auto',
        width: '60%',
      }}
    >
      <Form.Field>
        <label>Username / E-Mail</label>
        <input
          placeholder="steveoo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Passwort</label>
        <input
          type="password"
          placeholder="ichbintoll"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Field>
      <Button type="submit" onClick={handleSubmit}>
        Anmelden
      </Button>
    </Form>
  )
}

export default LoginBox