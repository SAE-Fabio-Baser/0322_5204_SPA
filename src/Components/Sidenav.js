import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SidenavItem(props) {
  const { text, path } = props

  return (
    <li className="relative">
      <Link
        className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
        to={path}
        data-mdb-ripple="true"
        data-mdb-ripple-color="dark"
      >
        {text}
      </Link>
    </li>
  )
}

function Sidenav(props) {
  const { routes } = props

  const [open, setOpen] = useState(false)

  return (
    <div
      className={`w-60  h-full shadow-md bg-white px-1 absolute flex flex-col place-content-between`}
      style={{ transform: open ? 'translateX(0px)' : 'translateX(-240px)' }}
    >
      <ul className="relative">
        {routes.map(({ navText, path, showInMainNav }) => {
          if (!showInMainNav) return null

          return <SidenavItem key={path} text={navText} path={path} />
        })}
      </ul>
      <button
        type="button"
        className="w-full mb-2 inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-normal uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={() => setOpen(false)}
      >
        Seitenleiste einklappen
      </button>
      {!open && (
        <button
          type="button"
          style={{ left: '245px' }}
          className="w-full mb-2 fixed bottom-0 inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-normal uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          onClick={() => setOpen(true)}
        >
          Ausklappen
        </button>
      )}
    </div>
  )
}

export default Sidenav