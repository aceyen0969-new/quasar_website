import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react()],
    server: {
      host: '127.0.0.1',
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8765',
          changeOrigin: false,
          configure(proxy) {
            proxy.on('proxyReq', (proxyReq) => {
              if (env.QUASAR_DASHBOARD_TOKEN) {
                proxyReq.setHeader(
                  'Authorization',
                  `Bearer ${env.QUASAR_DASHBOARD_TOKEN}`,
                )
              }
            })
          },
        },
      },
    },
  }
})
