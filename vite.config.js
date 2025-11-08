import { defineConfig } from 'vite';

// GitHub Pages deployment base path
// If deploying to a subdirectory, set this to '/repository-name/'
// For root domain, use '/'
// The workflow automatically sets GITHUB_REPOSITORY, which we use to determine the base path
const getBasePath = () => {
  if (process.env.GITHUB_PAGES === 'true' && process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    // Only add base path if not deploying to root (user.github.io)
    // For project pages (user.github.io/repo-name), add the repo name
    return repoName && !repoName.includes('.github.io') ? `/${repoName}/` : '/';
  }
  return '/';
};

const base = getBasePath();

export default defineConfig({
  base: base,
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

