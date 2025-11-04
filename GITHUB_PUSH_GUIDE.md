# GitHub Push Guide

## Steps to Push Your Website to GitHub

### 1. Add All Files to Git
```bash
git add .
```

### 2. Commit Your Changes
```bash
git commit -m "Add luxury portfolio website with CV viewer"
```

### 3. If you already have a GitHub repository:
```bash
# Add your remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. If you need to create a NEW repository:
1. Go to https://github.com/new
2. Create a new repository (e.g., "personal-website" or "portfolio")
3. **DON'T** initialize with README, .gitignore, or license
4. Copy the repository URL
5. Run these commands (replace with your actual URL):
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### 5. For GitHub Pages (to host your website):
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **main** branch and **/ (root)** folder
4. Click **Save**
5. Your site will be live at: `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`

### Important Notes:
- Make sure your CV file (`Cv_AkramAbdelmaksoud_2025.pdf`) is in the root directory
- All image files should be in the `img/` folder
- The website will work with GitHub Pages hosting

### Troubleshooting:
If you get authentication errors, you may need to:
- Use GitHub Personal Access Token instead of password
- Or set up SSH keys for authentication

