import React, { Key, MouseEvent, ReactElement, useState } from 'react'
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
import firebase from 'firebase/compat'
import User = firebase.User
import OAuthCredential = firebase.auth.OAuthCredential

interface Props {
  routes: RouteInfo<ReactElement>[]
  userCredentials: OAuthCredential
  setUserCredentials: (userCredentials: OAuthCredential | null) => void
  userInfo: Partial<User>
  setUserInfo: (userInfo: Partial<User> | null) => void
}

function Topmenu({
  routes,
  userCredentials,
  setUserInfo,
  userInfo,
  setUserCredentials,
}: Props) {
  const { pathname } = useLocation()
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const isLoggedIn = !!userCredentials?.accessToken

  function handleSignInClick(
    e: MouseEvent<HTMLButtonElement>,
    { name }: ButtonProps
  ) {
    login(name)
      .then(({ credentials, userInfo }) => {
        setUserCredentials(credentials)
        setUserInfo(userInfo)
      })
      .catch(console.error)
  }

  return (
    <Menu secondary>
      <Menu.Menu>
        {routes.map(
          (route) =>
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
              src={userInfo?.photoURL}
              referrerPolicy="no-referrer"
            />
            <Dropdown text={userInfo.displayName || ''}>
              <Dropdown.Menu>
                <Dropdown.Item text="Account" />
                <Dropdown.Item disabled text="Settings" />
                <Dropdown.Divider />
                <Dropdown.Item
                  text="Logout"
                  onClick={() => {
                    logout()
                    setUserInfo(null)
                    setUserCredentials(null)
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