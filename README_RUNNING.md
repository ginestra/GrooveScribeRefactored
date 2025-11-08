# How to Run GrooveScribe Locally

## Prerequisites

- Node.js (version 16 or higher recommended)
- npm (comes with Node.js)

## Quick Start

### Option 1: Using Vite Development Server (Recommended for Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - The server will start on `http://localhost:3000` (or the next available port)
   - The browser should open automatically
   - If not, navigate to the URL shown in the terminal

4. **Development features:**
   - Hot module replacement (changes update automatically)
   - Source maps for debugging
   - Fast refresh

### Option 2: Using a Simple HTTP Server (For Testing Current State)

Since the application currently uses the original code structure, you can also run it with a simple HTTP server:

1. **Using Python (if installed):**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Using Node.js http-server:**
   ```bash
   # Install globally (one time)
   npm install -g http-server
   
   # Run
   http-server -p 8000
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:8000`
   - Open `index.html` or `index-modern.html`

### Option 3: Using Jekyll (For GitHub Pages Compatibility)

If you're planning to deploy to GitHub Pages:

1. **Install Jekyll:**
   ```bash
   gem install bundler jekyll
   ```

2. **Create a `_config.yml` file** (if it doesn't exist):
   ```yaml
   theme: minima
   ```

3. **Run Jekyll:**
   ```bash
   bundle exec jekyll serve --watch
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:4000`

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## Current State

### What Works Now

- The original application runs with all features intact
- Modern CSS architecture is in place and can be used
- New component structure is created (but not yet fully integrated)

### What's In Progress

- The new architecture (models, services, components, controllers) is created but needs implementation details filled in
- The application currently uses the original `groove_writer.js` and `groove_utils.js` for functionality
- Modern components are placeholders that will be integrated gradually

### Migration Path

The refactoring follows a gradual migration approach:

1. **Phase 1 (Current):** Original code runs, new architecture created
2. **Phase 2 (Next):** Implement services and components, test alongside original
3. **Phase 3 (Future):** Replace original code with new architecture piece by piece
4. **Phase 4 (Final):** Remove old code, complete migration

## File Structure

```
GrooveScribe/
├── index.html              # Original HTML (currently active)
├── index-modern.html       # Modern HTML with accessibility improvements
├── src/                    # New modular architecture
│   ├── main.js            # Application entry point
│   ├── models/            # Data models
│   ├── services/          # Business logic services
│   ├── components/        # UI components
│   ├── controllers/       # Application controllers
│   └── utils/             # Utilities
├── css/                   # CSS files
│   ├── main.css          # Main CSS entry (imports all modules)
│   ├── base/             # Base styles
│   ├── components/       # Component styles
│   ├── layout/           # Layout styles
│   └── themes/           # Theme definitions
├── js/                    # Original JavaScript (still in use)
├── package.json           # npm configuration
└── vite.config.js         # Vite build configuration
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Module Errors

If you see module import errors:
- Make sure you're using `npm run dev` (not opening HTML directly)
- Check that all dependencies are installed: `npm install`
- Ensure your browser supports ES6 modules (all modern browsers do)

### CORS Errors

If you see CORS errors when opening HTML files directly:
- Use one of the HTTP server options above
- Or use `npm run dev` which handles this automatically

### MIDI Not Working

MIDI playback requires:
- A modern browser with Web Audio API support
- The MIDI.js library to be loaded (already included)
- Soundfont files to be accessible (in `soundfont/` directory)

## Development Tips

1. **Check the browser console** for any errors or warnings
2. **Use browser DevTools** to inspect the DOM and CSS
3. **Test features** using the `FEATURE_CHECKLIST.md` as a guide
4. **Gradually migrate** features from old code to new architecture
5. **Keep original code** until new implementation is fully tested

## Next Steps

1. Test all features from `FEATURE_CHECKLIST.md`
2. Implement service layer details (extract from original code)
3. Complete component implementations
4. Integrate new architecture with existing functionality
5. Test thoroughly before removing old code

## Support

For issues or questions:
- Check `IMPLEMENTATION_GUIDE.md` for detailed implementation notes
- Review `REFACTORING_STATUS.md` for current progress
- See `FEATURE_CHECKLIST.md` for feature testing

