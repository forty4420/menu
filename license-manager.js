// ============================================
// LICENSE MANAGER
// Handles all licensing, validation, and tier management
// ============================================

const LicenseManager = {
    currentLicense: null,
    
    init() {
        // Check for saved license on startup
        this.loadSavedLicense();
        this.updateUI();
        this.setupGumroadLinks();
    },
    
    // ========== LICENSE STORAGE ==========
    
    loadSavedLicense() {
        const saved = localStorage.getItem('menuCreatorLicense');
        if (saved) {
            try {
                this.currentLicense = JSON.parse(saved);
                // Validate it's still good
                if (this.currentLicense.tier === 'monthly' || this.currentLicense.tier === 'annual') {
                    // For subscriptions, we should validate with Gumroad
                    // For now, trust localStorage (upgrade to API validation later)
                }
            } catch (e) {
                console.error('Error loading license:', e);
                this.currentLicense = null;
            }
        }
    },
    
    saveLicense(license) {
        this.currentLicense = license;
        localStorage.setItem('menuCreatorLicense', JSON.stringify(license));
        this.updateUI();
    },
    
    clearLicense() {
        this.currentLicense = null;
        localStorage.removeItem('menuCreatorLicense');
        localStorage.removeItem('exportUsage');
        this.updateUI();
    },
    
    // ========== LICENSE VALIDATION ==========
    
    validateLicenseKey(key) {
        if (!key || key.trim().length < 10) {
            return { valid: false, error: 'Invalid license key format' };
        }
        
        key = key.trim().toUpperCase();
        
        // Check prefix to determine tier
        const prefixes = CONFIG.validation.prefixes;
        
        let tier = null;
        if (key.startsWith(prefixes.single)) {
            tier = 'single';
        } else if (key.startsWith(prefixes.monthly)) {
            tier = 'monthly';
        } else if (key.startsWith(prefixes.annual)) {
            tier = 'annual';
        } else {
            return { valid: false, error: 'Unknown license type' };
        }
        
        // If online validation is enabled, verify with Gumroad
        // For MVP, we'll do offline validation only
        
        return {
            valid: true,
            tier: tier,
            key: key,
            activatedAt: new Date().toISOString()
        };
    },
    
    // ========== GUMROAD API VALIDATION (Optional) ==========
    
    async validateWithGumroad(licenseKey, productId) {
        // This requires a server-side endpoint to hide your Gumroad API key
        // For now, we'll skip this and use offline validation
        
        /* Example implementation:
        try {
            const response = await fetch('/api/validate-license', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ license_key: licenseKey, product_id: productId })
            });
            
            const data = await response.json();
            return data.success;
        } catch (e) {
            console.error('Gumroad validation error:', e);
            return false;
        }
        */
        
        return true; // Offline mode
    },
    
    // ========== TIER CHECKING ==========
    
    hasFeature(feature) {
        if (!this.currentLicense) {
            return this.getFreeFeatures()[feature] || false;
        }
        
        const tier = this.currentLicense.tier;
        const features = this.getTierFeatures(tier);
        return features[feature] || false;
    },
    
    getFreeFeatures() {
        return {
            highResExport: false,
            removeWatermark: false,
            unlimitedExports: false,
            commercialUse: false,
            whiteLabel: false,
            premiumTemplates: false
        };
    },
    
    getTierFeatures(tier) {
        const features = {
            single: {
                highResExport: true,
                removeWatermark: true,
                unlimitedExports: false,
                commercialUse: false,
                whiteLabel: false,
                premiumTemplates: true,
                exportsRemaining: 1
            },
            monthly: {
                highResExport: true,
                removeWatermark: true,
                unlimitedExports: true,
                commercialUse: true,
                whiteLabel: false,
                premiumTemplates: true
            },
            annual: {
                highResExport: true,
                removeWatermark: true,
                unlimitedExports: true,
                commercialUse: true,
                whiteLabel: false,
                premiumTemplates: true
            }
        };
        
        return features[tier] || this.getFreeFeatures();
    },
    
    // ========== EXPORT USAGE TRACKING ==========
    
    canExport() {
        if (!this.currentLicense) {
            return { allowed: false, reason: 'no_license' };
        }
        
        const tier = this.currentLicense.tier;
        
        if (tier === 'monthly' || tier === 'annual') {
            return { allowed: true };
        }
        
        if (tier === 'single') {
            const usage = this.getExportUsage();
            if (usage.count < 1) {
                return { allowed: true };
            } else {
                return { allowed: false, reason: 'limit_reached' };
            }
        }
        
        return { allowed: false, reason: 'unknown' };
    },
    
    getExportUsage() {
        const usage = localStorage.getItem('exportUsage');
        if (!usage) {
            return { count: 0, lastExport: null };
        }
        try {
            return JSON.parse(usage);
        } catch (e) {
            return { count: 0, lastExport: null };
        }
    },
    
    recordExport() {
        const usage = this.getExportUsage();
        usage.count++;
        usage.lastExport = new Date().toISOString();
        localStorage.setItem('exportUsage', JSON.stringify(usage));
    },
    
    // ========== UI UPDATES ==========
    
    updateUI() {
        const statusEl = document.getElementById('license-status');
        if (!statusEl) return;
        
        if (!this.currentLicense) {
            statusEl.innerHTML = '<i class="fas fa-lock"></i><span>Free Mode</span>';
            statusEl.className = 'license-status free';
        } else {
            const tier = this.currentLicense.tier;
            const icons = {
                single: 'fa-ticket-alt',
                monthly: 'fa-star',
                annual: 'fa-crown'
            };
            const labels = {
                single: 'Single Use',
                monthly: 'Pro Monthly',
                annual: 'Pro Annual'
            };
            
            statusEl.innerHTML = `<i class="fas ${icons[tier]}"></i><span>${labels[tier]}</span>`;
            statusEl.className = `license-status ${tier}`;
        }
    },
    
    setupGumroadLinks() {
        // Set up purchase links
        const links = {
            'buy-single': CONFIG.gumroad.singleExportUrl,
            'buy-single-card': CONFIG.gumroad.singleExportUrl,
            'buy-monthly': CONFIG.gumroad.monthlySubUrl,
            'buy-monthly-card': CONFIG.gumroad.monthlySubUrl,
            'buy-annual': CONFIG.gumroad.annualSubUrl,
            'buy-annual-card': CONFIG.gumroad.annualSubUrl
        };
        
        Object.keys(links).forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.href = links[id];
                el.target = '_blank';
            }
        });
    },
    
    // ========== UPGRADE PROMPTS ==========
    
    shouldShowUpgradePrompt() {
        if (!CONFIG.features.showUpgradePrompts) return false;
        if (this.currentLicense && this.currentLicense.tier !== 'single') return false;
        
        const usage = this.getExportUsage();
        
        // Show after 1st single export
        if (this.currentLicense && this.currentLicense.tier === 'single' && usage.count >= 1) {
            return true;
        }
        
        return false;
    },
    
    getUpgradeMessage() {
        if (!this.currentLicense) {
            return {
                title: 'Unlock Full Features',
                message: 'Get high-resolution exports and remove watermarks',
                cta: 'View Pricing'
            };
        }
        
        const tier = this.currentLicense.tier;
        
        if (tier === 'single') {
            return {
                title: 'Need More Exports?',
                message: "You've used your single export. Subscribe for unlimited!",
                cta: 'Upgrade to Pro'
            };
        }
        
        return null;
    }
};

// ========== GLOBAL FUNCTIONS ==========

function showLicenseModal() {
    document.getElementById('license-modal').classList.add('active');
}

function closeLicenseModal() {
    document.getElementById('license-modal').classList.remove('active');
    document.getElementById('license-error').textContent = '';
}

function validateLicense() {
    const input = document.getElementById('license-key-input');
    const errorEl = document.getElementById('license-error');
    const key = input.value.trim();
    
    errorEl.textContent = '';
    
    const result = LicenseManager.validateLicenseKey(key);
    
    if (result.valid) {
        LicenseManager.saveLicense(result);
        closeLicenseModal();
        alert('License activated successfully! 🎉');
        
        // Reload to apply new permissions
        if (typeof app !== 'undefined' && app.onLicenseChanged) {
            app.onLicenseChanged();
        }
    } else {
        errorEl.textContent = result.error;
    }
}

function showUpgradeModal() {
    document.getElementById('upgrade-modal').classList.add('active');
}

function closeUpgradeModal() {
    document.getElementById('upgrade-modal').classList.remove('active');
}

function deactivateLicense() {
    if (confirm('Are you sure you want to deactivate your license?')) {
        LicenseManager.clearLicense();
        alert('License deactivated');
        location.reload();
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    LicenseManager.init();
});
