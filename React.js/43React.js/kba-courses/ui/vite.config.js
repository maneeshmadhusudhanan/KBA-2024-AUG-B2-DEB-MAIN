import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000, //set the server to 3000 port
    Proxy:{"/api":{
      target:"http://localhost:5000", //set the proxy to 5000 port
      changeOrigin:true,
      rewrite: (path)=> path.replace(/^\/api/,""),

    }
  }
  },
})
