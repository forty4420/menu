# 🚀 QUICK START GUIDE (Windows)

## Super Fast Setup (5 Minutes!)

### Step 1: Download All Files
Download all files from this folder and put them in one directory on your computer.

Example: `C:\Projects\menu-creator-pro\`

### Step 2: Run SETUP.bat
1. **Right-click** `SETUP.bat`
2. Click **"Run as administrator"** (or just double-click)
3. Press any key to continue
4. Wait 2-5 minutes for installation

**What it does:**
- ✅ Creates all folders (INPUT, TEMP, images, etc.)
- ✅ Installs dependencies (`npm install`)
- ✅ Verifies Node.js is working

### Step 3: Configure Your Settings

**Edit config.js:**
1. Open `config.js` in Notepad
2. Find line 12 (Gumroad section)
3. Add YOUR Gumroad product URLs
4. Save the file

**Edit image-processor.js:**
1. Open `image-processor.js` in Notepad
2. Find line 24
3. Update Upscayl path (if you have it installed)
4. Save the file

### Step 4: Start the App
1. Double-click **`START.bat`**
2. Wait for "Serving!" message
3. Open browser: **http://localhost:3000**
4. Start creating menus! 🎉

---

## What Each File Does

### Batch Files:
- **SETUP.bat** - One-time installation (run first!)
- **START.bat** - Start the app (run every time you want to use it)

### Configuration Files:
- **config.js** - YOUR settings (Gumroad URLs, branding)
- **image-processor.js** - Image automation settings

### Core Application:
- **index.html** - Main app
- **app.js** - Application logic
- **styles.css** - Styling
- **license-manager.js** - Payment system
- **package.json** - Dependencies list

### Documentation:
- **COMPLETE_INSTALL_GUIDE.md** - Full detailed instructions
- **README.md** - Project overview
- **QUICK_REFERENCE.md** - Commands & tips

---

## Troubleshooting

### "Node.js not found"
- Install Node.js from: https://nodejs.org/
- Restart computer
- Run SETUP.bat again

### "npm install failed"
- Check internet connection
- Run Command Prompt as Administrator
- Run SETUP.bat again

### Nothing happens when I run START.bat
- Make sure SETUP.bat completed successfully
- Check if Node.js is installed: `node --version`
- Look for error messages in the console

### Port 3000 already in use
- Close any other programs using port 3000
- Or edit package.json and change port to 8080

---

## Next Steps After Setup

### 1. Setup Gumroad (30 minutes)
Follow COMPLETE_INSTALL_GUIDE.md Step 6:
- Create 3 products (Single, Monthly, Annual)
- Get your product URLs
- Add them to config.js

### 2. Install Upscayl (Optional - for image processing)
- Download: https://github.com/upscayl/upscayl/releases
- Install to: `C:\Program Files\Upscayl\`
- Update path in image-processor.js

### 3. Add Backgrounds
- Generate images at: https://perchance.org/ai-photo-generator
- Drop them in the `INPUT` folder
- Image processor will auto-create all versions

### 4. Test Everything
- Create a test menu
- Try activating license: `MENU-SINGLE-TEST123`
- Make a real Gumroad purchase
- Test the license key you receive

---

## Daily Usage

**Every time you want to use the app:**

1. Double-click **START.bat**
2. Open browser: http://localhost:3000
3. Create menus!
4. Press Ctrl+C in the terminal when done

That's it! 🎉

---

## Getting Help

1. Check **COMPLETE_INSTALL_GUIDE.md** (most issues covered)
2. Check **QUICK_REFERENCE.md** (common commands)
3. Press F12 in browser to see console errors
4. Google any error messages

---

## File Structure After Setup

```
menu-creator-pro/
├── SETUP.bat          ← Run this FIRST
├── START.bat          ← Run this EVERY TIME
├── config.js          ← EDIT: Add your Gumroad URLs
├── image-processor.js ← EDIT: Add Upscayl path
├── index.html
├── app.js
├── styles.css
├── license-manager.js
├── package.json
├── INPUT/             ← Drop images here
├── TEMP/              ← Auto processing
├── node_modules/      ← Created by SETUP.bat
└── images/
    └── backgrounds/   ← Processed images appear here
```

---

**Ready to make money!** 💰

Start with **SETUP.bat**, then read **COMPLETE_INSTALL_GUIDE.md** for full details.
