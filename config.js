// ============================================
// CONFIGURATION FILE
// Edit these values to customize your setup
// ============================================

const CONFIG = {
    // ========== GUMROAD SETTINGS ==========
    // Get these from your Gumroad dashboard
    gumroad: {
        // Your Gumroad product permalinks (replace with your actual links)
        singleExportUrl: 'https://yourusername.gumroad.com/l/menu-single',
        monthlySubUrl: 'https://yourusername.gumroad.com/l/menu-monthly',
        annualSubUrl: 'https://yourusername.gumroad.com/l/menu-annual',
        
        // Your Gumroad product IDs (for API validation)
        productIds: {
            single: 'your-single-product-id',
            monthly: 'your-monthly-product-id',
            annual: 'your-annual-product-id'
        }
    },

    // ========== PRICING ==========
    pricing: {
        single: 29.99,
        monthly: 49,
        annual: 490
    },

    // ========== BRANDING ==========
    branding: {
        appName: 'Restaurant Menu Creator Pro',
        tagline: 'Professional Menu Design Made Easy',
        logo: null, // Path to logo image (null = use text)
        primaryColor: '#ff4081',
        companyName: 'Your Company Name',
        supportEmail: 'support@yourdomain.com',
        websiteUrl: 'https://yourdomain.com'
    },

    // ========== IMAGE PATHS ==========
    // These paths are relative to index.html
    imagePaths: {
        backgrounds: 'images/backgrounds',
        previews: 'previews',
        full: 'full',
        thumbnails: 'thumbnails'
    },

    // ========== FEATURES ==========
    features: {
        enableWatermark: true,          // Add watermark to free exports
        watermarkText: 'PREVIEW',       // Watermark text for free users
        watermarkOpacity: 0.3,          // Watermark opacity (0-1)
        maxFreeExports: 0,              // Max exports for free users (0 = none)
        showUpgradePrompts: true        // Show upgrade suggestions
    },

    // ========== LICENSE VALIDATION ==========
    validation: {
        // Valid license key prefixes
        prefixes: {
            single: 'MENU-SINGLE-',
            monthly: 'MENU-MONTHLY-',
            annual: 'MENU-ANNUAL-'
        },
        
        // Enable online validation via Gumroad API
        // Set to false to use offline validation only
        enableOnlineValidation: false,
        
        // Gumroad API license verification endpoint
        gumroadApiUrl: 'https://api.gumroad.com/v2/licenses/verify'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
