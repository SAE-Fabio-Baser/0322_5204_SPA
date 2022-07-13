import React, {
  Key,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import {
  Button,
  ButtonProps,
  Dropdown,
  Icon,
  Image,
  Input,
  Menu,
  Modal,
} from 'semantic-ui-react'
import { Link, To, useLocation } from 'react-router-dom'
import login from '../lib/login'
import logout from '../lib/logout'

import useStore from '../store'
import { getStorage, setStorage } from '../lib/storage'

interface Props {
  routes: RouteInfo<ReactElement>[]
}

function Topmenu({ routes }: Props) {
  const credential = useStore(state => state.credential)
  const firebaseUser = useStore(state => state.firebaseUser)
  const setCredential = useStore(state => state.setCredential)
  const setFirebaseUser = useStore(state => state.setFirebaseUser)

  const { pathname } = useLocation()
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const isLoggedIn = !!credential?.accessToken

  useEffect(() => {
    const storedFirebaseUser = getStorage('firebaseUser')
    const storedCredential = getStorage('credential')

    storedCredential && setCredential(storedCredential)
    storedFirebaseUser && setFirebaseUser(storedFirebaseUser)
  }, [])

  function handleSignInClick(
    e: MouseEvent<HTMLButtonElement>,
    { name }: ButtonProps
  ) {
    login(name)
      .then(({ credential, firebaseUser }) => {
        setCredential(credential)
        setStorage('credential', credential)
        setFirebaseUser(firebaseUser)
        setStorage('firebaseUser', firebaseUser)
      })
      .catch(console.error)
  }

  return (
    <Menu secondary>
      <Menu.Menu>
        {routes.map(
          route =>
            route.showInMainNav && (
              <Link to={route.path as To} key={route.path as Key}>
                <Menu.Item active={route.path === pathname}>
                  {route.navText}
                </Menu.Item>
              </Link>
            )
        )}
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item active={'/search' === pathname}>
          <Input
            transparent
            icon={{ name: 'search', link: true }}
            placeholder="Search ..."
          />
        </Menu.Item>
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
          <Modal
            size={'mini'}
            dimmer={'blurring'}
            onOpen={() => setSignInModalOpen(true)}
            onClose={() => setSignInModalOpen(false)}
            open={signInModalOpen}
            trigger={
              <Menu.Item>
                <Button circular basic color="blue">
                  <Icon name={'user circle'} />
                  Sign in
                </Button>
              </Menu.Item>
            }
          >
            <Modal.Header>Sign in with your favourite SSO</Modal.Header>
            <Modal.Content>
              <Button name="google" basic onClick={handleSignInClick}>
                <Icon name="google" />
                Google
              </Button>
              <Button name="github" basic onClick={handleSignInClick}>
                <Icon name="github" />
                GitHub
              </Button>
            </Modal.Content>
          </Modal>
        )}
      </Menu.Menu>
    </Menu>
  )
}

export default Topmenu