import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import link from '../lib/link'

export default function AccountView() {
  function handleSignInClick(e, { name }) {
    link(name)
  }

  return (
    <div>
      <Button name="google" basic onClick={handleSignInClick}>
        <Icon name="google" />
        Google
      </Button>
      <Button name="github" basic onClick={handleSignInClick}>
        <Icon name="github" />
        GitHub
      </Button>
    </div>
  )
}