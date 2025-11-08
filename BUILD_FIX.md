# Build Fix for GitHub Pages Deployment

## Issue
404 errors for all static assets (MIDI.js, js files, etc.) when deployed to GitHub Pages.

## Root Cause
Vite was building the HTML but not copying the static assets (MIDI.js, js/, images/, etc.) to the dist folder.

## Solution Applied

1. ✅ Installed `vite-plugin-static-copy` plugin
2. ✅ Configured Vite to copy all static assets:
   - MIDI.js/
   - js/
   - images/
   - soundfont/
   - font-awesome/
   - css/
   - cordova/
   - Other HTML files
   - Manifest and text files

3. ✅ Updated vite.config.js to use the static copy plugin

## Verification

After building, verify all assets are copied:

```bash
npm run build
ls -la dist/
# Should see: MIDI.js, js, images, soundfont, font-awesome, css, etc.
```

## Next Steps

1. **Commit the changes:**
   ```bash
   git add vite.config.js package.json package-lock.json
   git commit -m "Fix: Copy static assets in build for GitHub Pages"
   git push origin main
   ```

2. **Monitor deployment:**
   - Go to repository → Actions tab
   - Watch the build complete
   - Check that all 300+ items are copied

3. **Test the deployed site:**
   - All JavaScript files should load
   - MIDI.js should work
   - Images should display
   - No 404 errors in console

## Build Output

The build now shows:
```
[vite-plugin-static-copy] Copied 300 items.
✓ built in 244ms
```

This confirms all static assets are being copied to the dist folder.

## Note on Warnings

The warnings about scripts "can't be bundled without type='module'" are expected. These are legacy scripts that need to be loaded as separate files, not bundled. They will be copied as-is and work correctly.

