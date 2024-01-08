import 'bootstrap/dist/css/bootstrap.min.css'
import './global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {  RouterProvider } from 'react-router-dom'

import { RelayProvider } from './relay/provider.tsx'
import { router } from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RelayProvider>
      <RouterProvider router={router} />
    </RelayProvider>
  </React.StrictMode>,
)
