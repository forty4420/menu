# 🍽️ Restaurant Menu Creator Pro

Professional menu creation tool with **built-in monetization** via Gumroad integration.

## 💎 What You Get

✅ **Full-featured menu creator** - 7 professional formats
✅ **4-tier pricing system** - $29.99 to $4,997 white-label
✅ **Automatic image processing** - AI upscaling + 3 versions per image
✅ **Gumroad integration** - Accept payments instantly
✅ **License management** - Automatic feature unlocking
✅ **Production-ready** - Deploy in minutes

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure (edit these files)
#    - config.js → Add your Gumroad URLs
#    - image-processor.js → Set Upscayl path

# 3. Start everything
npm run dev

# 4. Open browser
http://localhost:3000
```

**Full setup:** See `INSTALL_GUIDE.md` (step-by-step with screenshots)

## 💰 Revenue Model

### Three Pricing Tiers:

| Tier | Price | Features |
|------|-------|----------|
| **Single Export** | $29.99 | One menu, print-ready |
| **Pro Monthly** | $49/month | Unlimited menus |
| **Pro Annual** | $490/year | Save $98/year |

### Profit Potential:

- 10 single exports/month = **$300**
- 5 monthly subscriptions = **$245**
- 3 annual subscriptions = **$122/month**

**Realistic Year 1:** $5,000-$15,000

## 🎨 Features

### For Users:
- ✅ 7 menu formats (Letter, A4, Tabloid, Digital, etc.)
- ✅ 12 restaurant styles
- ✅ Drag-and-drop editor
- ✅ **Logo library** - Upload & reuse logos (localStorage)
- ✅ **Food photo library** - Upload menu item images
- ✅ Professional fonts
- ✅ Print-ready exports (300 DPI)
- ✅ Grid & safe zone tools

### For You (Owner):
- ✅ Gumroad payment integration
- ✅ Automatic license validation
- ✅ Tiered feature access
- ✅ Watermarked previews (free users)
- ✅ Clean exports (paid users)
- ✅ Usage tracking
- ✅ Upgrade prompts

### Image Processing:
- ✅ Drop Perchance AI images → AUTO process
- ✅ AI upscaling (4x with Upscayl)
- ✅ 3 versions: Preview, Full, Thumbnail
- ✅ Watermarks on preview versions
- ✅ Smart aspect ratio detection
- ✅ Batch processing queue

## 📁 Project Structure

```
menu-creator-pro/
├── index.html              # Main app
├── config.js              # YOUR SETTINGS ⚙️
├── app.js                 # App logic
├── license-manager.js     # License system
├── styles.css             # Styling
├── image-processor.js     # Automation
├── package.json           # Dependencies
│
├── INPUT/                 # Drop images here 📥
├── TEMP/                  # Processing (auto)
│
└── images/backgrounds/
    ├── letter/
    │   ├── previews/      # Watermarked
    │   ├── full/          # Clean
    │   └── thumbnails/    # Small
    ├── [6 more formats]
```

## 🔧 Configuration

### Essential Files to Edit:

**1. config.js** - Line 12
```javascript
gumroad: {
    singleExportUrl: 'https://YOUR-USERNAME.gumroad.com/l/menu-single',
    monthlySubUrl: 'https://YOUR-USERNAME.gumroad.com/l/menu-monthly',
    annualSubUrl: 'https://YOUR-USERNAME.gumroad.com/l/menu-annual',
    whiteLabelUrl: 'mailto:your@email.com'
}
```

**2. config.js** - Line 26
```javascript
branding: {
    appName: 'Your Menu Creator',
    primaryColor: '#ff4081',
    supportEmail: 'you@yourdomain.com'
}
```

**3. image-processor.js** - Line 24
```javascript
const UPSCAYL_PATH = 'C:\\your-path\\upscayl-bin.exe';
```

## 🛍️ Gumroad Setup

### Create 3 Products:

1. **Single Export** - $29.99
   - Type: Digital Product
   - License prefix: `MENU-SINGLE-`

2. **Pro Monthly** - $49/month
   - Type: Membership
   - License prefix: `MENU-MONTHLY-`

3. **Pro Annual** - $490/year
   - Type: Membership
   - License prefix: `MENU-ANNUAL-`

**Full instructions:** `INSTALL_GUIDE.md` Step 6

## 📖 Documentation

- **INSTALL_GUIDE.md** - Complete setup (1-2 hours)
- **QUICK_REFERENCE.md** - Commands & troubleshooting
- **This README** - Overview

## 🧪 Testing

### Test License Keys:
```
MENU-SINGLE-TEST123    → Unlocks 1 export
MENU-MONTHLY-TEST456   → Unlocks unlimited
MENU-ANNUAL-TEST789    → Unlocks unlimited
```

### Test Workflow:
1. Start app: `npm run dev`
2. Open: http://localhost:3000
3. Try to export → Shows pricing modal
4. Enter test license key
5. Export should work!

## 🎨 Add Backgrounds

### Easy Way (Perchance AI):

1. Generate image at https://perchance.org/ai-photo-generator
2. Download
3. Drop into `INPUT/` folder
4. Image processor auto-creates all versions
5. Refresh app - backgrounds appear!

### Manual Way:

Create images at correct sizes:
- Letter: 2550×3300px @ 300 DPI
- Digital: 1920×1080px @ 96 DPI
- etc.

Save to: `images/backgrounds/[format]/full/`

## 🌐 Deployment

### Option A: Netlify (Recommended)
```bash
npm install -g netlify-cli
netlify deploy
```

### Option B: Vercel
```bash
npm install -g vercel
vercel
```

### Option C: GitHub Pages
1. Push to GitHub
2. Enable Pages in settings
3. Done!

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| npm not found | Install Node.js |
| Port 3000 busy | Use `npx serve -p 8080` |
| Images not loading | Check processor is running |
| License fails | Verify prefix in Gumroad |
| Gumroad link broken | Update config.js URLs |

**More help:** See `INSTALL_GUIDE.md` Step 14

## 💡 Marketing Ideas

- ✅ Post example menus on Instagram
- ✅ Share in restaurant owner Facebook groups
- ✅ Create YouTube tutorial
- ✅ Offer launch discount (first 50 customers)
- ✅ Partner with print shops
- ✅ Run Google Ads for "menu design"

## 🎯 Marketing Ideas

- ✅ Post example menus on Instagram

Track in Gumroad dashboard:
- Total sales
- Active subscriptions
- Churn rate
- Revenue trends
- Popular tiers

## 🔐 License System

**How it works:**
1. Customer buys on Gumroad
2. Receives license key via email
3. Enters key in app
4. Features unlock automatically
5. Stored in browser localStorage

**Tiers unlock:**
- Single: 1 export, watermark-free
- Monthly/Annual: Unlimited exports

## 🆘 Support

**For setup help:**
- Read INSTALL_GUIDE.md thoroughly
- Check QUICK_REFERENCE.md
- Review console errors (F12)
- Search error messages online

**For white-label buyers:**
- Offer 1-on-1 setup call
- Provide custom branding guide
- Help with deployment
- 3 months email support

## 📜 License

**For your use:** Free to use and modify for your restaurant menu creation business

## 🙏 Credits

Built with:
- Fabric.js - Canvas library
- Sharp - Image processing
- Chokidar - File watching
- Font Awesome - Icons
- Google Fonts - Typography

## 🚀 Get Started Now

```bash
# Clone or download this repo
# Then:

npm install
npm run dev

# Edit config.js with your Gumroad links
# Start selling!
```

---

**Questions?** Read the guides first!
**Ready to launch?** Follow INSTALL_GUIDE.md
**Want support?** Contact for white-label license

**Good luck! 🎉**
