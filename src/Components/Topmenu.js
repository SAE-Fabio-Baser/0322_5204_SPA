import React from 'react'
import { Button, Icon, Input, Menu } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'

function Topmenu({ routes }) {
  const { pathname } = useLocation()

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
        <Menu.Item>
          <Button circular basic color="blue">
            <Icon name={'user circle'} />
            Sign in
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Topmenu