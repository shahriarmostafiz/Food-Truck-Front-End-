import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import MainRouter from './Router/MainRouter.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async';

import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={MainRouter}></RouterProvider>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
