# Deployment Workflow: Bolt.new via GitHub Sync

This guide documents the workflow for deploying and sharing prototypes using Bolt.new's native GitHub sync feature. Use this reference for future projects to ensure seamless deployment without debugging path issues.

## 🎯 Goal
Quickly deploy a local prototype (from Cursor/VS Code) to a shareable, live URL on Bolt.new while maintaining a synced development workflow.

## 🔑 Key Requirement: Flat Project Structure
**CRITICAL:** Bolt.new and StackBlitz work best when the project root contains the configuration files.

- **✅ DO:** Place `package.json`, `index.html`, and `vite.config.js` in the **root** of the repository.
- **❌ AVOID:** Nesting the app inside a subdirectory (e.g., `repo-name/my-app/package.json`) unless you want to manually configure startup commands every time.

### Ideal Structure
```
my-repo/
├── package.json      <-- MUST be at root
├── index.html        <-- MUST be at root
├── vite.config.js    <-- MUST be at root
├── src/
│   ├── App.jsx
│   └── ...
├── public/
└── README.md
```

## 🚀 Workflow Steps

### 1. Prepare Local Project
1. **Initialize Git:** `git init`
2. **Create `.gitignore`:** Ensure `node_modules`, `dist`, `.env` are excluded.
3. **Verify Scripts:** Ensure `package.json` has standard scripts:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview"
   }
   ```
4. **Push to GitHub:** Create a public or private repo and push your code.

### 2. Connect to Bolt.new
1. Log into [bolt.new](https://bolt.new).
2. Click the **GitHub icon** to authorize access (one-time setup).
3. Open your project by navigating to:
   `https://bolt.new/github/[username]/[repo-name]`
   *(Example: `https://bolt.new/github/78Fieo/realtime-notifications`)*

### 3. Deploy & Share
1. Bolt.new will auto-detect the project type (Vite/Next.js/etc.), install dependencies, and start the dev server.
2. Once the preview loads, click the **"Publish"** button in the top right.
3. Copy the generated URL to share with stakeholders.

### 4. Continuous Iteration
- **Edit in Cursor:** Make changes locally -> Commit -> Push to `main`.
- **Sync in Bolt:**
  - Refresh the Bolt.new tab.
  - Or click the "Sync" button if prompted.
  - The WebContainer will rebuild the app with your latest changes.

## 🛠 Troubleshooting

**Issue:** "ENOENT: no such file or directory, open '/home/project/package.json'"
- **Cause:** Your `package.json` is nested in a subdirectory (e.g., `frontend/package.json`).
- **Fix:** Move all app files to the root directory:
  ```bash
  git mv frontend/* .
  git mv frontend/.* .  # Don't forget hidden files like .gitignore
  rmdir frontend
  git commit -m "Flatten structure for Bolt"
  git push
  ```

**Issue:** Dev server doesn't start
- **Fix:** Check the terminal in Bolt.new. You may need to run `npm install` manually if the auto-start failed, or verify your `dev` script in `package.json`.



