import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Dropdown,
  Input,
  Image,
  Menu,
  ButtonProps,
  InputProps,
  Button,
  Popup,
  List,
} from 'semantic-ui-react'
import logout from '../lib/logout'
import login from '../lib/login'
import { setStorage } from '../lib/storage'
import LoginModal from './LoginModal'
import firebase from 'firebase/compat'
import OAuthCredential = firebase.auth.OAuthCredential
import useStore, { StoreState } from '../store'
import { getDatabase, ref, set, onValue, remove } from 'firebase/database'

interface Props {
  firebaseUser: StoreState['firebaseUser']
  isLoggedIn: boolean
  setFirebaseUser: (newUser: StoreState['firebaseUser']) => void
  setCredential: (newCredential: OAuthCredential | null) => void
}

function TopMenu_RightMenu({
  firebaseUser,
  isLoggedIn,
  setFirebaseUser,
  setCredential,
}: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState<MovieParty.Notification[]>(
    []
  )

  const firebaseApp = useStore(state => state.firebaseApp)
  const [searchFocus, setSearchFocus] = useState(false)
  const [signInModalOpen, setSignInModalOpen] = useState(false)

  useEffect(() => {
    if (!firebaseApp) return

    const db = getDatabase(firebaseApp)

    onValue(ref(db, 'notifications/' + 'eyJieoj'), snapshot => {
      const data = snapshot.val()
      if (!data) {
        setNotifications([])
        return
      }
      const notifIds = Object.keys(data)
      const notifications = notifIds.map(id => ({ id, ...data[id] }))
      setNotifications(notifications)
    })
  }, [firebaseApp])

  function handleSignInClick(
    e: MouseEvent<HTMLButtonElement>,
    { name }: ButtonProps
  ) {
    if (!firebaseApp) return
    login(name, firebaseApp)
      .then(({ credential, firebaseUser }) => {
        setCredential(credential)
        setStorage('credential', credential)
        setFirebaseUser(firebaseUser)
        setStorage('firebaseUser', firebaseUser)
      })
      .catch(console.error)
  }

  function handleSearchChange() {
    navigate('/search/')
  }

  function handleNotificationRemove(event: MouseEvent, data: ButtonProps) {
    if (!firebaseApp) return
    const id = data.notifid
    console.log(id)

    const db = getDatabase(firebaseApp)
    set(ref(db, 'notifications/' + 'eyJieoj/' + id), null)
      .then(r => console.log('then: ', r))
      .catch(console.log)
  }

  return (
    <Menu.Menu position="right">
      <Menu.Item active={'/search' === pathname}>
        <Button
          basic
          icon={{ name: 'search', link: true }}
          onClick={handleSearchChange}
          style={{ boxShadow: 'none' }}
        />
      </Menu.Item>
      <Popup
        on="click"
        content={
          <List celled>
            {notifications.map(notif => {
              return (
                <List.Item key={notif.id}>
                  {notif.code}
                  <Button
                    icon={'x'}
                    notifid={notif.id}
                    basic
                    circular
                    style={{ boxShadow: 'none' }}
                    onClick={handleNotificationRemove}
                  />
                </List.Item>
              )
            })}
          </List>
        }
        pinned
        position="bottom center"
        trigger={
          <Button basic icon={{ name: 'bell' }} style={{ boxShadow: 'none' }} />
        }
      />

      {!isLoggedIn && <Menu.Item>Register</Menu.Item>}
      {isLoggedIn ? (
        <Menu.Item>
          <Image
            avatar
            src={firebaseUser?.photoURL}
            referrerPolicy="no-referrer"
          />
          <Dropdown text={firebaseUser?.displayName || ''}>
            <Dropdown.Menu>
              <Dropdown.Item text="Account" />
              <Dropdown.Item disabled text="Settings" />
              <Dropdown.Divider />
              <Dropdown.Item
                text="Logout"
                onClick={() => {
                  logout()
                  setFirebaseUser(null)
                  setCredential(null)
                }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      ) : (
        <LoginModal
          signInModalOpen={signInModalOpen}
          setSignInModalOpen={setSignInModalOpen}
          handleSignInClick={handleSignInClick}
        />
      )}
    </Menu.Menu>
  )
}

export default TopMenu_RightMenu