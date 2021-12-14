import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: '3002'
  },
  preview: {
    host: true,
  },
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'chrome 61']
    }),
  ]
})
