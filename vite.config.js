import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/api': {
          target: 'https://company-onboarding-app-88b1daed0d85.herokuapp.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
});