import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RelayProvider } from './relay/provider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <App /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RelayProvider>
      <RouterProvider router={router} />
    </RelayProvider>
  </React.StrictMode>,
)
