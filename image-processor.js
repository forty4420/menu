/* ================================================================
IMAGE PROCESSOR FOR RESTAURANT MENU CREATOR PRO
Creates 3 versions of each uploaded image:
1. Preview - Watermarked, 800px max, web-optimized (for free users)
2. Full - Clean, original dimensions, print-ready (for paid users)
3. Thumbnail - Small preview for gallery

SETUP INSTRUCTIONS:
1. Install dependencies: npm install sharp chokidar
2. Install Upscayl CLI from: https://github.com/upscayl/upscayl
3. Update UPSCAYL_PATH below to point to your upscayl executable
4. Run: node image-processor.js
5. Drop Perchance AI images into the INPUT folder
================================================================ */

const chokidar = require('chokidar');
const sharp = require('sharp');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ========== CONFIGURATION ==========

// IMPORTANT: Update this path to your Upscayl installation
// Windows: 'C:\\Program Files\\Upscayl\\resources\\bin\\upscayl-bin.exe'
// macOS: '/Applications/Upscayl.app/Contents/Resources/bin/upscayl-bin'
// Linux: '/usr/bin/upscayl' or check your installation path
const UPSCAYL_PATH = process.platform === 'win32'
    ? 'C:\\Program Files\\Upscayl\\resources\\bin\\upscayl-bin.exe'
    : process.platform === 'darwin'
    ? '/Applications/Upscayl.app/Contents/Resources/bin/upscayl-bin'
    : '/usr/bin/upscayl'; // Linux default 

const WATCH_DIR = './INPUT';
const TEMP_DIR = './TEMP';
const BASE_WEB_PATH = './images/backgrounds';

// Format configurations
const FORMATS = {
    letter: { w: 2550, h: 3300, preview: 800, thumb: 200 },
    'half-letter': { w: 1650, h: 2550, preview: 800, thumb: 200 },
    tabloid: { w: 3300, h: 5100, preview: 800, thumb: 200 },
    trifold: { w: 3300, h: 2550, preview: 800, thumb: 200 },
    a4: { w: 2480, h: 3508, preview: 800, thumb: 200 },
    a5: { w: 1748, h: 2480, preview: 800, thumb: 200 },
    'digital-16x9': { w: 1920, h: 1080, preview: 800, thumb: 200 }
};

// Watermark settings
const WATERMARK_TEXT = 'PREVIEW';
const WATERMARK_OPACITY = 0.3;

// ========== SETUP ==========

// Create all necessary folders
Object.keys(FORMATS).forEach(format => {
    ['previews', 'full', 'thumbnails'].forEach(type => {
        const dir = path.join(BASE_WEB_PATH, format, type);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
});

if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// ========== SEQUENTIAL NAMING ==========

function getNextFileNumber() {
    const primaryFolder = path.join(BASE_WEB_PATH, 'letter', 'full');
    if (!fs.existsSync(primaryFolder)) return 1;
    
    const files = fs.readdirSync(primaryFolder);
    let maxNum = 0;
    
    files.forEach(file => {
        const match = file.match(/menu_(\d+)_/);
        if (match) {
            const num = parseInt(match[1]);
            if (num > maxNum) maxNum = num;
        }
    });
    
    return maxNum + 1;
}

// ========== QUEUE SYSTEM ==========

let queue = [];
let isProcessing = false;

console.log("🚀 Image Processor Started");
console.log("📁 Watching:", WATCH_DIR);
console.log("💾 Output:", BASE_WEB_PATH);
console.log("\n⏳ Drop images into INPUT folder...\n");

// Watch for new files
chokidar.watch(WATCH_DIR, { 
    ignoreInitial: true, 
    awaitWriteFinish: true 
}).on('add', (filePath) => {
    console.log(`📥 New file detected: ${path.basename(filePath)}`);
    queue.push(filePath);
    processQueue();
});

async function processQueue() {
    if (isProcessing || queue.length === 0) return;
    
    isProcessing = true;
    const currentFile = queue.shift();
    
    try {
        await handleImage(currentFile);
    } catch (err) {
        console.error(`❌ Error:`, err.message);
    } finally {
        isProcessing = false;
        processQueue();
    }
}

// ========== IMAGE PROCESSING ==========

async function handleImage(filePath) {
    const nextNum = getNextFileNumber().toString().padStart(2, '0');
    const tempUpscaled = path.join(TEMP_DIR, `temp_${Date.now()}.png`);

    console.log(`\n🛠️  Processing #${nextNum}...`);
    console.log(`   ⚡ Upscaling 4x with AI...`);

    // AI Upscale (4x)
    try {
        const modelsPath = 'C:/Program Files/Upscayl/resources/models';
        execSync(`"${UPSCAYL_PATH}" -i "${filePath}" -o "${tempUpscaled}" -m "${modelsPath}" -n ultrasharp-4x -s 4`, {
            stdio: 'inherit'
        });
    } catch (e) {
        console.error('   ❌ Upscaling failed. Make sure Upscayl is installed correctly.');
        return;
    }

    // Analyze aspect ratio
    const metadata = await sharp(tempUpscaled).metadata();
    const ratio = metadata.width / metadata.height;
    
    const mode = (ratio > 1.2) ? 'wide' : (ratio < 0.8) ? 'tall' : 'square';
    console.log(`   📐 Aspect: ${mode} (${metadata.width}x${metadata.height})`);

    // Determine target formats
    let targetFormats = [];
    if (mode === 'wide') {
        targetFormats = ['digital-16x9', 'trifold'];
    } else {
        targetFormats = ['letter', 'half-letter', 'tabloid', 'a4', 'a5'];
    }

    console.log(`   📦 Creating ${targetFormats.length} formats × 3 versions...`);

    // Process each format
    for (const format of targetFormats) {
        const config = FORMATS[format];
        
        // 1. FULL VERSION (clean, print-ready)
        const fullName = `menu_${nextNum}_${format}_full.jpg`;
        const fullPath = path.join(BASE_WEB_PATH, format, 'full', fullName);
        
        await sharp(tempUpscaled)
            .resize(config.w, config.h, { fit: 'cover', position: 'entropy' })
            .jpeg({ quality: 95 })
            .withMetadata({ density: 300 })
            .toFile(fullPath);
        
        // 2. PREVIEW VERSION (watermarked, web-optimized)
        const previewName = `menu_${nextNum}_${format}_preview.jpg`;
        const previewPath = path.join(BASE_WEB_PATH, format, 'previews', previewName);
        
        const previewWidth = Math.min(config.preview, config.w);
        const watermarkedBuffer = await createWatermarkedImage(tempUpscaled, previewWidth);
        
        await sharp(watermarkedBuffer)
            .jpeg({ quality: 75 })
            .toFile(previewPath);
        
        // 3. THUMBNAIL VERSION (small preview)
        const thumbName = `menu_${nextNum}_${format}_thumb.jpg`;
        const thumbPath = path.join(BASE_WEB_PATH, format, 'thumbnails', thumbName);
        
        await sharp(watermarkedBuffer)
            .resize(config.thumb, null, { fit: 'inside' })
            .jpeg({ quality: 70 })
            .toFile(thumbPath);
    }

    // Cleanup
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (fs.existsSync(tempUpscaled)) fs.unlinkSync(tempUpscaled);
    
    console.log(`   ✅ Menu #${nextNum} complete!`);
    console.log(`   📂 Created in ${targetFormats.length} formats\n`);
}

// ========== WATERMARK CREATION ==========

async function createWatermarkedImage(inputPath, width) {
    const image = sharp(inputPath).resize(width, null, { fit: 'inside' });
    const metadata = await image.metadata();
    
    // Create watermark SVG
    const watermarkSvg = `
        <svg width="${metadata.width}" height="${metadata.height}">
            <text 
                x="50%" 
                y="50%" 
                font-family="Arial, sans-serif" 
                font-size="${metadata.height * 0.15}" 
                font-weight="bold" 
                fill="black" 
                opacity="${WATERMARK_OPACITY}"
                text-anchor="middle" 
                dominant-baseline="middle"
                transform="rotate(-45 ${metadata.width/2} ${metadata.height/2})">
                ${WATERMARK_TEXT}
            </text>
        </svg>
    `;
    
    // Composite watermark onto image
    return await image
        .composite([{
            input: Buffer.from(watermarkSvg),
            gravity: 'center'
        }])
        .toBuffer();
}

// ========== ERROR HANDLING ==========

process.on('uncaughtException', (err) => {
    console.error('💥 Unexpected error:', err);
});

process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down gracefully...');
    process.exit(0);
});