/* eslint-env node */
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { htmlTransformPlugin } from './vite-plugin-html-transform.js';

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
  publicDir: false, // We'll copy files manually
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      },
      // Don't try to bundle legacy scripts - they'll be copied as-is
      external: []
    },
    // Don't empty dist to preserve any manually copied files
    emptyOutDir: true,
    // Copy assets as-is without processing
    assetsInlineLimit: 0
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
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'MIDI.js/**/*',
          dest: 'MIDI.js'
        },
        {
          src: 'js/**/*',
          dest: 'js'
        },
        {
          src: 'images/**/*',
          dest: 'images'
        },
        {
          src: 'soundfont/**/*',
          dest: 'soundfont'
        },
        {
          src: 'font-awesome/**/*',
          dest: 'font-awesome'
        },
        {
          src: 'css/**/*',
          dest: 'css'
        },
        {
          src: 'cordova/**/*',
          dest: 'cordova'
        },
        {
          src: '*.html',
          dest: '.',
          ignore: ['index.html'] // index.html is already processed
        },
        {
          src: '*.manifest',
          dest: '.'
        },
        {
          src: '*.txt',
          dest: '.'
        }
      ]
    }),
    htmlTransformPlugin(base)
  ]
});

