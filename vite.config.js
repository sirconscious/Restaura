import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.csv'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Separate React libraries into a vendor chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the chunk size limit from 500 KB to 1000 KB
  },
  // base: '/Restaura/',
});
