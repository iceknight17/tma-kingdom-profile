import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    outDir: './docs',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.indexOf('node_modules') !== -1) {
            return 'vendor';
          }
        },
      },
    }
  },
  base: './'
})
