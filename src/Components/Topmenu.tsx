import React, { useEffect } from 'react'
import { Menu } from 'semantic-ui-react'

import useStore from '../store'
import { getStorage } from '../lib/storage'
import TopMenu_LeftMenu from './TopMenu_LeftMenu'
import TopMenu_RightMenu from './TopMenu_RightMenu'

function Topmenu() {
  const credential = useStore(state => state.credential)
  const firebaseUser = useStore(state => state.firebaseUser)
  const setCredential = useStore(state => state.setCredential)
  const setFirebaseUser = useStore(state => state.setFirebaseUser)

  const isLoggedIn = !!credential?.accessToken

  useEffect(() => {
    const storedFirebaseUser = getStorage('firebaseUser')
    const storedCredential = getStorage('credential')

    storedCredential && setCredential(storedCredential)
    storedFirebaseUser && setFirebaseUser(storedFirebaseUser)
  }, [])

  return (
    <Menu secondary>
      <TopMenu_LeftMenu />
      <TopMenu_RightMenu
        firebaseUser={firebaseUser}
        isLoggedIn={isLoggedIn}
        setFirebaseUser={setFirebaseUser}
        setCredential={setCredential}
      />
    </Menu>
  )
}

export default Topmenu