import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { ErrorCard } from '@/shared/ui/error-card'

export interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: () => (
    <ErrorCard
      icon="🍵"
      title="Page Not Found"
      message="The page you are looking for doesn't exist or has been moved."
      showHome
      homeText="Back to Home"
    />
  ),
  errorComponent: ({ error, reset }) => (
    <ErrorCard
      icon="⚠️"
      title="Something Went Wrong"
      message={error.message || 'An unexpected error occurred.'}
      onRetry={reset}
      retryText="Try Again"
      showHome
      homeText="Back to Home"
    />
  ),
})

function RootComponent() {
  return (
    <div className="app-layout">
      <Outlet />
    </div>
  )
}
