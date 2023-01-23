// vite.config.js
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

// vite.config.js
export default {
  base: './',
  // config options
  build: {
    outDir: 'docs'
  },
  plugins : [mkcert()],
  server: {https:true}
}