import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Enable SPA fallback for development
    historyApiFallback: true,
  },
  preview: {
    // Enable SPA fallback for preview mode
    historyApiFallback: true,
  },
})
