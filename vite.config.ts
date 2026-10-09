import { defineConfig, type ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import svgr from 'vite-plugin-svgr'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig(({ mode }: ConfigEnv) => {
  const isProd = mode === 'production'

  return {
    base: isProd ? '/tea-time-app/' : '/',
    plugins: [
      TanStackRouterVite({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './src/app/router/routes',
        generatedRouteTree: './src/app/router/routeTree.gen.ts',
      }),
      react(),
      svgr(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
