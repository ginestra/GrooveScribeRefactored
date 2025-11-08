# GitHub Pages Deployment Checklist

## Pre-Deployment

- [ ] Repository is created on GitHub
- [ ] All code is committed and pushed
- [ ] GitHub Pages is enabled in repository Settings → Pages
- [ ] Source is set to "GitHub Actions" (not "Deploy from a branch")

## First Deployment

1. **Enable GitHub Pages:**
   - Go to repository → Settings → Pages
   - Source: Select "GitHub Actions"
   - Save

2. **Push to trigger deployment:**
   ```bash
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to repository → Actions tab
   - Watch the "Deploy to GitHub Pages" workflow
   - Wait for it to complete (usually 1-2 minutes)

4. **Verify deployment:**
   - Check the Actions tab for green checkmark
   - Visit your GitHub Pages URL
   - Test all functionality

## Repository Name Considerations

### If repository name is `GrooveScribe`:
- URL will be: `https://yourusername.github.io/GrooveScribe/`
- Base path is automatically set to `/GrooveScribe/`
- No additional configuration needed

### If repository name is different:
- Update `vite.config.js` base path if needed
- Or the workflow will auto-detect from `GITHUB_REPOSITORY` env var

### If deploying to user/organization root (yourusername.github.io):
- Repository must be named `yourusername.github.io`
- Base path will be `/` (root)
- No subdirectory in URL

## Post-Deployment

- [ ] Site loads correctly
- [ ] All assets (images, fonts) load
- [ ] JavaScript works (check browser console)
- [ ] MIDI playback works
- [ ] Sheet music renders correctly
- [ ] All features from FEATURE_CHECKLIST.md work

## Troubleshooting

### Build fails:
- Check Actions tab for error details
- Verify `package.json` dependencies
- Check Node.js version compatibility

### Site shows 404:
- Verify GitHub Pages is enabled
- Check repository name matches base path
- Wait a few minutes (deployment can take time)

### Assets not loading:
- Check browser console for 404 errors
- Verify base path in `vite.config.js`
- Ensure all files are in repository

### JavaScript errors:
- Check browser console
- Verify ES6 modules are supported
- Check that all dependencies are included

## Manual Deployment (if needed)

If automatic deployment doesn't work:

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## Updating the Site

- Every push to `main` branch triggers automatic deployment
- Monitor in Actions tab
- Usually takes 1-2 minutes

## Custom Domain (Optional)

1. Add `CNAME` file to repository root:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   - Add CNAME record pointing to `yourusername.github.io`
   - Or A records pointing to GitHub IPs

3. Enable in GitHub Pages settings

