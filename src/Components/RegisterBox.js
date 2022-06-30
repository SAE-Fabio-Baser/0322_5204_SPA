import React, { useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import config from '../config'
import { useNavigate } from 'react-router-dom'

function RegisterBox(props) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agbs, setAgbs] = useState(false)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  function handleSubmit() {
    if (
      !agbs ||
      username.length < 4 ||
      email.length < 6 ||
      password.length < 8
    ) {
      return
    }

    const registerData = {
      username,
      email,
      password,
      agbs,
    }

    console.log(registerData)

    fetch(config.backendUrl + '/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response)
        if (response.success) {
          localStorage.setItem('token', response.data.token)
          props.setLoggedIn(true)
          toast('Erfolgreich registriert', { type: 'success' })
          navigate('/')
        } else {
          toast(response.message, { type: 'error' })
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
        <label>Username</label>
        <input
          placeholder="steveoo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>E-Mail</label>
        <input
          type="email"
          placeholder="steve@apple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <Form.Field>
        <Checkbox
          label="I agree to the Terms and Conditions"
          checked={agbs}
          onChange={(e, data) => setAgbs(data.checked)}
        />
      </Form.Field>
      <Button type="submit" onClick={handleSubmit}>
        Registrieren
      </Button>
    </Form>
  )
}

export default RegisterBox