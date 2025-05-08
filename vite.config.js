import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Fareeha Nadeem Portfolio',
        short_name: 'Portfolio',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  assetsInclude: ['**/*.glb'],
  build: {
    sourcemap: false,
    // Optimize chunks and CSS processing
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    // Image optimization
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
          models: ['./src/models/Island.jsx', './src/models/Sky.jsx', './src/models/Bird.jsx', './src/models/Plane.jsx'],
        },
      },
    },
  },
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  }
})
