# 📸 Logo & Image Upload Guide

## Overview

Users can upload and reuse their own logos and food photos. All images are stored in the browser's **localStorage**, so you don't need to host them!

---

## ✨ Features

### 1. **Logo Library**
- Upload restaurant logos (PNG recommended)
- Transparent backgrounds work best
- Reuse across multiple menus
- Max size: 2MB per logo

### 2. **Food Photo Library**
- Upload menu item photos
- High-quality JPG or PNG
- Reuse in different menu designs
- Max size: 5MB per photo

### 3. **localStorage Storage**
- No server/database needed
- Images stored in user's browser
- Persistent across sessions
- No hosting costs for you!

---

## 🎯 How It Works (User Perspective)

### Upload a Logo:

1. Click toolbar → **"Logo"** button
2. See your logo library (empty at first)
3. Click **"Upload New Logo"**
4. Select PNG file (transparent background recommended)
5. Logo saved to library!
6. Can now use in ANY menu

### Upload Food Photo:

1. Click toolbar → **"Food Photo"** button
2. See your food photo library
3. Click **"Upload Food Photo"**
4. Select JPG/PNG of menu item
5. Photo saved to library!
6. Drag onto menu as needed

### Use Saved Images:

1. Open Logo or Food Photo library
2. Click **"Use"** on any saved image
3. Image appears on canvas
4. Resize, move, style as needed

### Delete Images:

1. Open library
2. Click **"Delete"** on unwanted image
3. Confirms & removes from library

---

## 💾 localStorage Limits

### What You Should Know:

- **Typical limit:** 5-10MB per domain
- **Your images:** Count toward this limit
- **Recommendation:** 
  - Logos: Keep under 200KB each
  - Photos: Keep under 500KB each
  - Total: ~20-30 images max

### If Storage Gets Full:

User sees: "QuotaExceededError"

**Solutions:**
1. Delete old images from library
2. Compress images before upload
3. Use smaller file sizes

---

## 🎨 Best Practices for Users

### For Logos:

✅ **Format:** PNG with transparency
✅ **Size:** 1000×1000px or smaller
✅ **File size:** Under 200KB
✅ **Colors:** Match brand colors
✅ **Background:** Transparent (not white)

❌ **Avoid:** JPG with white background

### For Food Photos:

✅ **Format:** JPG (smaller) or PNG (quality)
✅ **Resolution:** 1000px wide minimum
✅ **Lighting:** Well-lit, professional
✅ **File size:** Under 500KB
✅ **Orientation:** Landscape or square

❌ **Avoid:** Dark, blurry, or pixelated photos

---

## 🔧 Technical Details

### How It's Stored:

```javascript
localStorage.setItem('userImages', JSON.stringify({
  logos: [
    {
      id: 'logo_1234567890',
      data: 'data:image/png;base64,iVBOR...',
      name: 'My Restaurant Logo',
      type: 'logo',
      addedAt: '2026-02-03T12:00:00Z'
    }
  ],
  foodPhotos: [
    {
      id: 'foodPhoto_1234567891',
      data: 'data:image/jpeg;base64,/9j/4AA...',
      name: 'Burger Photo',
      type: 'foodPhoto',
      addedAt: '2026-02-03T12:05:00Z'
    }
  ]
}));
```

### Data Format:

- Images stored as **base64** encoded strings
- Includes metadata (ID, name, type, timestamp)
- Accessible across browser sessions
- Cleared if user clears browser data

---

## 🚫 What Users CANNOT Upload

### Custom Backgrounds - DISABLED

Users **cannot** upload custom backgrounds because:
- ❌ Would need to be exact dimensions
- ❌ Would bypass your curated library
- ❌ Could be low quality
- ❌ Reduces value of your premium backgrounds

**Instead:** They must use YOUR backgrounds (free tier = watermarked, paid tier = clean)

This is by design - keeps quality high and your backgrounds valuable!

---

## 🎓 User Education

### Teach Users:

**In App Help Text:**
```
💡 Pro Tip: Upload your logo once, use in all menus!

📸 Best Results: Use high-quality photos with good lighting

💾 Your images are saved in your browser - no account needed!

🗑️ Delete unused images to free up space
```

**In Documentation:**
- How to compress images (TinyPNG, Squoosh)
- Recommended image dimensions
- How to create transparent logos
- Where to find royalty-free food photos

---

## 🐛 Troubleshooting

### "File too large"
**Fix:** Image exceeds size limit (2MB logos, 5MB photos)
**Solution:** Compress at tinypng.com or resize

### "QuotaExceededError"
**Fix:** localStorage full (5-10MB limit)
**Solution:** Delete old images from library

### Images don't appear after refresh
**Fix:** Browser localStorage disabled or cleared
**Solution:** Re-upload images (they're saved per-browser)

### Image looks pixelated
**Fix:** Uploaded image was too small
**Solution:** Use higher resolution source image

---

## 💡 Marketing This Feature

### Selling Points:

**For Users:**
- "Build your personal logo library"
- "Upload once, use everywhere"
- "No accounts or cloud storage needed"
- "Your images, your browser, total privacy"

**For You:**
- Zero hosting costs
- Zero database needed
- No privacy concerns
- Scales infinitely (each user = their own storage)

---

## 🔮 Future Enhancements (Optional)

### If You Want to Add Later:

1. **Cloud sync** - Save to your database (requires backend)
2. **Image optimization** - Auto-compress uploads
3. **Stock photos** - Integrate Unsplash API
4. **Templates** - Pre-made logo/photo sets
5. **Import/Export** - Backup user libraries

**For now:** Keep it simple with localStorage!

---

## ✅ Summary

**What's Included:**
- ✅ Logo library (localStorage)
- ✅ Food photo library (localStorage)
- ✅ Upload & reuse images
- ✅ Delete unwanted images
- ✅ Size limits (2MB logos, 5MB photos)

**What's NOT Included:**
- ❌ Custom background uploads (by design)
- ❌ Cloud storage/sync
- ❌ Image editing tools
- ❌ Stock photo library

**Result:**
Users get personal image libraries without you hosting anything! 🎉
