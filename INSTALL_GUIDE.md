# 🚀 INSTALLATION GUIDE
## Restaurant Menu Creator Pro - Complete Setup

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Windows, Mac, or Linux computer
- ✅ Internet connection
- ✅ Basic command line knowledge
- ✅ Gumroad account (for payments)

---

## 🔧 STEP 1: Install Node.js

### Windows:
1. Download from: https://nodejs.org/
2. Run the installer
3. Choose "Automatically install necessary tools"
4. Restart your computer

### Mac:
```bash
# Using Homebrew
brew install node
```

### Verify Installation:
```bash
node --version
npm --version
```
Should show version numbers.

---

## 📦 STEP 2: Download & Setup Project

### Option A: Download ZIP
1. Extract the ZIP file
2. Rename folder to `menu-creator-pro`
3. Place in a convenient location (e.g., `C:\Projects\menu-creator-pro`)

### Option B: Git Clone
```bash
git clone [your-repo-url] menu-creator-pro
cd menu-creator-pro
```

---

## 🎨 STEP 3: Install Upscayl (for Image Processing)

### Windows:
1. Download Upscayl CLI from: https://github.com/upscayl/upscayl/releases
2. Look for `upscayl-bin-windows.exe`
3. Create folder: `C:\upscayl-cli\`
4. Place executable there
5. Rename to: `upscayl-bin.exe`

### Mac:
```bash
brew install upscayl
```

### Linux:
```bash
# Download from releases page
# Or build from source
```

**IMPORTANT:** Note the installation path - you'll need it!

---

## 💻 STEP 4: Install Project Dependencies

Open terminal/command prompt in your project folder:

```bash
cd menu-creator-pro
npm install
```

This installs:
- `sharp` - Image processing
- `chokidar` - File watching
- `serve` - Web server
- `concurrently` - Run multiple commands

Wait for installation to complete (may take 2-5 minutes).

---

## ⚙️ STEP 5: Configure Image Processor

### Edit `image-processor.js`:

Find this line (around line 24):
```javascript
const UPSCAYL_PATH = 'C:\\upscayl-cli\\upscayl-bin.exe';
```

**Update it with YOUR Upscayl path:**

**Windows example:**
```javascript
const UPSCAYL_PATH = 'C:\\upscayl-cli\\upscayl-bin.exe';
```

**Mac example:**
```javascript
const UPSCAYL_PATH = '/usr/local/bin/upscayl';
```

**Linux example:**
```javascript
const UPSCAYL_PATH = '/home/username/upscayl/upscayl-bin';
```

💡 **How to find your path:**

**Windows:**
- Right-click `upscayl-bin.exe`
- Click "Properties"
- Copy the "Location" path
- Add `\\upscayl-bin.exe` to the end

**Mac/Linux:**
```bash
which upscayl
```

---

## 🛍️ STEP 6: Setup Gumroad

### A. Create Gumroad Account
1. Go to: https://gumroad.com/
2. Sign up (free)
3. Complete profile

### B. Create Products

#### Product 1: Single Export ($29.99)
1. Click "Create" → "Product"
2. **Name:** "Menu Creator - Single Export"
3. **Price:** $29.99
4. **Type:** Digital Product
5. **License Key:** Enable → Prefix: `MENU-SINGLE-`
6. Save & get the product URL

#### Product 2: Monthly Subscription ($49/month)
1. Create → "Membership"
2. **Name:** "Menu Creator Pro - Monthly"
3. **Price:** $49/month
4. **Billing:** Monthly
5. **License Key:** Enable → Prefix: `MENU-MONTHLY-`
6. **Trial:** Optional (7 days)
7. Save & get URL

#### Product 3: Annual Subscription ($490/year)
1. Create → "Membership"
2. **Name:** "Menu Creator Pro - Annual"
3. **Price:** $490/year
4. **Billing:** Yearly
5. **License Key:** Enable → Prefix: `MENU-ANNUAL-`
6. Save & get URL

```
https://yourusername.gumroad.com/l/menu-single
https://yourusername.gumroad.com/l/menu-monthly
https://yourusername.gumroad.com/l/menu-annual
https://yourusername.gumroad.com/l/menu-whitelabel
```

---

## 🔗 STEP 7: Update Config File

### Edit `config.js`:

Find the Gumroad section (around line 12):

```javascript
gumroad: {
    // REPLACE THESE WITH YOUR ACTUAL GUMROAD LINKS
    singleExportUrl: 'https://yourusername.gumroad.com/l/menu-single',
    monthlySubUrl: 'https://yourusername.gumroad.com/l/menu-monthly',
    annualSubUrl: 'https://yourusername.gumroad.com/l/menu-annual',
    whiteLabelUrl: 'mailto:your@email.com?subject=White-Label',
```

**Replace:**
- `yourusername` with your Gumroad username
- `/l/menu-single` with your actual product permalink
- `your@email.com` with your support email

### Optional: Customize Branding

Still in `config.js`, find line 26:

```javascript
branding: {
    appName: 'Restaurant Menu Creator Pro',  // Change this
    tagline: 'Professional Menu Design Made Easy',  // And this
    primaryColor: '#ff4081',  // Your brand color
    supportEmail: 'support@yourdomain.com'  // Your email
}
```

---

## 🧪 STEP 8: Test Installation

### Test 1: Start Web Server

```bash
npm start
```

You should see:
```
Serving!
- Local:    http://localhost:3000
```

Open browser: `http://localhost:3000`

You should see the Menu Creator interface! ✅

Press `Ctrl+C` to stop.

### Test 2: Test Image Processor

Open a SECOND terminal:

```bash
node image-processor.js
```

You should see:
```
🚀 Image Processor Started
📁 Watching: ./INPUT
⏳ Drop images into INPUT folder...
```

Test it:
1. Download a test image
2. Drop into `INPUT` folder
3. Watch the processor work

Press `Ctrl+C` to stop.

---

## 🚀 STEP 9: Production Setup

### Option A: Run Both (Recommended)

```bash
npm run dev
```

This starts:
- ✅ Web server (localhost:3000)
- ✅ Image processor (watching INPUT)

### Option B: Run Separately

**Terminal 1:**
```bash
npm start
```

**Terminal 2:**
```bash
npm run process
```

---

## 🌐 STEP 10: Deploy to Internet (Optional)

### Option A: Netlify (Free)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy
```

3. Follow prompts
4. Get your live URL!

### Option B: Vercel (Free)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts
4. Get live URL!

### Option C: GitHub Pages (Free)

1. Create GitHub repo
2. Push your code
3. Enable GitHub Pages in repo settings
4. Done!

---

## 🧪 STEP 11: Test License System

### Test Offline Mode:

1. Open app: `http://localhost:3000`
2. Try to export (should show upgrade modal)
3. Click "Activate License"
4. Enter test key: `MENU-SINGLE-TEST12345`
5. Should activate! ✅

### Test Different Tiers:

Try these test keys:
- `MENU-SINGLE-ABC123` → Single export
- `MENU-MONTHLY-XYZ789` → Monthly unlimited
- `MENU-ANNUAL-DEF456` → Annual unlimited
- `MENU-AGENCY-PRO999` → White-label

### Test Real Purchase:

1. Click "Buy" button
2. Should redirect to Gumroad
3. Make a test purchase
4. Copy license key from email
5. Paste into app
6. Should unlock features! ✅

---

## 📁 STEP 12: Understand Folder Structure

```
menu-creator-pro/
├── index.html           ← Main app file
├── config.js            ← YOUR SETTINGS (edit this!)
├── license-manager.js   ← License validation
├── app.js               ← Main app logic
├── styles.css           ← Styling
├── image-processor.js   ← Image automation
├── package.json         ← Dependencies
│
├── INPUT/               ← DROP IMAGES HERE
├── TEMP/                ← Auto processing temp files
│
└── images/
    └── backgrounds/
        ├── letter/
        │   ├── previews/    ← Watermarked (free users)
        │   ├── full/        ← Clean (paid users)
        │   └── thumbnails/  ← Small previews
        ├── half-letter/
        ├── tabloid/
        ├── trifold/
        ├── a4/
        ├── a5/
        └── digital-16x9/
```

---

## 🎨 STEP 13: Add Your First Backgrounds

### Quick Start:

1. Go to: https://perchance.org/ai-photo-generator
2. Generate a restaurant background
3. Download it
4. Drop into `INPUT` folder
5. Watch image processor work!
6. Check `images/backgrounds/` folders

The processor automatically:
- ✅ Upscales 4x with AI
- ✅ Creates 3 versions (preview, full, thumb)
- ✅ Detects aspect ratio
- ✅ Saves to correct folders
- ✅ Adds watermarks to previews

---

## 🐛 TROUBLESHOOTING

### "npm: command not found"
- Install Node.js (Step 1)
- Restart terminal

### "Upscayl not found"
- Check path in `image-processor.js`
- Verify Upscayl is installed
- Use full absolute path

### "Port 3000 already in use"
```bash
# Use different port
npx serve -p 8080
```

### Images not appearing
- Check folder structure matches exactly
- Verify image processor is running
- Check browser console for errors

### License not activating
- Check prefix matches Gumroad settings
- Verify key format is correct
- Clear browser localStorage and retry

### Gumroad links don't work
- Verify URLs in `config.js`
- Check products are published on Gumroad
- Test links in incognito browser

---

## ✅ STEP 14: You're Ready!

### Checklist:
- ✅ Node.js installed
- ✅ Project files downloaded
- ✅ Dependencies installed (`npm install`)
- ✅ Upscayl installed & configured
- ✅ Gumroad products created
- ✅ Config.js updated with your links
- ✅ Web server running (`npm start`)
- ✅ Image processor tested
- ✅ License system tested
- ✅ Background images added

### Next Steps:

1. **Generate backgrounds:** Use Perchance AI
2. **Test workflow:** Create a menu end-to-end
3. **Share link:** Send to friends for feedback
4. **Market it:** Social media, ads, communities
5. **Profit:** Start accepting payments!

---

## 💡 PRO TIPS

### Marketing:
- Post menu examples on Instagram
- Share on restaurant owner forums
- Create YouTube tutorial
- Offer early bird discount

### Support:
- Create FAQ page
- Set up email autoresponder
- Offer video call setup for white-label

### Scaling:
- Add more restaurant types
- Create template marketplace
- Build affiliate program
- Offer design services

---

## 📞 SUPPORT

If you get stuck:

1. **Re-read** this guide carefully
2. **Check** the TROUBLESHOOTING section
3. **Verify** all paths and URLs are correct
4. **Google** specific error messages
5. **Contact** me for white-label support

---

## 🎉 CONGRATULATIONS!

You now have a professional, revenue-generating menu creator!

**Estimated Setup Time:** 1-2 hours
**Potential Revenue:** $1,000-$10,000+ per month

Good luck! 🚀
