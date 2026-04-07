# Bass Ear Training — Deploy to GitHub Pages

## What you have
```
bass-ear-training/
├── index.html      ← The full app
├── manifest.json   ← Makes it installable as a PWA
├── sw.js           ← Service worker (offline support)
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## Deploy in 10 minutes (free, no account needed to start)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up if you don't have one.
It's free. Use any email address.

### Step 2 — Create a new repository
1. Click the **+** button (top right) → **New repository**
2. Name it: `bass-ear-training`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload your files
1. On the new repo page, click **uploading an existing file**
2. Drag ALL these files into the upload area:
   - `index.html`
   - `manifest.json`
   - `sw.js`
3. Click **Commit changes**

### Step 4 — Upload the icons folder
1. Click **Add file** → **Upload files**
2. Create a folder by typing `icons/` then your filename in the file picker
   (or drag the icons folder directly — GitHub accepts folder uploads)
3. Upload both `icon-192.png` and `icon-512.png` inside the `icons/` folder
4. Click **Commit changes**

### Step 5 — Enable GitHub Pages
1. In your repo, click **Settings** (top tab)
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**, choose **Deploy from a branch**
4. Set Branch to **main**, folder to **/ (root)**
5. Click **Save**

### Step 6 — Wait 60 seconds, then visit your app
GitHub will show you a green banner with your URL:
```
https://YOUR-USERNAME.github.io/bass-ear-training/
```

That's it. Your app is live. 🎸

---

## Install on your phone

### iPhone
1. Open your URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Tap **Add**
→ It appears on your home screen like a real app

### Android
1. Open your URL in **Chrome**
2. Tap the **three-dot menu** (top right)
3. Tap **Add to Home Screen** or **Install app**
4. Tap **Install**
→ It appears on your home screen like a real app

### Computer (Chrome/Edge)
1. Open your URL
2. Look for the **install icon** in the address bar (looks like a monitor with a down arrow)
3. Click it → **Install**
→ It opens as a standalone window with no browser chrome

---

## Offline support
After your first visit, the service worker caches:
- The full app (works instantly offline)
- All piano samples after they've been loaded once
- Google Fonts (after first load)

So the app works with no internet after the first use.

---

## Update the app later
When you want to make changes:
1. Go to your GitHub repo
2. Click the file you want to edit → click the **pencil icon**
3. Make your changes
4. Click **Commit changes**

GitHub Pages updates automatically within a minute or two.

---

## Custom domain (optional, free)
If you want `basseartraining.com` instead of `github.io`:
1. Buy a domain (~$10-15/year from Namecheap or Cloudflare)
2. In GitHub Pages settings, enter your domain under **Custom domain**
3. Point your domain's DNS to GitHub's servers (GitHub shows you exactly how)
