import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function MenuButton({ path, text }) {
  const location = useLocation()

  return (
    <Link to={path}>
      <Menu.Item active={path === location.pathname}>{text}</Menu.Item>
    </Link>
  )
}

function Navbar({ loggedIn }) {
  const routes = {
    '/': 'Home',
    '/about': 'Über uns',
    '/todo': 'Todo Liste',
    '/users': 'Benutzer',
  }

  return (
    <Menu pointing secondary>
      <Menu.Menu>
        {Object.entries(routes).map(([path, text]) => (
          <MenuButton key={path} path={path} text={text} />
        ))}
      </Menu.Menu>
      <Menu.Menu position={'right'}>
        {loggedIn ? (
          <MenuButton path={'/logout'} text={'Abmelden'} />
        ) : (
          [
            <MenuButton
              key={'register'}
              path={'/register'}
              text={'Registrieren'}
            />,
            <MenuButton key={'login'} path={'/login'} text={'Anmelden'} />,
          ]
        )}
      </Menu.Menu>
    </Menu>
  )
}

export default Navbar