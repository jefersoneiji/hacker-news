import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RelayProvider } from './relay/provider.tsx'
import {  RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RelayProvider>
      <RouterProvider router={router} />
    </RelayProvider>
  </React.StrictMode>,
)
