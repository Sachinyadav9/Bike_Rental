import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwincss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwincss()
  ],
  server:{
    port : 3000,
  },
  resolve:{
    alias :{
      "@" :path.resolve(__dirname , "./src")
    }
  }

})
