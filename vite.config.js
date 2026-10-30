import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  // The prerender bundle (dist-ssr) only needs code, not a second copy of public/.
  build: isSsrBuild ? { copyPublicDir: false } : {},
}))
