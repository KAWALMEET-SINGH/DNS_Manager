import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({

  server:{
    port:3000,
    proxy:{
      '/api':{
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
    },
  },
  plugins: [react()],
})
