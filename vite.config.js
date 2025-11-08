import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: false, // No separate public dir, files are in root
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    },
    // Preserve the original file structure for compatibility
    emptyOutDir: false,
    // Copy all assets
    copyPublicDir: false
  },
  server: {
    port: 3000,
    open: true,
    // Allow serving files from root
    fs: {
      allow: ['..']
    }
  },
  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});

