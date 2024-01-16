import 'bootstrap/dist/css/bootstrap.min.css'
import './global.css'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { RelayProvider } from './relay/provider.tsx'
import { router } from './router.tsx'
import { Loading } from './components/loading/loading.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading/>}>
      <RelayProvider>
        <RouterProvider router={router} />
      </RelayProvider>
    </Suspense>
  </React.StrictMode>,
)
