import { fileURLToPath, URL } from 'node:url'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import type { ConfigEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }: ConfigEnv) => {
  const isProd = mode === 'production'

  return {
    base: isProd ? '/tea-time-app/' : '/',
    server: {
      host: '127.0.0.1',
      port: 5173,
    },
    plugins: [
      tanstackRouter({
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
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/shared/config/tests/setup.ts',
      css: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/shared/styles" as *;\n`,
        },
      },
    },
  }
})
