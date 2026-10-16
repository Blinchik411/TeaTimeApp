import type { QueryClient } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  scrollRestoration: true,
  context: {
    queryClient: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

interface AppRouterProviderProps {
  queryClient: QueryClient
}

export const AppRouterProvider = ({ queryClient }: AppRouterProviderProps) => {
  return <RouterProvider router={router} context={{ queryClient }} />
}
