# 🚀 COMPLETE INSTALLATION GUIDE
## Restaurant Menu Creator Pro - Step-by-Step Setup

**Estimated Time:** 1-2 hours  
**Difficulty:** Beginner-Friendly  
**Result:** Live, revenue-generating menu creator!

---

## 📋 WHAT YOU'LL NEED

Before starting:
- ✅ Computer (Windows, Mac, or Linux)
- ✅ Internet connection
- ✅ Gumroad account (free to create)
- ✅ 1-2 hours of time
- ✅ Basic ability to follow instructions

**No coding experience required!** Just follow each step carefully.

---

## 🎯 WHAT YOU'RE BUILDING

By the end of this guide, you'll have:
1. ✅ A professional menu creator app
2. ✅ Running on your computer (localhost)
3. ✅ Accepting payments via Gumroad
4. ✅ 3 pricing tiers ($29.99, $49/mo, $490/yr)
5. ✅ Ready to deploy online (optional)

---

## 📦 STEP 1: INSTALL NODE.JS (15 minutes)

Node.js lets you run the image processor and web server.

### Windows:

1. Go to: **https://nodejs.org/**
2. Click the big green **"Download"** button (LTS version)
3. Run the downloaded installer
4. Click **"Next"** through everything
5. ✅ Check **"Automatically install necessary tools"**
6. Click **"Install"**
7. Wait 5-10 minutes
8. **Restart your computer**

### Mac:

**Option A - Installer:**
1. Go to: **https://nodejs.org/**
2. Download macOS installer
3. Run and follow prompts

**Option B - Homebrew:**
```bash
brew install node
```

### Linux:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

### ✅ Verify Installation:

Open Terminal/Command Prompt and type:

```bash
node --version
```

Should show: `v20.x.x` (or similar)

```bash
npm --version
```

Should show: `10.x.x` (or similar)

**✅ If you see version numbers, Node.js is installed!**

---

## 📁 STEP 2: DOWNLOAD & EXTRACT PROJECT (5 minutes)

1. **Download** the `menu-creator-pro` folder
2. **Extract** to a location you'll remember
   - Windows: `C:\Projects\menu-creator-pro`
   - Mac: `~/Projects/menu-creator-pro`
   - Linux: `~/projects/menu-creator-pro`

3. **Open** the folder and verify you see:
   - `index.html`
   - `app.js`
   - `config.js`
   - `package.json`
   - `INPUT/` folder
   - `images/` folder

**✅ If you see these files, you're ready!**

---

## 🎨 STEP 3: INSTALL UPSCAYL (20 minutes)

Upscayl is AI software that makes small images larger and higher quality.

### Windows:

1. Go to: **https://github.com/upscayl/upscayl/releases**
2. Scroll to **"Assets"**
3. Download: `upscayl-X.X.X-win.exe` (latest version)
4. **Run the installer**
5. Install to: `C:\Program Files\Upscayl\`
6. Complete installation

**Important:** Note where it installed (usually `C:\Program Files\Upscayl\upscayl.exe`)

### Mac:

1. Go to: **https://github.com/upscayl/upscayl/releases**
2. Download: `upscayl-X.X.X-mac.dmg`
3. Open DMG and drag to Applications
4. First time: Right-click → Open (to bypass security)

**Location:** `/Applications/Upscayl.app/Contents/MacOS/upscayl`

### Linux:

1. Download AppImage from releases
2. Make executable:
```bash
chmod +x upscayl-*.AppImage
```
3. Move to `/usr/local/bin/` or note location

### ✅ Find Your Upscayl Path:

**Windows:**
- Open File Explorer
- Navigate to where you installed it
- Right-click `upscayl.exe` → Properties
- Copy the **"Location"** path
- Your full path: `C:\Program Files\Upscayl\upscayl.exe`

**Mac:**
```bash
which upscayl
```

**Linux:**
```bash
which upscayl
# or
whereis upscayl
```

**✅ Write down this path - you'll need it soon!**

---

## 💻 STEP 4: INSTALL PROJECT DEPENDENCIES (10 minutes)

### Open Terminal in Your Project Folder:

**Windows:**
1. Open File Explorer
2. Navigate to `C:\Projects\menu-creator-pro`
3. Click in the address bar
4. Type: `cmd`
5. Press Enter

**Mac:**
1. Open Terminal
2. Type: `cd ` (with space)
3. Drag your project folder into Terminal
4. Press Enter

**Linux:**
```bash
cd ~/projects/menu-creator-pro
```

### Install Dependencies:

Type this command:

```bash
npm install
```

You'll see lots of text scrolling. **This is normal!**

Wait 2-5 minutes. When it finishes, you should see:

```
added 234 packages
```

**✅ If you see "added X packages", installation worked!**

### Common Issues:

**"npm: command not found"**
- Node.js not installed correctly
- Restart terminal
- Restart computer
- Re-install Node.js

**"Permission denied"**
- Windows: Run Command Prompt as Administrator
- Mac/Linux: Use `sudo npm install`

---

## ⚙️ STEP 5: CONFIGURE UPSCAYL PATH (5 minutes)

Now tell the app where Upscayl is installed.

### Edit image-processor.js:

1. Open the file: `image-processor.js`
2. Find **line 24** (near the top)
3. You'll see:
```javascript
const UPSCAYL_PATH = 'C:\\upscayl-cli\\upscayl-bin.exe';
```

4. **Replace** with YOUR path from Step 3

### Examples:

**Windows:**
```javascript
const UPSCAYL_PATH = 'C:\\Program Files\\Upscayl\\upscayl.exe';
```
*Note the double backslashes `\\`*

**Mac:**
```javascript
const UPSCAYL_PATH = '/Applications/Upscayl.app/Contents/MacOS/upscayl';
```

**Linux:**
```javascript
const UPSCAYL_PATH = '/usr/local/bin/upscayl';
```

5. **Save** the file

**✅ Upscayl is now configured!**

---

## 🛍️ STEP 6: SETUP GUMROAD (25 minutes)

Gumroad handles payments for you.

### A. Create Gumroad Account

1. Go to: **https://gumroad.com/**
2. Click **"Start Selling"**
3. Sign up with email
4. Verify your email
5. Complete your profile:
   - Name
   - Profile URL (e.g., `yourusername.gumroad.com`)
   - Bio (optional)

### B. Create Product 1: Single Export ($29.99)

1. Click **"Products"** → **"New Product"**
2. Fill out:

```
Product Name: Menu Creator - Single Export
Price: $29.99
Product Type: Digital Product
Description: 
"Create one professional, print-ready restaurant menu. 
High-resolution export, all templates included."

License Key: ✅ ENABLE
License Key Prefix: MENU-SINGLE-
```

3. Under **"Content"**: Don't upload anything (we deliver via the app)
4. Click **"Publish"**
5. **Copy the product URL**: `https://yourusername.gumroad.com/l/menu-single`

### C. Create Product 2: Pro Monthly ($49/month)

1. Click **"Products"** → **"New Product"**
2. Fill out:

```
Product Name: Menu Creator Pro - Monthly
Price: $49
Product Type: Membership
Billing: Monthly
Description:
"Unlimited professional menu creation. All templates, 
high-res exports, cancel anytime."

License Key: ✅ ENABLE
License Key Prefix: MENU-MONTHLY-
Free Trial: (Optional) 7 days
```

3. Click **"Publish"**
4. **Copy the URL**: `https://yourusername.gumroad.com/l/menu-monthly`

### D. Create Product 3: Pro Annual ($490/year)

1. Click **"Products"** → **"New Product"**
2. Fill out:

```
Product Name: Menu Creator Pro - Annual
Price: $490
Product Type: Membership
Billing: Yearly
Description:
"Save $98/year! Unlimited menus, all features. 
Only $40.83/month when billed annually."

License Key: ✅ ENABLE
License Key Prefix: MENU-ANNUAL-
```

3. Click **"Publish"**
4. **Copy the URL**: `https://yourusername.gumroad.com/l/menu-annual`

### ✅ You should now have 3 products with 3 URLs!

---

## 🔧 STEP 7: UPDATE CONFIG FILE (10 minutes)

Tell the app about YOUR Gumroad products.

### Edit config.js:

1. Open the file: `config.js`
2. Find **line 12** (Gumroad section)

**You'll see this:**
```javascript
gumroad: {
    singleExportUrl: 'https://yourusername.gumroad.com/l/menu-single',
    monthlySubUrl: 'https://yourusername.gumroad.com/l/menu-monthly',
    annualSubUrl: 'https://yourusername.gumroad.com/l/menu-annual',
```

**Replace with YOUR URLs:**
```javascript
gumroad: {
    singleExportUrl: 'https://YOURUSERNAME.gumroad.com/l/YOUR-SINGLE',
    monthlySubUrl: 'https://YOURUSERNAME.gumroad.com/l/YOUR-MONTHLY',
    annualSubUrl: 'https://YOURUSERNAME.gumroad.com/l/YOUR-ANNUAL',
```

### Update Your Branding (Optional):

Find **line 26**:

```javascript
branding: {
    appName: 'Restaurant Menu Creator Pro',  // Change this
    tagline: 'Professional Menu Design Made Easy',  // Change this
    primaryColor: '#ff4081',  // Your brand color
    supportEmail: 'support@yourdomain.com'  // Your email
}
```

**Customize to your liking!**

**Save the file**

**✅ Your app is now connected to Gumroad!**

---

## 🧪 STEP 8: TEST LOCALLY (15 minutes)

Time to see if everything works!

### Start the Web Server:

In your terminal (still in project folder):

```bash
npm start
```

You should see:
```
Serving!
- Local:    http://localhost:3000
- Network:  http://192.168.x.x:3000
```

### Open in Browser:

1. Open Chrome, Firefox, or Safari
2. Go to: **http://localhost:3000**
3. You should see the Menu Creator! 🎉

### Test the App:

1. Click through format selection
2. Choose restaurant style
3. Select background
4. Try adding text
5. Click **"EXPORT"**

**It should show the pricing modal!** ✅

### Test License Activation:

1. Click **"Activate License"**
2. Enter: `MENU-SINGLE-TEST123`
3. Click **"Activate"**
4. Should say "License activated successfully!"
5. Try exporting - should work now!

### Test Other Tiers:

- `MENU-MONTHLY-TEST456` → Monthly unlimited
- `MENU-ANNUAL-TEST789` → Annual unlimited

**✅ If everything works, you're almost done!**

### Stop the Server:

Press `Ctrl+C` in the terminal

---

## 🖼️ STEP 9: TEST IMAGE PROCESSOR (15 minutes)

### Start the Image Processor:

Open a **SECOND** terminal window (keep server running in first):

```bash
node image-processor.js
```

You should see:
```
🚀 Image Processor Started
📁 Watching: ./INPUT
⏳ Drop images into INPUT folder...
```

### Test with an Image:

1. Download any image from the internet
2. Or use a test photo from your computer
3. **Drop it into the `INPUT` folder**

You should see:
```
📥 New file detected: test-image.jpg
🛠️  Processing #01...
   ⚡ Upscaling 4x with AI...
   📐 Aspect: tall (2048x3072)
   📦 Creating 5 formats × 3 versions...
   ✅ Menu #01 complete!
```

### Check the Output:

1. Go to: `images/backgrounds/letter/`
2. You should see 3 folders:
   - `previews/` - Watermarked versions
   - `full/` - Clean versions
   - `thumbnails/` - Small previews

3. Each should have images!

**✅ If you see processed images, image processor works!**

**Common Issues:**

**"Upscayl not found"**
- Check path in `image-processor.js` line 24
- Make sure path is correct
- Use full absolute path

**"spawn ENOENT"**
- Upscayl path is wrong
- Check for typos
- Verify Upscayl is actually installed

### Stop Image Processor:

Press `Ctrl+C`

---

## 🚀 STEP 10: RUN EVERYTHING TOGETHER (5 minutes)

Now run both at once!

### Start Both Services:

```bash
npm run dev
```

This starts:
- ✅ Web server (http://localhost:3000)
- ✅ Image processor (watching INPUT folder)

**Leave this running!**

### Test Complete Workflow:

1. Open: http://localhost:3000
2. Create a menu
3. Drop image in INPUT folder
4. Wait for processing
5. Refresh browser
6. New backgrounds should appear!

**✅ Everything working together!**

---

## 💳 STEP 11: TEST REAL PAYMENT (10 minutes)

### Make a Test Purchase:

1. Go to your Gumroad product page
2. Buy your own product (use real card or PayPal)
3. Gumroad sends you the license key via email

### Activate in App:

1. Copy license key from email (e.g., `MENU-SINGLE-A1B2C3D4`)
2. Go to your app: http://localhost:3000
3. Click **"Activate License"**
4. Paste key
5. Click **"Activate"**

**Should unlock features!** ✅

### Test Export:

1. Create a menu
2. Click **"EXPORT"**
3. Should download without watermark!

**✅ Payment system works!**

---

## 🌐 STEP 12: DEPLOY ONLINE (OPTIONAL, 20 minutes)

Want your app on the internet?

### Option A: Netlify (Easiest)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy
```

3. Follow prompts:
   - Authorize Netlify (opens browser)
   - Create new site
   - Site name: `menu-creator` (or your choice)
   - Publish directory: `.` (just press Enter)

4. Test deploy:
```bash
netlify deploy --prod
```

5. Get your URL: `https://menu-creator-abc123.netlify.app`

**✅ Your app is live!**

### Option B: Vercel

```bash
npm install -g vercel
vercel
```

Follow prompts - very similar to Netlify.

### Option C: Your Own Domain

1. Buy domain: `menubuilder.yourdomain.com`
2. In Netlify/Vercel: Add custom domain
3. Update DNS (they'll show you how)
4. Wait for SSL certificate (automatic)

**✅ Your app is on your domain!**

---

## ✅ FINAL CHECKLIST

Go through this list:

**Installation:**
- [ ] Node.js installed (`node --version` works)
- [ ] Project extracted to known location
- [ ] Dependencies installed (`npm install` completed)
- [ ] Upscayl installed and path configured

**Configuration:**
- [ ] `config.js` has YOUR Gumroad URLs
- [ ] Branding updated (app name, email, etc.)
- [ ] `image-processor.js` has correct Upscayl path

**Gumroad:**
- [ ] 3 products created (Single, Monthly, Annual)
- [ ] License keys enabled with correct prefixes
- [ ] Products published
- [ ] URLs copied to config.js

**Testing:**
- [ ] Web server starts (`npm start`)
- [ ] App loads at http://localhost:3000
- [ ] Can create a menu
- [ ] Pricing modal shows
- [ ] Test license activates
- [ ] Image processor runs (`node image-processor.js`)
- [ ] Images process correctly
- [ ] Real purchase test completed

**Optional:**
- [ ] Deployed online (Netlify/Vercel)
- [ ] Custom domain configured

**✅ If all checked, YOU'RE DONE!** 🎉

---

## 🎯 WHAT TO DO NEXT

### 1. Add Backgrounds

Generate 10-20 backgrounds:
1. Go to: https://perchance.org/ai-photo-generator
2. Generate restaurant-themed images
3. Download
4. Drop into `INPUT` folder
5. Wait for processing

### 2. Create Sample Menus

Make 3-5 example menus to show potential customers.

### 3. Market Your Product

- Post on social media
- Share in restaurant owner groups
- Run Google/Facebook ads
- Contact local restaurants
- Create YouTube tutorial

### 4. Monitor Sales

Check Gumroad dashboard daily:
- View sales
- Download customer emails
- Send welcome emails
- Request testimonials

---

## 🐛 TROUBLESHOOTING

### "npm: command not found"
**Fix:** Node.js not installed or not in PATH
- Re-install Node.js
- Restart computer
- Restart terminal

### "Port 3000 already in use"
**Fix:** Something else using port 3000
```bash
# Use different port
npx serve -p 8080
```

### Images not appearing in app
**Fix:** Image processor not running or wrong folders
- Check processor is running
- Verify folder structure
- Refresh browser (Ctrl+Shift+R)

### License key doesn't work
**Fix:** Prefix mismatch
- Check Gumroad prefix: `MENU-SINGLE-`
- Check config.js prefix matches exactly
- Try test key: `MENU-SINGLE-TEST123`

### Upscayl errors
**Fix:** Path incorrect
- Verify installation location
- Use full absolute path
- Check for typos in path

### Gumroad link broken
**Fix:** URL incorrect
- Verify product is published
- Check permalink is correct
- Test link in incognito browser

### App shows but looks broken
**Fix:** CSS not loading
- Clear browser cache (Ctrl+Shift+R)
- Check all files extracted properly
- Try different browser

---

## 📞 GETTING HELP

### Self-Service:

1. **Re-read this guide** - Most issues are covered
2. **Check `QUICK_REFERENCE.md`** - Common commands
3. **Check `README.md`** - Feature overview
4. **Google the error** - Copy exact error message

### Check Logs:

**Browser Console:**
- Press F12
- Click "Console" tab
- Look for red errors
- Google the error message

**Terminal:**
- Read error messages carefully
- They usually tell you what's wrong

---

## 🎓 LEARNING RESOURCES

Want to customize more?

- **HTML/CSS:** https://www.w3schools.com/
- **JavaScript:** https://javascript.info/
- **Fabric.js:** http://fabricjs.com/
- **Gumroad:** https://help.gumroad.com/

---

## 🎉 CONGRATULATIONS!

**You now have a complete, revenue-generating restaurant menu creator!**

**Your System:**
- ✅ Professional menu creation tool
- ✅ 3 pricing tiers ($29.99 - $490)
- ✅ Automatic payment processing
- ✅ AI image processing
- ✅ Ready to generate income!

**Potential Revenue:**
- Month 1: $300-1,000
- Month 3: $1,000-3,000
- Year 1: $5,000-$15,000+

**Now go make some money!** 💰🚀

---

**Questions?** Check the other guides:
- `README.md` - Overview
- `QUICK_REFERENCE.md` - Commands
- `LOGO_IMAGE_GUIDE.md` - Image features

**Good luck!** 🎉
