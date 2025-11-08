/**
 * Vite plugin to transform HTML and fix script paths for base path
 */
export function htmlTransformPlugin(basePath) {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      // If we have a base path, we need to ensure script and link tags use it
      if (basePath && basePath !== '/') {
        const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
        
        // Fix script src paths - handle both ./path and path (no ./)
        html = html.replace(
          /(<script[^>]+src=["'])(\.\/)?([^"']+)(["'])/g,
          (match, start, dotSlash, path, end) => {
            // Don't modify if it's already absolute, has protocol, or has base path
            if (path.startsWith('http') || path.startsWith('//') || path.startsWith(base) || path.startsWith('/assets/')) {
              return match;
            }
            // Add base path - remove leading ./ if present
            const cleanPath = path.replace(/^\.\//, '');
            const newPath = cleanPath.startsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
            return `${start}${newPath}${end}`;
          }
        );
        
        // Fix link href paths for CSS and other assets
        html = html.replace(
          /(<link[^>]+href=["'])(\.\/)?([^"']+)(["'])/g,
          (match, start, dotSlash, path, end) => {
            // Don't modify external URLs or Vite-processed assets
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
      }
      
      return html;
    }
  };
}
