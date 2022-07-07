import React, { useState } from 'react'
import { Button, Icon, Input, Menu, Modal } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'
import login from '../lib/login'

function Topmenu({ routes }) {
  const { pathname } = useLocation()
  const [signInModalOpen, setSignInModalOpen] = useState(false)

  function handleSignInClick(e, { name }) {
    login(name).then(console.log).catch(console.error)
  }

  return (
    <Menu pointing secondary>
      <Menu.Menu>
        {routes.map((route) =>
          route.showInMainNav ? (
            <Link to={route.path} key={route.path}>
              <Menu.Item active={route.path === pathname}>
                {route.navText}
              </Menu.Item>
            </Link>
          ) : null
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
        <Menu.Item>Register</Menu.Item>
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
      </Menu.Menu>
    </Menu>
  )
}

export default Topmenu