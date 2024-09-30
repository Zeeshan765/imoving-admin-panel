import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.REACT_APP_BASE_URL': JSON.stringify(env.REACT_APP_BASE_URL),
      'process.env.REACT_APP_URL_PORT': JSON.stringify(env.REACT_APP_URL_PORT),
      global: 'window',

    },
    plugins: [react()],
  }

})