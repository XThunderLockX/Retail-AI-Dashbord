# 🚀 Deployment Instructions for Your Team

## Current Status
✅ **Application is fully functional and ready for deployment**

## Option 1: Quick GitHub Pages + Glitch Deployment (Easiest)

### Step 1: Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/retail-ai-dashboard.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Glitch (Free)
1. Go to https://glitch.com/
2. Click "New Project" → "Import from GitHub"
3. Enter your repository URL
4. Glitch will automatically deploy the backend
5. Your backend URL will be: `https://your-project-name.glitch.me`

### Step 3: Deploy Frontend to GitHub Pages
1. In your GitHub repo, go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: main, folder: /frontend
4. Save
5. Your frontend will be available at: `https://YOUR_USERNAME.github.io/retail-ai-dashboard/`

### Step 4: Update Frontend API URL
In `frontend/src/config/api.ts`, update the production URL:
```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-project-name.glitch.me'  // Your Glitch URL
    : '');
```

## Option 2: Vercel + Render (More Professional)

### Deploy Backend to Render (Free)
1. Go to https://render.com/
2. Click "New" → "Web Service"
3. Connect GitHub → Select your repository
4. Configure:
   - Root Directory: backend
   - Runtime: Node 18
   - Build Command: npm install
   - Start Command: npm start
5. Your backend URL: `https://your-app-name.onrender.com`

### Deploy Frontend to Vercel
1. Go to https://vercel.com/
2. Click "New Project" → "Import Git Repository"
3. Select your repository
4. Vercel will detect it's a React app and deploy it
5. Your frontend URL: `https://your-app-name.vercel.app`

## Option 3: Netlify + Render (Alternative)

### Backend on Render
- Go to https://render.com/
- New → Web Service → Connect GitHub repo
- Select backend folder as root directory
- Build Command: `npm install`
- Start Command: `npm start`

### Frontend on Netlify
- Go to https://netlify.com/
- Add new site → Import an existing project
- Connect to GitHub
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/build`

## 🎯 Recommended: Option 1 (Glitch + GitHub Pages)

**Why?**
- Completely free
- No credit card required
- Easiest setup
- Perfect for team demos

## 📱 Final URLs to Share with Your Team

Once deployed, you'll have:
- **Frontend URL**: `https://YOUR_USERNAME.github.io/retail-ai-dashboard/`
- **Backend API**: `https://your-project-name.glitch.me/api/health`

## 🔧 Environment Variables Needed

For production deployment, set:
- `REACT_APP_API_URL`: Your backend URL
- `NODE_ENV`: `production`

## 🚀 Quick Test Commands

After deployment:
```bash
# Test backend
curl https://your-backend-url/api/health

# Test frontend
curl https://your-frontend-url
```

---

**Choose Option 1 for fastest deployment, or Option 2 for more professional setup!**