import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Bhoomika_K_S/',
  build: {
    outDir: 'dist'
  }
});


