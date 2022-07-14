import React, { Key } from 'react'
import routes from '../lib/routes'
import { Link, To, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function TopMenu_LeftMenu() {
  const { pathname } = useLocation()

  return (
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
  )
}

export default TopMenu_LeftMenu