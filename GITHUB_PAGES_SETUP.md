# GitHub Pages Deployment Setup

This guide will help you set up automatic deployment to GitHub Pages for GrooveScribe.

## Prerequisites

- A GitHub repository (already created or will create)
- GitHub Actions enabled (enabled by default)

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Click **Save**

### 2. Repository Configuration

The deployment workflow is already configured in `.github/workflows/deploy.yml`. It will:
- Build the application when you push to `main` or `master` branch
- Deploy to GitHub Pages automatically

### 3. Base Path Configuration

**Important**: If your repository name is NOT `GrooveScribe`, you need to update the base path:

#### Option A: Repository name is `GrooveScribe` (or deploying to root domain)
No changes needed - the workflow will automatically detect the repository name.

#### Option B: Repository name is different (e.g., `groove-scribe-refactored`)
Update `vite.config.js` to set the correct base path:

```javascript
const base = '/your-repository-name/';
```

Or set it in the GitHub Actions workflow environment variables.

### 4. Deploy

The deployment happens automatically when you:

1. **Push to main/master branch:**
   ```bash
   git push origin main
   ```

2. **Or manually trigger:**
   - Go to **Actions** tab in GitHub
   - Select **Deploy to GitHub Pages** workflow
   - Click **Run workflow**

### 5. Access Your Site

After deployment (usually takes 1-2 minutes), your site will be available at:

- **If repository name is `GrooveScribe`**: `https://yourusername.github.io/GrooveScribe/`
- **If repository name is different**: `https://yourusername.github.io/your-repo-name/`

## Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) does the following:

1. **Triggers**: On push to `main`/`master` or manual trigger
2. **Builds**: Runs `npm ci` and `npm run build`
3. **Deploys**: Uploads the `dist` folder to GitHub Pages

## Troubleshooting

### Build Fails

- Check the **Actions** tab for error messages
- Ensure `package.json` has all required dependencies
- Verify Node.js version (workflow uses Node 18)

### Site Not Loading

- Check if GitHub Pages is enabled in Settings
- Verify the base path in `vite.config.js` matches your repository name
- Wait a few minutes after deployment (can take up to 10 minutes)

### Assets Not Loading

- Ensure all assets (images, fonts, etc.) are in the repository
- Check that paths in HTML/CSS use relative paths or the correct base path
- Verify the `base` setting in `vite.config.js`

### Custom Domain

If you want to use a custom domain:

1. Add a `CNAME` file in the repository root with your domain
2. Configure DNS settings as per GitHub Pages documentation
3. The workflow will automatically handle the deployment

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The dist folder contains the built files
# You can manually upload these to GitHub Pages
# Or use gh-pages package:
npm install --save-dev gh-pages
# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"
```

## Environment Variables

The workflow automatically detects:
- `GITHUB_REPOSITORY` - Your repository name
- Sets the base path accordingly

## Updating the Site

Every time you push to the `main` branch, the site will automatically rebuild and redeploy. You can monitor the deployment in the **Actions** tab.

## Notes

- The first deployment may take longer (2-5 minutes)
- Subsequent deployments are usually faster (1-2 minutes)
- GitHub Pages has a build timeout of 10 minutes
- Free GitHub accounts get 2,000 build minutes per month

