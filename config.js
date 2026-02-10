// ============================================
// CONFIGURATION FILE
// Edit these values to customize your setup
// ============================================

const CONFIG = {
    // ========== GUMROAD SETTINGS ==========
    // Get these from your Gumroad dashboard
    gumroad: {
        // Your Gumroad product permalinks (replace with your actual links)
        // Example: 'https://yourstore.gumroad.com/l/menu-single'
        singleExportUrl: 'https://gumroad.com/l/menu-single-export',
        monthlySubUrl: 'https://gumroad.com/l/menu-pro-monthly',
        annualSubUrl: 'https://gumroad.com/l/menu-pro-annual',
        
        // Your Gumroad product IDs (for API validation)
        // Get these from your Gumroad dashboard after creating products
        // Example: 'abc123xyz'
        productIds: {
            single: 'CHANGE_ME_single_product_id',
            monthly: 'CHANGE_ME_monthly_product_id',
            annual: 'CHANGE_ME_annual_product_id'
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
        companyName: 'Menu Creator Pro',
        supportEmail: 'support@menucreatorpro.com',
        websiteUrl: 'https://menucreatorpro.com'
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
