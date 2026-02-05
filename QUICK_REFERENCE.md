# 🚀 QUICK REFERENCE CARD

## Essential Commands

```bash
# Start web server only
npm start

# Start image processor only
npm run process

# Start both (recommended)
npm run dev
```

## URLs

- **Local app:** http://localhost:3000
- **Your Gumroad:** https://yourusername.gumroad.com

## Test License Keys

```
MENU-SINGLE-TEST123    → Single export
MENU-MONTHLY-TEST456   → Monthly unlimited
MENU-ANNUAL-TEST789    → Annual unlimited
```

## File Locations to Edit

| File | What to Edit | Line # |
|------|--------------|--------|
| `config.js` | Gumroad URLs | 12-16 |
| `config.js` | Your branding | 26-32 |
| `config.js` | Your email | 30 |
| `image-processor.js` | Upscayl path | 24 |

## Folder Workflow

```
1. Drop image → INPUT/
2. Auto-processes → TEMP/ (temporary)
3. Outputs to → images/backgrounds/[format]/
   - previews/  (watermarked, free users see)
   - full/      (clean, paid users see)
   - thumbnails/ (gallery view)
```

## Pricing Setup

| Tier | Price | Gumroad Product Type | License Prefix |
|------|-------|---------------------|----------------|
| Single | $29.99 | Digital Product | `MENU-SINGLE-` |
| Monthly | $49/mo | Membership | `MENU-MONTHLY-` |
| Annual | $490/yr | Membership | `MENU-ANNUAL-` |

## Menu Formats & Dimensions

| Format | Size (px) | DPI | Use Case |
|--------|-----------|-----|----------|
| Letter | 2550×3300 | 300 | US standard |
| Half-Letter | 1650×2550 | 300 | Compact menu |
| Tabloid | 3300×5100 | 300 | Large poster |
| Tri-Fold | 3300×2550 | 300 | Brochure |
| A4 | 2480×3508 | 300 | International |
| A5 | 1748×2480 | 300 | Small table |
| Digital 16:9 | 1920×1080 | 96 | Screens |

## Perchance AI → Menu Format Conversion

### Workflow:
1. Generate in Perchance: Portrait (512×768) or Landscape (768×512)
2. Drop in INPUT folder
3. Processor upscales 4x automatically
4. Creates all formats + versions
5. Done!

### Aspect Ratio Detection:
- **Wide** (ratio > 1.2) → Digital-16:9, Tri-Fold
- **Tall/Square** (ratio ≤ 1.2) → All print formats

## Keyboard Shortcuts

- `Ctrl+C` → Stop server/processor
- `Ctrl+Z` → Undo in app
- `Delete` → Delete selected object

## Common Issues

| Problem | Solution |
|---------|----------|
| Port 3000 busy | `npx serve -p 8080` |
| Images not loading | Check processor running |
| License not working | Check prefix matches |
| Gumroad link broken | Update config.js URLs |

## Support Checklist

Before asking for help:
- ✅ Read INSTALL_GUIDE.md
- ✅ Check all paths in config.js
- ✅ Verify Gumroad URLs
- ✅ Test with browser console open (F12)
- ✅ Try incognito mode

## Revenue Calculator

| Scenario | Monthly | Annual |
|----------|---------|--------|
| 10 single exports | $300 | $3,600 |
| 5 monthly subs | $245 | $2,940 |
| 2 annual subs | $82 | $980 |
| **Total** | **$627** | **$7,520** |

## Next Steps After Setup

1. ✅ Generate 10+ backgrounds
2. ✅ Create example menus
3. ✅ Test all features
4. ✅ Share on social media
5. ✅ Get first customer!

---

**Need full details?** See `INSTALL_GUIDE.md`

**Ready to customize?** Edit `config.js`

**Questions?** Check console errors (F12)
