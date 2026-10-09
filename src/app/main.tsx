import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouterProvider } from '@/app/router/RouterProvider'
import './styles/globals.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouterProvider />
  </StrictMode>,
)
