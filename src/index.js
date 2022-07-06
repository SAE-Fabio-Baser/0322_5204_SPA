import React from 'react'
import { createRoot } from 'react-dom/client'

import 'react-toastify/dist/ReactToastify.css'

import App from './App'

const root = createRoot(document.querySelector('#app'))

root.render(<App />)