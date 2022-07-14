import React, { MouseEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Dropdown, Input, Image, Menu, ButtonProps } from 'semantic-ui-react'
import logout from '../lib/logout'
import login from '../lib/login'
import { setStorage } from '../lib/storage'
import LoginModal from './LoginModal'
import firebase from 'firebase/compat'
import OAuthCredential = firebase.auth.OAuthCredential
import { StoreState } from '../store'

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
  const [signInModalOpen, setSignInModalOpen] = useState(false)

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