import React, { useEffect, useState } from 'react'
import { Image, List } from 'semantic-ui-react'
import config from '../config'
import { toast } from 'react-toastify'

function UserList(props) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!props.loggedIn) return

    const token = localStorage.getItem('token')

    fetch(config.backendUrl + '/api/users', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response)
        setUsers(response.data.users)
      })
      .catch(console.error)
  }, [])

  return (
    <List>
      {users.map((user) => (
        <List.Item>
          <Image
            avatar
            src={`https://avatar.tobi.sh/${user.username}.svg?text=TL`}
          />
          <List.Content>
            <List.Header as="a">{user.username}</List.Header>
            <List.Description>{user.role}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  )
}

export default UserList