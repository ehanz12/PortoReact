import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', '@gsap/react'],
          lenis: ['lenis'],
          three: ['three'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})
