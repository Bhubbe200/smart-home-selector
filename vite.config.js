import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages, set base to the repo name!
export default defineConfig({
  plugins: [react()],
  base: '/smart-home-selector/', // <-- Must match your GitHub repo name exactly
})
