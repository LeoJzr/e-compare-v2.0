import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  //const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
    ],
  }
})
