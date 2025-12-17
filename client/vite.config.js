import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // env load karo
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      // proxy: {
      //   '/api': {
      //     target: "https://karzone-z9pw.onrender.com",
      //     changeOrigin: true,
      //     secure: false,
      //   },
      // },
    },
  }
})
