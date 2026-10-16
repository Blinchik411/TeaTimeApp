import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { AppRouterProvider } from '@/app/router/RouterProvider'

import './styles/globals.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient
  }
}

if (import.meta.env.DEV) {
  window.__TANSTACK_QUERY_CLIENT__ = queryClient
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppRouterProvider queryClient={queryClient} />
    </QueryClientProvider>
  </StrictMode>,
)
