/**
 * Post-build script to fix HTML paths for GitHub Pages base path
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const basePath = process.env.GITHUB_REPOSITORY 
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/';

if (basePath === '/') {
  console.log('No base path needed, skipping HTML path fix');
  process.exit(0);
}

const distDir = 'dist';
const htmlFile = join(distDir, 'index.html');

try {
  let html = readFileSync(htmlFile, 'utf-8');
  const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  
  // Fix script src paths
  html = html.replace(
    /(<script[^>]+src=["'])(\.\/)?([^"']+)(["'])/g,
    (match, start, dotSlash, path, end) => {
      if (path.startsWith('http') || path.startsWith('//') || path.startsWith(base) || path.startsWith('/assets/')) {
        return match;
      }
      const cleanPath = path.replace(/^\.\//, '');
      const newPath = cleanPath.startsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
      return `${start}${newPath}${end}`;
    }
  );
  
  // Fix link href paths
  html = html.replace(
    /(<link[^>]+href=["'])(\.\/)?([^"']+)(["'])/g,
    (match, start, dotSlash, path, end) => {
      if (path.startsWith('http') || path.startsWith('//') || path.startsWith(base) || path.startsWith('/assets/')) {
        return match;
      }
      const cleanPath = path.replace(/^\.\//, '');
      const newPath = cleanPath.startsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
      return `${start}${newPath}${end}`;
    }
  );
  
  // Fix img src paths
  html = html.replace(
    /(<img[^>]+src=["'])(\.\/)?([^"']+)(["'])/g,
    (match, start, dotSlash, path, end) => {
      if (path.startsWith('http') || path.startsWith('//') || path.startsWith(base) || path.startsWith('/assets/')) {
        return match;
      }
      const cleanPath = path.replace(/^\.\//, '');
      const newPath = cleanPath.startsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
      return `${start}${newPath}${end}`;
    }
  );
  
  writeFileSync(htmlFile, html, 'utf-8');
  console.log(`Fixed HTML paths with base path: ${basePath}`);
} catch (error) {
  console.error('Error fixing HTML paths:', error);
  process.exit(1);
}

