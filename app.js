// ============================================
// MAIN APPLICATION
// Restaurant Menu Creator Pro
// ============================================

const app = {
    canvas: null,
    stage: 1,
    maxStage: 5,
    currentFormat: null,
    currentStyle: null,
    currentBackground: null,
    gridVisible: false,
    safeZoneVisible: false,
    history: [],
    historyIndex: -1,
    clipboard: null,
    zoomLevel: 1,
    defaultTextStyle: null,
    
    // Menu format configurations
    formats: {
        'letter': { width: 2550, height: 3300, name: '8.5x11" Letter (US)', dpi: 300, category: 'print' },
        'half-letter': { width: 1650, height: 2550, name: '5.5x8.5" Half Letter', dpi: 300, category: 'print' },
        'tabloid': { width: 3300, height: 5100, name: '11x17" Tabloid', dpi: 300, category: 'print' },
        'trifold': { width: 3300, height: 2550, name: '11x8.5" Tri-Fold', dpi: 300, category: 'print' },
        'a4': { width: 2480, height: 3508, name: 'A4 (210x297mm)', dpi: 300, category: 'print' },
        'a5': { width: 1748, height: 2480, name: 'A5 (148x210mm)', dpi: 300, category: 'print' },
        'digital-16x9': { width: 1920, height: 1080, name: '16:9 Digital Display', dpi: 96, category: 'digital' }
    },
    
    // Restaurant style categories
    styles: [
        { id: 'fine-dining', name: 'Fine Dining', icon: 'fa-wine-glass' },
        { id: 'casual', name: 'Casual', icon: 'fa-utensils' },
        { id: 'fast-food', name: 'Fast Food', icon: 'fa-burger' },
        { id: 'cafe', name: 'Café', icon: 'fa-mug-hot' },
        { id: 'pizza', name: 'Pizzeria', icon: 'fa-pizza-slice' },
        { id: 'asian', name: 'Asian', icon: 'fa-bowl-rice' },
        { id: 'mexican', name: 'Mexican', icon: 'fa-pepper-hot' },
        { id: 'seafood', name: 'Seafood', icon: 'fa-fish' },
        { id: 'steakhouse', name: 'Steakhouse', icon: 'fa-drumstick-bite' },
        { id: 'vegan', name: 'Vegan/Vegetarian', icon: 'fa-leaf' },
        { id: 'bakery', name: 'Bakery', icon: 'fa-bread-slice' },
        { id: 'bar', name: 'Bar/Pub', icon: 'fa-beer-mug-empty' }
    ],
    
    // Background images (loaded dynamically)
    backgrounds: {},
    
    // User uploaded images (logos, food photos)
    userImages: {
        logos: [],
        foodPhotos: []
    },
    
    // Text style presets
    savedTextStyles: [],
    
    init() {
        this.savedTextStyles = this.loadTextStyles(); // Load saved styles
        this.defaultTextStyle = JSON.parse(localStorage.getItem('menuCreator_defaultTextStyle') || 'null');
        this.setupCanvas();
        this.setupEventListeners();
        this.loadBackgroundImages();
        this.loadUserImages();
        this.showStage1();
        this.createToastContainer();
        this.setupAutoSave();
        this.checkForRecovery();
        this.loadZoomPreference(); // Load saved zoom level
        this.checkFirstVisit(); // Show welcome screen if first time
    },
    
    // ========== WELCOME SCREEN ==========
    checkFirstVisit() {
        const hasVisited = localStorage.getItem('menuCreator_hasVisited');
        if (!hasVisited) {
            setTimeout(() => this.showWelcomeScreen(), 500);
        }
    },
    
    showWelcomeScreen() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.style.zIndex = '99999';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header" style="background: linear-gradient(135deg, var(--accent) 0%, #ff5a96 100%);">
                    <h2><i class="fas fa-rocket"></i> Welcome to Menu Creator Pro!</h2>
                </div>
                <div class="modal-body" style="padding: 30px;">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <i class="fas fa-utensils" style="font-size: 3.5rem; color: var(--accent);"></i>
                        <h3 style="margin: 15px 0 8px 0;">Create Professional Menus in Minutes!</h3>
                        <p style="color: #999;">Here's what you can do:</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
                        <div style="background: var(--bg-dark); padding: 15px; border-radius: 8px; text-align: center;">
                            <i class="fas fa-magic" style="font-size: 1.8rem; color: var(--accent); margin-bottom: 8px;"></i>
                            <h4 style="margin: 0 0 5px 0; font-size: 0.95rem;">Quick Templates</h4>
                            <p style="margin: 0; font-size: 0.8rem; color: #999;">6 pre-made menus</p>
                        </div>
                        <div style="background: var(--bg-dark); padding: 15px; border-radius: 8px; text-align: center;">
                            <i class="fas fa-font" style="font-size: 1.8rem; color: var(--accent); margin-bottom: 8px;"></i>
                            <h4 style="margin: 0 0 5px 0; font-size: 0.95rem;">54 Pro Fonts</h4>
                            <p style="margin: 0; font-size: 0.8rem; color: #999;">Elegant to casual</p>
                        </div>
                        <div style="background: var(--bg-dark); padding: 15px; border-radius: 8px; text-align: center;">
                            <i class="fas fa-icons" style="font-size: 1.8rem; color: var(--accent); margin-bottom: 8px;"></i>
                            <h4 style="margin: 0 0 5px 0; font-size: 0.95rem;">79 Icons</h4>
                            <p style="margin: 0; font-size: 0.8rem; color: #999;">Food & symbols</p>
                        </div>
                        <div style="background: var(--bg-dark); padding: 15px; border-radius: 8px; text-align: center;">
                            <i class="fas fa-keyboard" style="font-size: 1.8rem; color: var(--accent); margin-bottom: 8px;"></i>
                            <h4 style="margin: 0 0 5px 0; font-size: 0.95rem;">Shortcuts</h4>
                            <p style="margin: 0; font-size: 0.8rem; color: #999;">Press <strong>?</strong> to see</p>
                        </div>
                    </div>
                    <div style="background: rgba(255,64,129,0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 0.95rem;"><i class="fas fa-lightbulb"></i> Pro Tips:</h4>
                        <ul style="margin: 0; padding-left: 20px; color: #ccc; line-height: 1.6; font-size: 0.85rem;">
                            <li>Drag & drop images onto canvas</li>
                            <li>Auto-saves every 30 seconds</li>
                            <li>Use +/- to zoom, ? for help</li>
                            <li>Export as PNG or PDF</li>
                        </ul>
                    </div>
                    <button onclick="app.closeWelcomeScreen()" style="width: 100%; padding: 15px; background: linear-gradient(135deg, var(--accent) 0%, #ff5a96 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                        <i class="fas fa-rocket"></i> Let's Get Started!
                    </button>
                    <div style="margin-top: 12px; text-align: center;">
                        <label style="color: #999; font-size: 0.8rem; cursor: pointer;">
                            <input type="checkbox" checked id="dont-show-welcome" style="margin-right: 8px;">
                            Don't show this again
                        </label>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    closeWelcomeScreen() {
        const dontShow = document.getElementById('dont-show-welcome');
        if (!dontShow || dontShow.checked) {
            localStorage.setItem('menuCreator_hasVisited', 'true');
        }
        document.querySelector('.modal')?.remove();
    },
    
    // ========== TEXT STYLE PRESETS ==========
    loadTextStyles() {
        const saved = localStorage.getItem('menuCreator_textStyles');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return this.getDefaultTextStyles();
            }
        }
        return this.getDefaultTextStyles();
    },
    
    getDefaultTextStyles() {
        return [
            { name: 'Heading 1', fontFamily: 'Cinzel', fontSize: 72, fontWeight: 'bold', fill: '#000000', textAlign: 'center' },
            { name: 'Heading 2', fontFamily: 'Playfair Display', fontSize: 48, fontWeight: 'bold', fill: '#333333', textAlign: 'center' },
            { name: 'Subheading', fontFamily: 'Montserrat', fontSize: 32, fontWeight: 'normal', fill: '#666666', textAlign: 'left' },
            { name: 'Body Text', fontFamily: 'Lato', fontSize: 24, fontWeight: 'normal', fill: '#000000', textAlign: 'left' },
            { name: 'Price', fontFamily: 'Roboto', fontSize: 28, fontWeight: 'bold', fill: '#4CAF50', textAlign: 'right' }
        ];
    },
    
    saveTextStyles() {
        localStorage.setItem('menuCreator_textStyles', JSON.stringify(this.savedTextStyles));
    },
    
    showTextStyles() {
        this.openPanel();
        const activeObj = this.canvas.getActiveObject();
        const isText = activeObj && (activeObj.type === 'textbox' || activeObj.type === 'text' || activeObj.type === 'i-text');
        
        const content = `
            <div class="section-title">Text Styles</div>
            ${isText ? `<div style="margin-bottom: 20px;"><button onclick="app.saveCurrentTextStyle()" style="width: 100%; padding: 15px; background: linear-gradient(135deg, var(--accent) 0%, #ff5a96 100%); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 10px;"><i class="fas fa-save"></i> Save Current Style</button></div>` : ''}
            
            ${this.defaultTextStyle ? `<div style="padding: 12px; background: rgba(76, 175, 80, 0.1); border: 2px solid #4CAF50; border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-check-circle" style="color: #4CAF50; font-size: 1.2rem;"></i><span style="color: #4CAF50; font-weight: bold;">Default: ${this.defaultTextStyle.name}</span></div>` : '<div style="padding: 12px; background: rgba(255,152,0,0.1); border: 2px solid #FF9800; border-radius: 8px; margin-bottom: 15px; text-align: center; color: #FF9800; font-size: 0.85rem;"><i class="fas fa-info-circle"></i> Click a style to set as default for new text</div>'}
            
            <div class="section-title" style="margin-top: 20px;">Saved Styles (${this.savedTextStyles.length})</div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                ${this.savedTextStyles.map((style, index) => `
                    <div class="text-style-card" data-index="${index}" style="background: var(--bg-dark); border: 2px solid ${this.defaultTextStyle && this.defaultTextStyle.name === style.name ? '#4CAF50' : 'var(--border-color)'}; border-radius: 8px; padding: 15px; transition: all 0.2s; cursor: pointer; position: relative;">
                        ${this.defaultTextStyle && this.defaultTextStyle.name === style.name ? '<div style="position: absolute; top: 8px; right: 8px; background: #4CAF50; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: bold;">DEFAULT</div>' : ''}
                        <div onclick="app.setDefaultTextStyle(${index})" style="flex: 1; cursor: pointer;">
                            <h3 style="margin: 0 0 5px 0; font-size: 1rem; font-family: ${style.fontFamily};">${style.name}</h3>
                            <p style="margin: 0; font-size: 0.75rem; color: #999;">${style.fontFamily} • ${style.fontSize}px • ${style.fill}</p>
                        </div>
                        <div style="display: flex; gap: 8px; margin-top: 10px;">
                            ${isText ? `<button onclick="app.applyTextStyle(${index}); event.stopPropagation();" style="flex: 1; padding: 8px; background: #2196F3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem;"><i class="fas fa-paint-brush"></i> Apply</button>` : ''}
                            <button onclick="app.deleteTextStyle(${index}); event.stopPropagation();" style="padding: 8px 12px; background: #ff4444; color: white; border: none; border-radius: 6px; cursor: pointer;"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${this.savedTextStyles.length === 0 ? `<div style="padding: 30px; text-align: center; color: #666;"><i class="fas fa-palette" style="font-size: 3rem; margin-bottom: 15px;"></i><p>No saved styles yet!</p></div>` : ''}
        `;
        this.updatePanelContent('TEXT STYLES', content);
    },
    
    setDefaultTextStyle(index) {
        this.defaultTextStyle = this.savedTextStyles[index];
        localStorage.setItem('menuCreator_defaultTextStyle', JSON.stringify(this.defaultTextStyle));
        this.showToast(`✅ "${this.defaultTextStyle.name}" set as default`, 'success');
        this.showTextStyles();
    },
    
    saveCurrentTextStyle() {
        const activeObj = this.canvas.getActiveObject();
        if (!activeObj || (activeObj.type !== 'textbox' && activeObj.type !== 'text' && activeObj.type !== 'i-text')) {
            this.showToast('Select text first', 'warning');
            return;
        }
        const name = prompt('Style name:', `Style ${this.savedTextStyles.length + 1}`);
        if (!name) return;
        this.savedTextStyles.push({
            name, fontFamily: activeObj.fontFamily, fontSize: activeObj.fontSize,
            fontWeight: activeObj.fontWeight || 'normal', fill: activeObj.fill,
            textAlign: activeObj.textAlign || 'left'
        });
        this.saveTextStyles();
        this.showToast(`✅ "${name}" saved!`, 'success');
        this.showTextStyles();
    },
    
    applyTextStyle(index) {
        const style = this.savedTextStyles[index];
        const activeObj = this.canvas.getActiveObject();
        if (!activeObj || (activeObj.type !== 'textbox' && activeObj.type !== 'text' && activeObj.type !== 'i-text')) {
            this.showToast('Select text first', 'warning');
            return;
        }
        activeObj.set({ fontFamily: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight, fill: style.fill, textAlign: style.textAlign });
        this.canvas.renderAll();
        this.saveHistory();
        this.showToast(`✨ Applied "${style.name}"`, 'success');
    },
    
    deleteTextStyle(index) {
        if (confirm(`Delete "${this.savedTextStyles[index].name}"?`)) {
            this.savedTextStyles.splice(index, 1);
            this.saveTextStyles();
            this.showToast('Deleted', 'info');
            this.showTextStyles();
        }
    },
    
    // ========== AUTO-SAVE & RECOVERY SYSTEM ==========
    setupAutoSave() {
        // Auto-save every 30 seconds
        this.autoSaveInterval = setInterval(() => {
            this.autoSave();
        }, 30000);
        
        // Also save before page unload
        window.addEventListener('beforeunload', () => {
            this.autoSave();
        });
    },
    
    autoSave() {
        if (!this.canvas || this.stage < 4) return; // Only save when in editor
        
        const saveData = {
            version: '2.4',
            timestamp: Date.now(),
            stage: this.stage,
            format: this.currentFormat,
            style: this.currentStyle,
            background: this.currentBackground,
            canvas: this.canvas.toJSON(['id', 'selectable']),
            history: this.history,
            historyIndex: this.historyIndex
        };
        
        try {
            localStorage.setItem('menuCreator_autoSave', JSON.stringify(saveData));
            this.updateLastSavedTime();
        } catch (e) {
            console.error('Auto-save failed:', e);
        }
    },
    
    checkForRecovery() {
        const savedData = localStorage.getItem('menuCreator_autoSave');
        if (!savedData) return;
        
        try {
            const data = JSON.parse(savedData);
            const savedTime = new Date(data.timestamp);
            const now = new Date();
            const minutesAgo = Math.floor((now - savedTime) / 60000);
            
            if (minutesAgo < 1440) { // Less than 24 hours old
                this.showRecoveryPrompt(data, minutesAgo);
            }
        } catch (e) {
            console.error('Recovery check failed:', e);
        }
    },
    
    showRecoveryPrompt(data, minutesAgo) {
        const timeText = minutesAgo < 60 
            ? `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`
            : `${Math.floor(minutesAgo / 60)} hour${Math.floor(minutesAgo / 60) !== 1 ? 's' : ''} ago`;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.style.zIndex = '99999';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);">
                    <h2 style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-history"></i>
                        Recover Your Work?
                    </h2>
                </div>
                <div class="modal-body" style="padding: 30px;">
                    <p style="font-size: 1rem; margin-bottom: 20px;">
                        We found an auto-saved menu from <strong>${timeText}</strong>.
                    </p>
                    <p style="font-size: 0.9rem; color: #999; margin-bottom: 30px;">
                        Would you like to recover it or start fresh?
                    </p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <button id="recover-btn" style="padding: 15px; background: #4CAF50; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1rem; transition: all 0.2s;">
                            <i class="fas fa-check"></i> Recover
                        </button>
                        <button id="start-fresh-btn" style="padding: 15px; background: var(--bg-dark); color: white; border: 2px solid var(--border-color); border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1rem; transition: all 0.2s;">
                            <i class="fas fa-times"></i> Start Fresh
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('recover-btn').addEventListener('click', () => {
            this.recoverAutoSave(data);
            modal.remove();
            this.showToast('Work recovered successfully!', 'success');
        });
        
        document.getElementById('start-fresh-btn').addEventListener('click', () => {
            localStorage.removeItem('menuCreator_autoSave');
            modal.remove();
            this.showToast('Starting fresh', 'info');
        });
    },
    
    recoverAutoSave(data) {
        this.stage = data.stage;
        this.currentFormat = data.format;
        this.currentStyle = data.style;
        this.currentBackground = data.background;
        
        if (data.format && this.formats[data.format]) {
            const format = this.formats[data.format];
            this.resizeCanvas(format.width, format.height);
        }
        
        if (data.canvas) {
            this.canvas.loadFromJSON(data.canvas, () => {
                this.canvas.renderAll();
            });
        }
        
        if (data.history) {
            this.history = data.history;
            this.historyIndex = data.historyIndex;
        }
        
        this.updateStageUI();
    },
    
    updateLastSavedTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        // Update or create last saved indicator
        let indicator = document.getElementById('last-saved');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'last-saved';
            indicator.style.cssText = `
                position: fixed;
                bottom: 80px;
                left: 20px;
                background: var(--bg-tool);
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.75rem;
                color: #999;
                border: 1px solid var(--border-color);
                z-index: 100;
                display: flex;
                align-items: center;
                gap: 8px;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            document.body.appendChild(indicator);
        }
        
        indicator.innerHTML = `
            <i class="fas fa-cloud-arrow-up" style="color: #4CAF50;"></i>
            Last saved at ${timeString}
        `;
        
        // Flash the indicator
        indicator.style.opacity = '1';
        setTimeout(() => {
            indicator.style.opacity = '0.7';
        }, 2000);
    },
    
    // ========== TOAST NOTIFICATION SYSTEM ==========
    createToastContainer() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    },
    
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        const colors = {
            success: '#4CAF50',
            error: '#ff4444',
            warning: '#ff9800',
            info: '#2196F3'
        };
        
        toast.style.cssText = `
            background: var(--bg-tool);
            border-left: 4px solid ${colors[type]};
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            color: var(--text-main);
            font-size: 0.9rem;
            min-width: 300px;
            max-width: 400px;
            pointer-events: auto;
            animation: slideInRight 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        toast.innerHTML = `
            <i class="fas ${icons[type]}" style="color: ${colors[type]}; font-size: 1.2rem;"></i>
            <span>${message}</span>
        `;
        
        document.getElementById('toast-container').appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    // ========== KEYBOARD SHORTCUTS HELP ==========
    showKeyboardShortcuts() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'shortcuts-modal';
        modal.style.zIndex = '99999';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-keyboard"></i>
                        Keyboard Shortcuts
                    </h2>
                    <i class="fas fa-times" style="cursor: pointer; font-size: 1.5rem;" onclick="document.getElementById('shortcuts-modal').remove()"></i>
                </div>
                <div class="modal-body" style="padding: 30px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <div>
                            <h3 style="color: var(--accent); margin-bottom: 15px; font-size: 1rem;">
                                <i class="fas fa-edit"></i> Editing
                            </h3>
                            <div class="shortcut-list">
                                <div class="shortcut-item">
                                    <kbd>Ctrl + Z</kbd>
                                    <span>Undo</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Ctrl + Y</kbd>
                                    <span>Redo</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Ctrl + C</kbd>
                                    <span>Copy</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Ctrl + V</kbd>
                                    <span>Paste</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Ctrl + D</kbd>
                                    <span>Duplicate</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Delete</kbd>
                                    <span>Delete object</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Backspace</kbd>
                                    <span>Delete object</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 style="color: var(--accent); margin-bottom: 15px; font-size: 1rem;">
                                <i class="fas fa-arrows-alt"></i> Navigation
                            </h3>
                            <div class="shortcut-list">
                                <div class="shortcut-item">
                                    <kbd>Esc</kbd>
                                    <span>Deselect all</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Arrow Keys</kbd>
                                    <span>Move object 1px</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Shift + Arrow</kbd>
                                    <span>Move 10px</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>?</kbd>
                                    <span>Show shortcuts</span>
                                </div>
                            </div>
                            
                            <h3 style="color: var(--accent); margin: 20px 0 15px 0; font-size: 1rem;">
                                <i class="fas fa-mouse-pointer"></i> Tips
                            </h3>
                            <div style="font-size: 0.85rem; color: #999; line-height: 1.6;">
                                • Click and drag to move objects<br>
                                • Drag corners to resize<br>
                                • Drag rotation point to rotate<br>
                                • Double-click text to edit
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 15px; background: var(--bg-dark); border-radius: 8px; text-align: center; font-size: 0.85rem; color: #999;">
                        <i class="fas fa-lightbulb" style="color: var(--accent);"></i>
                        Pro tip: Use keyboard shortcuts to speed up your workflow!
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Close on Escape
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    },
    
    setupCanvas() {
        this.canvas = new fabric.Canvas('canvas', {
            backgroundColor: '#fff',
            preserveObjectStacking: true,
            selection: true,
            selectionBorderColor: CONFIG.branding.primaryColor,
            selectionLineWidth: 3,
            selectionDashArray: [],
            selectionColor: 'rgba(255, 64, 129, 0.05)'
        });
        
        // Customize selection controls - ULTRA POLISHED PROFESSIONAL STYLING
        fabric.Object.prototype.set({
            borderColor: CONFIG.branding.primaryColor,
            cornerColor: '#FFFFFF',
            cornerStyle: 'circle',
            borderScaleFactor: 2,
            cornerSize: 16,
            transparentCorners: false,
            cornerStrokeColor: CONFIG.branding.primaryColor,
            cornerStrokeWidth: 3,
            padding: 10,
            borderOpacityWhenMoving: 0.8,
            hasRotatingPoint: true,
            rotatingPointOffset: 50,
            borderDashArray: [], // Solid clean line
            touchCornerSize: 28, // Large touch targets
            centeredRotation: true,
            centeredScaling: false,
            lockUniScaling: false
        });
        
        // Customize text controls specifically - BEAUTIFUL TEXT EDITING
        fabric.Textbox.prototype.set({
            borderColor: CONFIG.branding.primaryColor,
            cornerColor: '#FFFFFF',
            cornerStyle: 'circle',
            borderScaleFactor: 2,
            cornerSize: 16,
            transparentCorners: false,
            cornerStrokeColor: CONFIG.branding.primaryColor,
            cornerStrokeWidth: 3,
            editingBorderColor: '#4CAF50', // Green when actively typing
            padding: 10,
            borderDashArray: [],
            cursorColor: CONFIG.branding.primaryColor,
            cursorWidth: 3,
            touchCornerSize: 28,
            cursorDelay: 500,
            selectionBackgroundColor: 'rgba(100, 200, 255, 0.3)'
        });
        
        // Also customize IText (single line text)
        fabric.IText.prototype.set({
            borderColor: CONFIG.branding.primaryColor,
            cornerColor: '#FFFFFF',
            cornerStyle: 'circle',
            borderScaleFactor: 2,
            cornerSize: 16,
            transparentCorners: false,
            cornerStrokeColor: CONFIG.branding.primaryColor,
            cornerStrokeWidth: 3,
            editingBorderColor: '#4CAF50',
            padding: 10,
            borderDashArray: [],
            cursorColor: CONFIG.branding.primaryColor,
            cursorWidth: 3,
            touchCornerSize: 28,
            cursorDelay: 500,
            selectionBackgroundColor: 'rgba(100, 200, 255, 0.3)'
        });
        
        this.resizeCanvas(1920, 1080);
        
        // Event listeners with enhanced UX
        this.canvas.on('object:modified', () => this.saveHistory());
        this.canvas.on('object:added', () => this.saveHistory());
        
        // Show properties panel when selecting objects
        this.canvas.on('selection:created', (e) => {
            if (e.selected && e.selected[0]) {
                this.showPropertiesPanel(e.selected[0]);
            }
        });
        this.canvas.on('selection:updated', (e) => {
            if (e.selected && e.selected[0]) {
                this.showPropertiesPanel(e.selected[0]);
            }
        });
        this.canvas.on('selection:cleared', () => this.closePropertiesPanel());
        
        // Smooth animations on object movement
        this.canvas.on('object:moving', () => {
            this.canvas.renderAll();
        });
        
        this.canvas.on('object:scaling', () => {
            this.canvas.renderAll();
        });
        
        this.canvas.on('object:rotating', () => {
            this.canvas.renderAll();
        });
    },
    
    setupEventListeners() {
        // System bar
        document.getElementById('btn-home').addEventListener('click', () => this.reset());
        document.getElementById('btn-theme').addEventListener('click', () => this.toggleTheme());
        document.getElementById('btn-undo').addEventListener('click', () => this.undo());
        document.getElementById('btn-redo').addEventListener('click', () => this.redo());
        document.getElementById('btn-export').addEventListener('click', () => this.exportMenu());
        document.getElementById('btn-account').addEventListener('click', () => this.showAccountMenu());
        
        // Bottom menu
        document.getElementById('btn-grid').addEventListener('click', () => this.toggleGrid());
        document.getElementById('btn-safe').addEventListener('click', () => this.toggleSafeZone());
        document.getElementById('btn-front').addEventListener('click', () => this.bringToFront());
        document.getElementById('btn-forward').addEventListener('click', () => this.bringForward());
        document.getElementById('btn-backward').addEventListener('click', () => this.sendBackward());
        document.getElementById('btn-back').addEventListener('click', () => this.sendToBack());
        document.getElementById('btn-duplicate').addEventListener('click', () => this.duplicateObject());
        document.getElementById('btn-copy').addEventListener('click', () => this.copyObject());
        document.getElementById('btn-paste').addEventListener('click', () => this.pasteObject());
        document.getElementById('btn-delete').addEventListener('click', () => this.deleteObject());
        
        // Zoom controls
        document.getElementById('btn-zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('btn-zoom-out').addEventListener('click', () => this.zoomOut());
        document.getElementById('btn-zoom-reset').addEventListener('click', () => this.zoomReset());
        
        // FAB
        document.getElementById('fab-main').addEventListener('click', () => this.nextStage());
        document.getElementById('close-panel').addEventListener('click', () => this.closePanel());
        
        // File input
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileUpload(e));
        document.getElementById('logoInput').addEventListener('change', (e) => this.handleLogoUpload(e));
        document.getElementById('foodPhotoInput').addEventListener('change', (e) => this.handleFoodPhotoUpload(e));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Show keyboard shortcuts help (? key)
            if (e.key === '?' || (e.shiftKey && e.key === '/')) {
                e.preventDefault();
                this.showKeyboardShortcuts();
                return;
            }
            
            // Delete/Backspace - delete selected object
            if ((e.key === 'Delete' || e.key === 'Backspace') && this.canvas.getActiveObject()) {
                e.preventDefault();
                this.deleteObject();
            }
            // Ctrl+D - duplicate
            if (e.ctrlKey && e.key === 'd' && this.canvas.getActiveObject()) {
                e.preventDefault();
                this.duplicateObject();
            }
            // Ctrl+C - copy
            if (e.ctrlKey && e.key === 'c' && this.canvas.getActiveObject()) {
                e.preventDefault();
                this.copyObject();
            }
            // Ctrl+V - paste
            if (e.ctrlKey && e.key === 'v' && this.clipboard) {
                e.preventDefault();
                this.pasteObject();
            }
            // Ctrl+Z - undo
            if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                this.undo();
            }
            // Ctrl+Shift+Z or Ctrl+Y - redo
            if ((e.ctrlKey && e.shiftKey && e.key === 'z') || (e.ctrlKey && e.key === 'y')) {
                e.preventDefault();
                this.redo();
            }
            // Ctrl+E - export
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.exportMenu();
            }
            // Escape - deselect all
            if (e.key === 'Escape') {
                this.canvas.discardActiveObject();
                this.canvas.renderAll();
                this.closePropertiesPanel();
            }
            // + or = - zoom in
            if ((e.key === '+' || e.key === '=') && !e.ctrlKey) {
                e.preventDefault();
                this.zoomIn();
            }
            // - or _ - zoom out
            if ((e.key === '-' || e.key === '_') && !e.ctrlKey) {
                e.preventDefault();
                this.zoomOut();
            }
            // 0 - reset zoom
            if (e.key === '0' && !e.ctrlKey) {
                e.preventDefault();
                this.zoomReset();
            }
        });
        
        // Click outside modals to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
            // Click outside panel to close
            const panel = document.getElementById('main-panel');
            if (panel && panel.classList.contains('open') && !panel.contains(e.target)) {
                const toolbar = document.getElementById('dynamic-toolbar');
                if (!toolbar.contains(e.target)) {
                    this.closePanel();
                }
            }
        });
        
        // Window resize - responsive canvas
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (this.canvas && this.currentFormat) {
                    const format = this.formats[this.currentFormat];
                    this.resizeCanvas(format.width, format.height);
                }
            }, 250); // Debounce for performance
        });
        
        // ========== DRAG & DROP FILE UPLOAD ==========
        this.setupDragAndDrop();
    },
    
    setupDragAndDrop() {
        const workspace = document.getElementById('workspace');
        let dropZoneOverlay = null;
        
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            document.body.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });
        
        // Show drop zone overlay
        workspace.addEventListener('dragenter', (e) => {
            if (e.dataTransfer.types.includes('Files')) {
                if (!dropZoneOverlay) {
                    dropZoneOverlay = document.createElement('div');
                    dropZoneOverlay.style.cssText = `position: absolute; top: 60px; left: 0; right: 0; bottom: 60px; background: rgba(255, 64, 129, 0.15); border: 4px dashed var(--accent); border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 1000; pointer-events: none; backdrop-filter: blur(4px);`;
                    dropZoneOverlay.innerHTML = `<i class="fas fa-cloud-upload-alt" style="font-size: 5rem; color: var(--accent); margin-bottom: 20px;"></i><h2 style="color: var(--accent); font-size: 2rem; margin: 0;">Drop Image Here</h2><p style="color: #999; font-size: 1.2rem; margin-top: 10px;">JPG, PNG, SVG</p>`;
                    workspace.appendChild(dropZoneOverlay);
                }
                dropZoneOverlay.style.display = 'flex';
            }
        });
        
        workspace.addEventListener('dragleave', (e) => {
            if (e.target === workspace && dropZoneOverlay) {
                dropZoneOverlay.style.display = 'none';
            }
        });
        
        workspace.addEventListener('drop', (e) => {
            if (dropZoneOverlay) dropZoneOverlay.style.display = 'none';
            
            const imageFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
            if (imageFiles.length === 0) {
                this.showToast('Drop image files only', 'warning');
                return;
            }
            imageFiles.forEach(file => this.handleDroppedFile(file));
        });
    },
    
    handleDroppedFile(file) {
        if (file.size > 5 * 1024 * 1024) {
            this.showToast(`${file.name} too large (max 5MB)`, 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            fabric.Image.fromURL(e.target.result, (img) => {
                const maxSize = 400;
                if (img.width > maxSize || img.height > maxSize) {
                    img.scale(maxSize / Math.max(img.width, img.height));
                }
                img.set({ left: this.canvas.width / 2, top: this.canvas.height / 2, originX: 'center', originY: 'center' });
                this.canvas.add(img);
                this.canvas.setActiveObject(img);
                this.canvas.renderAll();
                this.saveHistory();
                this.showToast(`✅ ${file.name} added!`, 'success');
            });
        };
        reader.readAsDataURL(file);
    },
    
    loadBackgroundImages() {
        // Initialize storage
        Object.keys(this.formats).forEach(format => {
            this.backgrounds[format] = {
                previews: [],
                full: []
            };
        });
        
        // Restaurant themed backgrounds
        const backgrounds = [
            { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', name: 'Modern Restaurant' },
            { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', name: 'Fine Dining' },
            { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', name: 'Food Table' },
            { url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800', name: 'Cozy Cafe' },
            { url: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800', name: 'Pizza Oven' },
            { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', name: 'Bar Counter' },
            { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', name: 'Ingredients' },
            { url: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800', name: 'Kitchen' }
        ];
        
        Object.keys(this.formats).forEach(format => {
            backgrounds.forEach((bg, i) => {
                this.backgrounds[format].previews.push({
                    url: bg.url,
                    name: bg.name,
                    isWatermarked: true
                });
                this.backgrounds[format].full.push({
                    url: bg.url.replace('w=800', 'w=2000'),
                    name: bg.name,
                    isWatermarked: false
                });
            });
        });
    },
    
    // ========== USER IMAGE MANAGEMENT (LOCALSTORAGE) ==========
    
    loadUserImages() {
        // Load from localStorage
        const saved = localStorage.getItem('userImages');
        if (saved) {
            try {
                this.userImages = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading user images:', e);
                this.userImages = { logos: [], foodPhotos: [] };
            }
        }
    },
    
    saveUserImage(imageData, type) {
        // Type: 'logo' or 'foodPhoto'
        const timestamp = Date.now();
        const image = {
            id: `${type}_${timestamp}`,
            data: imageData,
            name: `${type}_${timestamp}`,
            type: type,
            addedAt: new Date().toISOString()
        };
        
        if (type === 'logo') {
            this.userImages.logos.push(image);
        } else if (type === 'foodPhoto') {
            this.userImages.foodPhotos.push(image);
        }
        
        // Save to localStorage
        localStorage.setItem('userImages', JSON.stringify(this.userImages));
        
        return image;
    },
    
    deleteUserImage(imageId) {
        // Remove from both arrays
        this.userImages.logos = this.userImages.logos.filter(img => img.id !== imageId);
        this.userImages.foodPhotos = this.userImages.foodPhotos.filter(img => img.id !== imageId);
        
        // Save to localStorage
        localStorage.setItem('userImages', JSON.stringify(this.userImages));
    },
    
    clearAllUserImages() {
        if (confirm('Delete all your uploaded logos and photos? This cannot be undone.')) {
            this.userImages = { logos: [], foodPhotos: [] };
            localStorage.removeItem('userImages');
            this.showToast('All user images deleted.', 'success');
        }
    },
    
    resizeCanvas(width, height) {
        const workspace = document.getElementById('workspace');
        const maxWidth = workspace.clientWidth - 80;
        const maxHeight = workspace.clientHeight - 80;
        
        const scale = Math.min(maxWidth / width, maxHeight / height, 1);
        
        this.canvas.setDimensions({ width, height });
        this.canvas.setZoom(scale);
        
        // Center the canvas
        const container = this.canvas.wrapperEl.parentElement;
        container.style.width = (width * scale) + 'px';
        container.style.height = (height * scale) + 'px';
        container.style.margin = 'auto';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        
        // Set canvas background to white (no black/white sides)
        this.canvas.backgroundColor = '#ffffff';
        this.canvas.renderAll();
    },
    
    updateStageDisplay() {
        const stages = [
            'STAGE 1: FORMAT',
            'STAGE 2: STYLE',
            'STAGE 3: BACKGROUND',
            'STAGE 4: CONTENT',
            'STAGE 5: CUSTOMIZE'
        ];
        
        document.getElementById('stage-badge').textContent = stages[this.stage - 1];
        
        const labels = [
            'SELECT FORMAT',
            'SELECT STYLE',
            'SELECT BACKGROUND',
            'ADD CONTENT',
            'FINISH & EDIT'
        ];
        
        document.getElementById('fab-label').textContent = labels[this.stage - 1];
    },
    
    // ========== STAGE 1: FORMAT SELECTION ==========
    
    showStage1() {
        this.stage = 1;
        this.updateStageDisplay();
        this.openPanel();
        
        const content = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div class="section-title" style="margin: 0;">Select Menu Format</div>
                <button onclick="app.showTemplates()" style="padding: 10px 20px; background: linear-gradient(135deg, var(--accent) 0%, #ff5a96 100%); color: white; border: none; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; transition: all 0.2s;">
                    <i class="fas fa-magic"></i> Use Template
                </button>
            </div>
            <div class="grid-2">
                ${Object.entries(this.formats).map(([key, format]) => `
                    <div class="card" data-format="${key}">
                        <i class="fas ${format.category === 'print' ? 'fa-print' : 'fa-desktop'}"></i>
                        <div>${format.name}</div>
                        <div style="font-size: 0.65rem; color: #888;">${format.width} x ${format.height}px</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.updatePanelContent('SELECT FORMAT', content);
        
        document.querySelectorAll('.card[data-format]').forEach(card => {
            card.addEventListener('click', (e) => {
                const format = e.currentTarget.dataset.format;
                this.selectFormat(format);
            });
        });
    },
    
    selectFormat(formatKey) {
        this.currentFormat = formatKey;
        const format = this.formats[formatKey];
        this.resizeCanvas(format.width, format.height);
        this.currentStyle = 'casual'; // Auto-select
        this.showStage3(); // Skip style selection
    },
    
    // ========== QUICK TEMPLATES SYSTEM ==========
    showTemplates() {
        this.openPanel();
        
        const templates = [
            { id: 'elegant-fine-dining', name: 'Elegant Fine Dining', style: 'fine-dining', format: 'letter', description: 'Classic serif fonts, gold accents', icon: 'fa-wine-glass', color: '#d4af37' },
            { id: 'modern-minimalist', name: 'Modern Minimalist', style: 'casual', format: 'letter', description: 'Clean lines, sans-serif', icon: 'fa-square', color: '#2196F3' },
            { id: 'rustic-cafe', name: 'Rustic Café', style: 'cafe', format: 'half-letter', description: 'Handwritten fonts, warm', icon: 'fa-mug-hot', color: '#8B4513' },
            { id: 'bold-pizzeria', name: 'Bold Pizzeria', style: 'pizza', format: 'letter', description: 'Big fonts, Italian vibes', icon: 'fa-pizza-slice', color: '#ff4444' },
            { id: 'fresh-vegan', name: 'Fresh & Healthy', style: 'vegan', format: 'letter', description: 'Green, modern, clean', icon: 'fa-leaf', color: '#4CAF50' },
            { id: 'asian-fusion', name: 'Asian Fusion', style: 'asian', format: 'letter', description: 'Bold colors, decorative', icon: 'fa-bowl-rice', color: '#ff5722' }
        ];
        
        const content = `
            <div class="section-title">Quick Start Templates</div>
            <p style="color: #999; font-size: 0.85rem; margin-bottom: 20px;">Choose a template to get started quickly!</p>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                ${templates.map(t => `
                    <div class="template-card" data-template="${t.id}" data-format="${t.format}" data-style="${t.style}" 
                         style="background: var(--bg-dark); border: 2px solid var(--border-color); border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.2s;">
                        <div style="width: 50px; height: 50px; background: ${t.color}; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                            <i class="fas ${t.icon}" style="font-size: 1.5rem; color: white;"></i>
                        </div>
                        <h3 style="margin: 0 0 5px 0; font-size: 1rem;">${t.name}</h3>
                        <p style="margin: 0; font-size: 0.75rem; color: #999;">${t.description}</p>
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
                <button onclick="app.showStage1()" style="padding: 10px 20px; background: var(--bg-dark); color: #999; border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; font-weight: bold;">
                    <i class="fas fa-arrow-left"></i> Start from Scratch
                </button>
            </div>
        `;
        
        this.updatePanelContent('TEMPLATES', content);
        
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('mouseenter', () => card.style.borderColor = 'var(--accent)');
            card.addEventListener('mouseleave', () => card.style.borderColor = 'var(--border-color)');
            card.addEventListener('click', () => {
                this.loadTemplate(card.dataset.template, card.dataset.format, card.dataset.style);
            });
        });
    },
    
    loadTemplate(templateId, format, style) {
        this.currentFormat = format;
        this.currentStyle = style;
        this.resizeCanvas(this.formats[format].width, this.formats[format].height);
        this.stage = 4;
        this.updateStageDisplay();
        this.closePanel();
        this.updateToolbar();
        this.applyTemplateContent(templateId);
        this.showToast('✨ Template loaded! Customize to your needs.', 'success', 4000);
    },
    
    applyTemplateContent(templateId) {
        this.canvas.clear();
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        const templates = {
            'elegant-fine-dining': {
                bg: '#f8f5f0',
                elements: [
                    { type: 'text', text: '✦', x: centerX, y: centerY * 0.15, size: 36, font: 'Georgia', color: '#c9a961', weight: 'normal' },
                    { type: 'text', text: 'LA MAISON', x: centerX, y: centerY * 0.25, size: 68, font: 'Cinzel', color: '#2c2416', weight: 'bold' },
                    { type: 'text', text: 'FINE DINING', x: centerX, y: centerY * 0.35, size: 18, font: 'Montserrat', color: '#8B7355', weight: 'normal', spacing: 8 },
                    { type: 'text', text: '◆  ◆  ◆', x: centerX, y: centerY * 0.42, size: 12, font: 'Arial', color: '#c9a961', weight: 'normal' },
                    { type: 'text', text: 'STARTERS', x: centerX, y: centerY * 0.55, size: 24, font: 'Cinzel', color: '#2c2416', weight: 'bold' },
                    { type: 'textbox', text: 'Truffle Mushroom Soup\nCreamy wild mushroom velouté, truffle oil ......... $18\n\nSeared Scallops\nPan-seared diver scallops, cauliflower purée ......... $24', x: centerX, y: centerY * 0.75, size: 16, font: 'Lora', color: '#444', width: this.canvas.width * 0.7 },
                    { type: 'text', text: '✦', x: centerX, y: centerY * 1.85, size: 24, font: 'Georgia', color: '#c9a961', weight: 'normal' }
                ]
            },
            'modern-minimalist': {
                bg: '#ffffff',
                elements: [
                    { type: 'text', text: 'MENU', x: centerX, y: centerY * 0.2, size: 96, font: 'Montserrat', color: '#000', weight: 'bold' },
                    { type: 'text', text: '—', x: centerX, y: centerY * 0.32, size: 48, font: 'Arial', color: '#000', weight: 'normal' },
                    { type: 'text', text: 'BRUNCH', x: centerX * 0.3, y: centerY * 0.5, size: 20, font: 'Montserrat', color: '#000', weight: 'bold' },
                    { type: 'textbox', text: 'Avocado Toast    $14\nSmashed avocado, poached egg\n\nPancakes    $12\nMaple syrup, fresh berries', x: centerX * 0.3, y: centerY * 0.65, size: 15, font: 'Lato', color: '#333', width: this.canvas.width * 0.35 },
                    { type: 'text', text: 'DRINKS', x: centerX * 1.7, y: centerY * 0.5, size: 20, font: 'Montserrat', color: '#000', weight: 'bold' },
                    { type: 'textbox', text: 'Coffee    $4\nLatte    $5\nJuice    $6', x: centerX * 1.7, y: centerY * 0.65, size: 15, font: 'Lato', color: '#333', width: this.canvas.width * 0.35 }
                ]
            },
            'rustic-cafe': {
                bg: '#fdf6e3',
                elements: [
                    { type: 'text', text: 'Daily Specials', x: centerX, y: centerY * 0.2, size: 72, font: 'Caveat', color: '#5D4037', weight: 'bold' },
                    { type: 'text', text: '☕', x: centerX, y: centerY * 0.35, size: 48, font: 'Arial', color: '#8B7355', weight: 'normal' },
                    { type: 'textbox', text: 'Fresh Baked Croissant ..... $4\nHomemade with French butter\n\nQuiche Lorraine ..... $9\nBacon, gruyère, caramelized onions\n\nCappuccino ..... $5\nSingle origin, locally roasted', x: centerX, y: centerY * 0.6, size: 20, font: 'Satisfy', color: '#5D4037', width: this.canvas.width * 0.75 }
                ]
            },
            'bold-pizzeria': {
                bg: '#ffffff',
                elements: [
                    { type: 'text', text: 'PIZZERIA', x: centerX, y: centerY * 0.2, size: 108, font: 'Bebas Neue', color: '#D32F2F', weight: 'bold' },
                    { type: 'text', text: 'NAPOLI', x: centerX, y: centerY * 0.32, size: 42, font: 'Bebas Neue', color: '#1B5E20', weight: 'normal' },
                    { type: 'text', text: '★  A U T H E N T I C  I T A L I A N  ★', x: centerX, y: centerY * 0.42, size: 16, font: 'Montserrat', color: '#666', weight: 'normal', spacing: 3 },
                    { type: 'textbox', text: 'MARGHERITA ..................... $15\nTomato, mozzarella, basil\n\nDIAVOLA ..................... $18\nSpicy salami, chili oil, mozzarella\n\nQUATTRO FORMAGGI ......... $19\nFour cheese blend', x: centerX, y: centerY * 0.7, size: 22, font: 'Roboto', color: '#333', width: this.canvas.width * 0.7 }
                ]
            },
            'fresh-vegan': {
                bg: '#f1f8f4',
                elements: [
                    { type: 'text', text: '🌿', x: centerX, y: centerY * 0.15, size: 56, font: 'Arial', color: '#2E7D32', weight: 'normal' },
                    { type: 'text', text: 'Plant Powered', x: centerX, y: centerY * 0.28, size: 58, font: 'Poppins', color: '#2E7D32', weight: 'bold' },
                    { type: 'text', text: 'Fresh · Organic · Delicious', x: centerX, y: centerY * 0.38, size: 20, font: 'Open Sans', color: '#558B2F', weight: 'normal' },
                    { type: 'textbox', text: 'Buddha Bowl — $16\nQuinoa, roasted vegetables, tahini\n\nGreen Smoothie — $8\nSpinach, mango, chia seeds\n\nLentil Curry — $14\nCoconut milk, fresh herbs', x: centerX, y: centerY * 0.65, size: 19, font: 'Lato', color: '#2c5530', width: this.canvas.width * 0.7 }
                ]
            },
            'asian-fusion': {
                bg: '#fff8f0',
                elements: [
                    { type: 'text', text: 'UMAMI', x: centerX, y: centerY * 0.22, size: 84, font: 'Montserrat', color: '#BF360C', weight: 'bold' },
                    { type: 'text', text: 'Asian Fusion Kitchen', x: centerX, y: centerY * 0.34, size: 22, font: 'Lato', color: '#5D4037', weight: 'normal' },
                    { type: 'text', text: '◆', x: centerX, y: centerY * 0.42, size: 20, font: 'Arial', color: '#BF360C', weight: 'normal' },
                    { type: 'textbox', text: 'Ramen Bowl ........................ $16\nPork broth, soft egg, noodles\n\nSushi Platter ..................... $28\nChef selection, 12 pieces\n\nPad Thai .............................. $14\nRice noodles, tamarind, peanuts', x: centerX, y: centerY * 0.7, size: 18, font: 'Lato', color: '#333', width: this.canvas.width * 0.75 }
                ]
            }
        };
        
        const t = templates[templateId] || templates['modern-minimalist'];
        this.canvas.backgroundColor = t.bg;
        
        t.elements.forEach(el => {
            if (el.type === 'text') {
                const text = new fabric.Text(el.text, {
                    left: el.x,
                    top: el.y,
                    fontSize: el.size,
                    fontFamily: el.font,
                    fill: el.color,
                    fontWeight: el.weight || 'normal',
                    originX: 'center',
                    originY: 'center'
                });
                if (el.spacing) text.charSpacing = el.spacing * 10;
                this.canvas.add(text);
            } else if (el.type === 'textbox') {
                this.canvas.add(new fabric.Textbox(el.text, {
                    left: el.x,
                    top: el.y,
                    fontSize: el.size,
                    fontFamily: el.font,
                    fill: el.color,
                    originX: 'center',
                    originY: 'center',
                    textAlign: 'center',
                    width: el.width
                }));
            }
        });
        
        this.canvas.renderAll();
        this.saveHistory();
    },
    
    // ========== STAGE 2: STYLE SELECTION ==========
    
    showStage2() {
        this.stage = 2;
        this.updateStageDisplay();
        
        const content = `
            <div class="section-title">Select Restaurant Style</div>
            <div class="grid-3">
                ${this.styles.map(style => `
                    <div class="card" data-style="${style.id}">
                        <i class="fas ${style.icon}"></i>
                        <div>${style.name}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.updatePanelContent('SELECT STYLE', content);
        
        document.querySelectorAll('.card[data-style]').forEach(card => {
            card.addEventListener('click', (e) => {
                const style = e.currentTarget.dataset.style;
                this.selectStyle(style);
            });
        });
    },
    
    selectStyle(styleId) {
        this.currentStyle = styleId;
        this.showStage3();
    },
    
    // ========== STAGE 3: BACKGROUND SELECTION ==========
    
    showStage3() {
        this.stage = 3;
        this.updateStageDisplay();
        
        // Use preview images for free/single, full for subscribers
        const hasFullAccess = LicenseManager.hasFeature('premiumTemplates');
        const backgrounds = hasFullAccess 
            ? this.backgrounds[this.currentFormat].full
            : this.backgrounds[this.currentFormat].previews;
        
        const content = `
            <div class="section-title">Select Background</div>
            ${!hasFullAccess ? '<div class="upgrade-hint">🔒 Upgrade for high-resolution backgrounds</div>' : ''}
            <div class="grid-2">
                ${backgrounds.map((bg, i) => `
                    <div class="card" data-bg-index="${i}">
                        <div class="card-image" style="background-image: url('${bg.url}')"></div>
                        <div>${bg.name}</div>
                    </div>
                `).join('')}
                <div class="card" id="upload-bg-btn">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <div>Upload Custom</div>
                </div>
            </div>
        `;
        
        this.updatePanelContent('SELECT BACKGROUND', content);
        
        document.querySelectorAll('.card[data-bg-index]').forEach(card => {
            card.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.bgIndex);
                this.selectBackground(index);
            });
        });
        
        document.getElementById('upload-bg-btn')?.addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
    },
    
    selectBackground(index) {
        const hasFullAccess = LicenseManager.hasFeature('premiumTemplates');
        const backgrounds = hasFullAccess 
            ? this.backgrounds[this.currentFormat].full
            : this.backgrounds[this.currentFormat].previews;
        const bg = backgrounds[index];
        
        fabric.Image.fromURL(bg.url, (img) => {
            const format = this.formats[this.currentFormat];
            
            img.scaleToWidth(format.width);
            img.scaleToHeight(format.height);
            img.set({
                left: 0,
                top: 0,
                selectable: false,
                evented: false
            });
            
            this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
            this.currentBackground = bg;
            
            this.showStage4();
        }, { crossOrigin: 'anonymous' });
    },
    
    // ========== STAGE 4: CONTENT ADDITION ==========
    
    showStage4() {
        this.stage = 4;
        this.updateStageDisplay();
        this.updateToolbar();
        this.closePanel();
        this.addTitle();
    },
    
    addTitle() {
        const text = new fabric.Textbox('Restaurant Name', {
            left: this.canvas.width / 2,
            top: 100,
            fontSize: 72,
            fontFamily: 'Playfair Display',
            fontWeight: 'bold',
            fill: '#000',
            textAlign: 'center',
            originX: 'center',
            originY: 'top'
        });
        
        this.canvas.add(text);
        this.canvas.setActiveObject(text);
        this.canvas.renderAll();
    },
    
    updateToolbar() {
        const tools = [
            { icon: 'fa-heading', label: 'Text', action: 'addText' },
            { icon: 'fa-image', label: 'Logo', action: 'showLogoLibrary' },
            { icon: 'fa-camera', label: 'Food Photo', action: 'showFoodPhotoLibrary' },
            { icon: 'fa-square', label: 'Shape', action: 'addShape' },
            { icon: 'fa-list', label: 'Menu Items', action: 'addMenuItems' },
            { icon: 'fa-palette', label: 'Colors', action: 'showColors' },
            { icon: 'fa-font', label: 'Fonts', action: 'showFonts' },
            { icon: 'fa-swatchbook', label: 'Text Styles', action: 'showTextStyles' }
        ];
        
        const toolbar = document.getElementById('dynamic-toolbar');
        toolbar.innerHTML = tools.map(tool => `
            <button class="tool-item" data-action="${tool.action}">
                <i class="fas ${tool.icon}"></i>
                <span>${tool.label}</span>
            </button>
        `).join('');
        
        document.querySelectorAll('.tool-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this[action]?.();
            });
        });
    },
    
    addText() {
        const style = this.defaultTextStyle || { fontFamily: 'Montserrat', fontSize: 36, fill: '#000', textAlign: 'center', fontWeight: 'normal' };
        
        const text = new fabric.Textbox('New Text', {
            left: this.canvas.width / 2,
            top: this.canvas.height / 2,
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
            fill: style.fill,
            textAlign: style.textAlign,
            fontWeight: style.fontWeight,
            originX: 'center',
            originY: 'center'
        });
        
        this.canvas.add(text);
        this.canvas.setActiveObject(text);
        this.canvas.renderAll();
    },
    
    // ========== LOGO LIBRARY ==========
    
    showLogoLibrary() {
        this.openPanel();
        
        const logos = this.userImages.logos;
        
        const content = `
            <div class="section-title">Your Logo Library</div>
            <div class="image-library">
                ${logos.length === 0 ? '<p class="empty-state">No logos uploaded yet</p>' : ''}
                <div class="grid-3">
                    ${logos.map(logo => `
                        <div class="image-card" data-image-id="${logo.id}">
                            <img src="${logo.data}" alt="${logo.name}">
                            <div class="image-actions">
                                <button class="btn-use-image" onclick="app.useImage('${logo.id}')">Use</button>
                                <button class="btn-delete-image" onclick="app.deleteUserImage('${logo.id}'); app.showLogoLibrary();">Delete</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="upload-section">
                <button class="export-btn" onclick="document.getElementById('logoInput').click()">
                    <i class="fas fa-upload"></i> Upload New Logo
                </button>
                <p style="font-size: 0.7rem; color: #888; margin-top: 10px;">
                    Recommended: PNG with transparent background, max 2MB
                </p>
            </div>
        `;
        
        this.updatePanelContent('LOGO LIBRARY', content);
    },
    
    // ========== FOOD PHOTO LIBRARY ==========
    
    showFoodPhotoLibrary() {
        this.openPanel();
        
        const photos = this.userImages.foodPhotos;
        
        const content = `
            <div class="section-title">Your Food Photos</div>
            <div class="image-library">
                ${photos.length === 0 ? '<p class="empty-state">No food photos uploaded yet</p>' : ''}
                <div class="grid-3">
                    ${photos.map(photo => `
                        <div class="image-card" data-image-id="${photo.id}">
                            <img src="${photo.data}" alt="${photo.name}">
                            <div class="image-actions">
                                <button class="btn-use-image" onclick="app.useImage('${photo.id}')">Use</button>
                                <button class="btn-delete-image" onclick="app.deleteUserImage('${photo.id}'); app.showFoodPhotoLibrary();">Delete</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="upload-section">
                <button class="export-btn" onclick="document.getElementById('foodPhotoInput').click()">
                    <i class="fas fa-upload"></i> Upload Food Photo
                </button>
                <p style="font-size: 0.7rem; color: #888; margin-top: 10px;">
                    JPG or PNG, max 5MB. High-quality photos work best.
                </p>
            </div>
        `;
        
        this.updatePanelContent('FOOD PHOTOS', content);
    },
    
    useImage(imageId) {
        // Find the image in user images
        let imageData = null;
        
        const logo = this.userImages.logos.find(img => img.id === imageId);
        const photo = this.userImages.foodPhotos.find(img => img.id === imageId);
        
        if (logo) imageData = logo.data;
        if (photo) imageData = photo.data;
        
        if (!imageData) {
            this.showToast('Image not found', 'error');
            return;
        }
        
        // Add to canvas
        fabric.Image.fromURL(imageData, (img) => {
            img.scaleToWidth(300);
            img.set({
                left: this.canvas.width / 2,
                top: this.canvas.height / 2,
                originX: 'center',
                originY: 'center'
            });
            
            this.canvas.add(img);
            this.canvas.setActiveObject(img);
            this.canvas.renderAll();
            
            this.closePanel();
        });
    },
    
    addImage() {
        // Generic image upload (not saved to library)
        document.getElementById('fileInput').click();
    },
    
    addShape() {
        const rect = new fabric.Rect({
            left: this.canvas.width / 2,
            top: this.canvas.height / 2,
            width: 200,
            height: 100,
            fill: CONFIG.branding.primaryColor,
            originX: 'center',
            originY: 'center'
        });
        
        this.canvas.add(rect);
        this.canvas.setActiveObject(rect);
        this.canvas.renderAll();
    },
    
    addMenuItems() {
        this.openPanel();
        
        const content = `
            <div class="section-title">Add Menu Section</div>
            <input type="text" id="section-name" placeholder="Section Name (e.g., Appetizers)" style="margin-bottom: 10px;">
            <textarea id="menu-items" placeholder="Enter menu items (one per line):
Item Name - $12.99
Description of the item" style="width: 100%; height: 200px; padding: 10px; background: var(--bg-dark); border: 1px solid var(--border-color); color: var(--text-main); border-radius: 8px; resize: vertical;"></textarea>
            <button class="export-btn" id="add-section-btn" style="width: 100%; margin-top: 10px;">ADD SECTION</button>
        `;
        
        this.updatePanelContent('MENU ITEMS', content);
        
        document.getElementById('add-section-btn')?.addEventListener('click', () => {
            const sectionName = document.getElementById('section-name').value;
            const items = document.getElementById('menu-items').value;
            
            if (sectionName && items) {
                this.createMenuSection(sectionName, items);
                this.closePanel();
            }
        });
    },
    
    createMenuSection(sectionName, itemsText) {
        const group = [];
        let yOffset = 0;
        
        const header = new fabric.Textbox(sectionName, {
            fontSize: 32,
            fontFamily: 'Playfair Display',
            fontWeight: 'bold',
            fill: '#000',
            width: 500
        });
        group.push(header);
        yOffset += 50;
        
        const items = itemsText.split('\n').filter(line => line.trim());
        items.forEach(item => {
            const text = new fabric.Textbox(item, {
                fontSize: 18,
                fontFamily: 'Montserrat',
                fill: '#333',
                width: 500,
                top: yOffset
            });
            group.push(text);
            yOffset += text.height + 15;
        });
        
        const menuGroup = new fabric.Group(group, {
            left: 100,
            top: 300
        });
        
        this.canvas.add(menuGroup);
        this.canvas.setActiveObject(menuGroup);
        this.canvas.renderAll();
    },
    
    showColors() {
        this.openPanel();
        
        const presetColors = [
            '#000000', '#FFFFFF', '#FF4081', '#E91E63', '#9C27B0', '#673AB7',
            '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
            '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
            '#795548', '#9E9E9E', '#607D8B', '#F44336', '#E040FB', '#00E676'
        ];
        
        const content = `
            <div class="section-title">Color Picker</div>
            
            <div class="color-picker-container">
                <!-- Main Color Picker -->
                <div class="main-color-picker">
                    <input type="color" id="color-picker" value="${CONFIG.branding.primaryColor}">
                    <div class="color-info">
                        <div class="color-preview" id="color-preview" style="background: ${CONFIG.branding.primaryColor};"></div>
                        <div class="color-details">
                            <input type="text" id="color-hex" value="${CONFIG.branding.primaryColor}" readonly>
                            <button class="copy-btn" id="copy-hex" title="Copy hex code">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Preset Swatches -->
                <div class="color-presets-title">QUICK COLORS</div>
                <div class="color-presets">
                    ${presetColors.map(color => `
                        <div class="color-swatch" data-color="${color}" style="background: ${color};" title="${color}"></div>
                    `).join('')}
                </div>
                
                <div class="color-hint">
                    <i class="fas fa-info-circle"></i>
                    Select an object on the canvas to change its color
                </div>
            </div>
        `;
        
        this.updatePanelContent('COLORS', content);
        
        // Main color picker
        const colorPicker = document.getElementById('color-picker');
        const colorPreview = document.getElementById('color-preview');
        const colorHex = document.getElementById('color-hex');
        
        colorPicker.addEventListener('input', (e) => {
            const color = e.target.value;
            colorPreview.style.background = color;
            colorHex.value = color;
            this.applyColorToSelected(color);
        });
        
        // Preset swatches
        document.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                colorPicker.value = color;
                colorPreview.style.background = color;
                colorHex.value = color;
                this.applyColorToSelected(color);
            });
        });
        
        // Copy hex code
        document.getElementById('copy-hex')?.addEventListener('click', () => {
            const hex = colorHex.value;
            navigator.clipboard.writeText(hex).then(() => {
                const btn = document.getElementById('copy-hex');
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 1000);
            });
        });
    },
    
    applyColorToSelected(color) {
        const activeObj = this.canvas.getActiveObject();
        if (activeObj) {
            if (activeObj.type === 'textbox' || activeObj.type === 'text' || activeObj.type === 'i-text') {
                activeObj.set('fill', color);
            } else {
                activeObj.set('fill', color);
            }
            this.canvas.renderAll();
        }
    },
    
    showFonts() {
        this.openPanel();
        
        // EXPANDED FONT LIBRARY - 50+ Restaurant-Appropriate Fonts
        const fonts = [
            // Classic & Professional
            'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Garamond',
            'Palatino', 'Bookman', 'Courier New', 'Verdana', 'Trebuchet MS',
            
            // Modern Sans-Serif
            'Montserrat', 'Roboto', 'Open Sans', 'Lato', 'Raleway',
            'Poppins', 'Nunito', 'Source Sans Pro', 'Work Sans', 'Karla',
            'Rubik', 'Inter', 'DM Sans', 'Archivo', 'Outfit',
            
            // Elegant Serif
            'Playfair Display', 'Merriweather', 'Cormorant', 'Crimson Text',
            'Libre Baskerville', 'Lora', 'Bitter', 'Cardo', 'Vollkorn',
            'EB Garamond', 'Cinzel', 'Abril Fatface',
            
            // Display & Decorative
            'Bebas Neue', 'Righteous', 'Oswald', 'Anton', 'Alfa Slab One',
            'Archivo Black', 'Patua One', 'Bungee', 'Fredoka One',
            
            // Script & Handwriting
            'Lobster', 'Pacifico', 'Dancing Script', 'Great Vibes', 'Sacramento',
            'Satisfy', 'Caveat', 'Shadows Into Light', 'Amatic SC', 'Kalam',
            'Indie Flower', 'Permanent Marker', 'Cookie', 'Allura'
        ];
        
        const content = `
            <div class="section-title">Change Font (${fonts.length} Available)</div>
            <div style="margin-bottom: 15px;">
                <input type="text" id="font-search" class="property-input" placeholder="🔍 Search fonts..." style="margin-bottom: 10px;">
            </div>
            <select class="font-select" id="font-selector" size="12" style="height: 300px; overflow-y: auto;">
                ${fonts.map(font => `<option value="${font}" style="font-family: '${font}', sans-serif; padding: 8px; font-size: 16px;">${font}</option>`).join('')}
            </select>
            <div style="margin-top: 20px;">
                <div class="section-title">Font Size</div>
                <div class="inline-control" style="width: 100%;">
                    <span class="inline-label">Size:</span>
                    <input type="range" id="font-size-slider" min="12" max="200" value="36" style="width: 100%;">
                    <span id="font-size-value" style="min-width: 50px; font-weight: bold;">36px</span>
                </div>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: var(--bg-dark); border-radius: 8px; font-size: 0.8rem; color: #999;">
                <i class="fas fa-info-circle" style="color: var(--accent);"></i>
                <strong>Tip:</strong> Select text first, then choose a font
            </div>
        `;
        
        this.updatePanelContent('FONTS', content);
        
        // Font selector
        const fontSelector = document.getElementById('font-selector');
        fontSelector?.addEventListener('change', (e) => {
            const activeObj = this.canvas.getActiveObject();
            if (activeObj && (activeObj.type === 'textbox' || activeObj.type === 'text' || activeObj.type === 'i-text')) {
                activeObj.set('fontFamily', e.target.value);
                this.canvas.renderAll();
            }
        });
        
        // Font search filter
        const fontSearch = document.getElementById('font-search');
        fontSearch?.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const options = fontSelector.options;
            
            for (let i = 0; i < options.length; i++) {
                const optionText = options[i].text.toLowerCase();
                if (optionText.includes(searchTerm)) {
                    options[i].style.display = '';
                } else {
                    options[i].style.display = 'none';
                }
            }
        });
        
        // Font size slider
        document.getElementById('font-size-slider')?.addEventListener('input', (e) => {
            document.getElementById('font-size-value').textContent = e.target.value + 'px';
            const activeObj = this.canvas.getActiveObject();
            if (activeObj && (activeObj.type === 'textbox' || activeObj.type === 'text' || activeObj.type === 'i-text')) {
                activeObj.set('fontSize', parseInt(e.target.value));
                this.canvas.renderAll();
            }
        });
    },
    
    // ========== RESTAURANT ICON LIBRARY ==========
    
    showIcons() {
        this.openPanel();
        
        // Restaurant-specific icon categories
        const iconCategories = {
            'Food & Drink': [
                { icon: 'fa-utensils', name: 'Utensils' },
                { icon: 'fa-fork-knife', name: 'Fork & Knife' },
                { icon: 'fa-plate-utensils', name: 'Plate' },
                { icon: 'fa-bowl-rice', name: 'Bowl' },
                { icon: 'fa-wine-glass', name: 'Wine Glass' },
                { icon: 'fa-champagne-glasses', name: 'Champagne' },
                { icon: 'fa-martini-glass', name: 'Cocktail' },
                { icon: 'fa-beer-mug-empty', name: 'Beer' },
                { icon: 'fa-mug-hot', name: 'Coffee' },
                { icon: 'fa-coffee', name: 'Coffee Cup' },
                { icon: 'fa-glass-water', name: 'Water' },
                { icon: 'fa-pizza-slice', name: 'Pizza' },
                { icon: 'fa-burger', name: 'Burger' },
                { icon: 'fa-hotdog', name: 'Hot Dog' },
                { icon: 'fa-drumstick-bite', name: 'Chicken' },
                { icon: 'fa-fish', name: 'Fish' },
                { icon: 'fa-shrimp', name: 'Shrimp' },
                { icon: 'fa-bread-slice', name: 'Bread' },
                { icon: 'fa-cake-candles', name: 'Cake' },
                { icon: 'fa-ice-cream', name: 'Ice Cream' },
                { icon: 'fa-cookie', name: 'Cookie' },
                { icon: 'fa-cheese', name: 'Cheese' },
                { icon: 'fa-egg', name: 'Egg' },
                { icon: 'fa-bacon', name: 'Bacon' },
                { icon: 'fa-carrot', name: 'Carrot' },
                { icon: 'fa-pepper-hot', name: 'Hot Pepper' },
                { icon: 'fa-lemon', name: 'Lemon' },
                { icon: 'fa-apple-whole', name: 'Apple' }
            ],
            'Pricing': [
                { icon: 'fa-dollar-sign', name: 'Dollar' },
                { icon: 'fa-dollar', name: 'Dollar Alt' },
                { icon: 'fa-coins', name: 'Coins' },
                { icon: 'fa-money-bill', name: 'Cash' },
                { icon: 'fa-money-bill-wave', name: 'Money' },
                { icon: 'fa-credit-card', name: 'Credit Card' },
                { icon: 'fa-wallet', name: 'Wallet' },
                { icon: 'fa-cash-register', name: 'Register' },
                { icon: 'fa-receipt', name: 'Receipt' },
                { icon: 'fa-sack-dollar', name: 'Money Bag' },
                { icon: 'fa-tag', name: 'Price Tag' },
                { icon: 'fa-tags', name: 'Tags' }
            ],
            'Dietary & Health': [
                { icon: 'fa-leaf', name: 'Vegan' },
                { icon: 'fa-seedling', name: 'Organic' },
                { icon: 'fa-heart', name: 'Healthy' },
                { icon: 'fa-heart-pulse', name: 'Heart Health' },
                { icon: 'fa-wheat-awn-slash', name: 'Gluten Free' },
                { icon: 'fa-wheat-awn', name: 'Wheat' },
                { icon: 'fa-droplet', name: 'Dairy Free' },
                { icon: 'fa-fire-flame-curved', name: 'Spicy' },
                { icon: 'fa-fire', name: 'Hot' },
                { icon: 'fa-temperature-empty', name: 'Mild' },
                { icon: 'fa-temperature-half', name: 'Medium' },
                { icon: 'fa-temperature-full', name: 'Very Hot' },
                { icon: 'fa-pepper-hot', name: 'Spice Level' },
                { icon: 'fa-ban', name: 'No' },
                { icon: 'fa-circle-xmark', name: 'Allergen' },
                { icon: 'fa-hexagon-exclamation', name: 'Warning' }
            ],
            'Awards & Badges': [
                { icon: 'fa-star', name: 'Star' },
                { icon: 'fa-star-half-stroke', name: 'Half Star' },
                { icon: 'fa-trophy', name: 'Trophy' },
                { icon: 'fa-award', name: 'Award' },
                { icon: 'fa-medal', name: 'Medal' },
                { icon: 'fa-ribbon', name: 'Ribbon' },
                { icon: 'fa-certificate', name: 'Certificate' },
                { icon: 'fa-crown', name: 'Crown' },
                { icon: 'fa-gem', name: 'Gem' },
                { icon: 'fa-sparkles', name: 'Sparkles' },
                { icon: 'fa-bolt', name: 'Popular' },
                { icon: 'fa-fire-flame-simple', name: 'Trending' },
                { icon: 'fa-thumbs-up', name: 'Recommended' },
                { icon: 'fa-heart-circle-check', name: 'Favorite' }
            ],
            'Info & Contact': [
                { icon: 'fa-phone', name: 'Phone' },
                { icon: 'fa-mobile', name: 'Mobile' },
                { icon: 'fa-envelope', name: 'Email' },
                { icon: 'fa-location-dot', name: 'Location' },
                { icon: 'fa-map-marker-alt', name: 'Map Pin' },
                { icon: 'fa-clock', name: 'Hours' },
                { icon: 'fa-calendar', name: 'Calendar' },
                { icon: 'fa-wifi', name: 'WiFi' },
                { icon: 'fa-parking', name: 'Parking' },
                { icon: 'fa-wheelchair', name: 'Accessible' },
                { icon: 'fa-baby', name: 'Kid Friendly' },
                { icon: 'fa-paw', name: 'Pet Friendly' },
                { icon: 'fa-truck', name: 'Delivery' },
                { icon: 'fa-box', name: 'Takeout' },
                { icon: 'fa-utensils', name: 'Dine In' },
                { icon: 'fa-circle-info', name: 'Info' }
            ],
            'Special Tags': [
                { icon: 'fa-plus', name: 'New' },
                { icon: 'fa-circle-plus', name: 'Add' },
                { icon: 'fa-sparkle', name: 'Special' },
                { icon: 'fa-wand-magic-sparkles', name: 'Chef Special' },
                { icon: 'fa-user-chef', name: 'Chef' },
                { icon: 'fa-hat-chef', name: 'Chef Hat' },
                { icon: 'fa-snowflake', name: 'Cold' },
                { icon: 'fa-temperature-hot', name: 'Hot Dish' },
                { icon: 'fa-leaf-oak', name: 'Seasonal' },
                { icon: 'fa-hourglass-half', name: 'Limited Time' },
                { icon: 'fa-circle-exclamation', name: 'Attention' },
                { icon: 'fa-tag', name: 'Best Seller' },
                { icon: 'fa-cart-shopping', name: 'Order' }
            ]
        };
        
        const content = `
            <div class="section-title">Restaurant Icons</div>
            
            <!-- Icon Controls -->
            <div class="icon-controls" style="margin-bottom: 20px; padding: 15px; background: var(--bg-dark); border-radius: 8px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                    <div>
                        <label style="display: block; font-size: 0.7rem; color: #999; margin-bottom: 4px;">SIZE</label>
                        <input type="range" id="icon-size" min="16" max="200" value="48" style="width: 100%;">
                        <span id="icon-size-value" style="font-size: 0.8rem; font-weight: bold;">48px</span>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.7rem; color: #999; margin-bottom: 4px;">COLOR</label>
                        <input type="color" id="icon-color" value="#000000" style="width: 100%; height: 36px; border-radius: 6px; cursor: pointer;">
                    </div>
                </div>
                <div style="font-size: 0.75rem; color: #aaa; text-align: center;">
                    <i class="fas fa-info-circle"></i> Click any icon to add it to your menu
                </div>
            </div>
            
            <!-- Category Tabs -->
            <div class="icon-tabs" style="display: flex; gap: 4px; overflow-x: auto; margin-bottom: 15px; padding-bottom: 8px;">
                ${Object.keys(iconCategories).map((category, index) => `
                    <button class="icon-tab ${index === 0 ? 'active' : ''}" data-category="${category}" 
                            style="flex-shrink: 0; padding: 8px 12px; background: ${index === 0 ? 'var(--accent)' : 'var(--bg-dark)'}; 
                                   border: 2px solid ${index === 0 ? 'var(--accent)' : 'var(--border-color)'}; border-radius: 8px; 
                                   color: ${index === 0 ? 'white' : '#999'}; font-size: 0.7rem; font-weight: bold; 
                                   cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                        ${category}
                    </button>
                `).join('')}
            </div>
            
            <!-- Icon Grid -->
            <div class="icon-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-height: 400px; overflow-y: auto; padding: 10px;">
                ${Object.keys(iconCategories).map((category, catIndex) => `
                    <div class="icon-category-content ${catIndex === 0 ? 'active' : ''}" data-category="${category}" 
                         style="grid-column: 1 / -1; display: ${catIndex === 0 ? 'grid' : 'none'}; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                        ${iconCategories[category].map(iconData => `
                            <div class="icon-item" data-icon="${iconData.icon}" 
                                 style="aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; 
                                        background: var(--bg-dark); border: 2px solid var(--border-color); border-radius: 10px; 
                                        cursor: pointer; transition: all 0.2s; padding: 12px; text-align: center;">
                                <i class="fas ${iconData.icon}" style="font-size: 1.8rem; color: var(--accent); margin-bottom: 6px;"></i>
                                <span style="font-size: 0.65rem; color: #999; font-weight: 500; line-height: 1.2;">${iconData.name}</span>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `;
        
        this.updatePanelContent('RESTAURANT ICONS', content);
        
        // Tab switching
        document.querySelectorAll('.icon-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                
                // Update tab styles
                document.querySelectorAll('.icon-tab').forEach(t => {
                    t.style.background = 'var(--bg-dark)';
                    t.style.borderColor = 'var(--border-color)';
                    t.style.color = '#999';
                    t.classList.remove('active');
                });
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.classList.add('active');
                
                // Show/hide category content
                document.querySelectorAll('.icon-category-content').forEach(content => {
                    if (content.dataset.category === category) {
                        content.style.display = 'grid';
                        content.classList.add('active');
                    } else {
                        content.style.display = 'none';
                        content.classList.remove('active');
                    }
                });
            });
        });
        
        // Icon hover effects
        document.querySelectorAll('.icon-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.borderColor = 'var(--accent)';
                item.style.transform = 'scale(1.05)';
                item.style.boxShadow = '0 4px 12px rgba(255, 64, 129, 0.3)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.borderColor = 'var(--border-color)';
                item.style.transform = 'scale(1)';
                item.style.boxShadow = 'none';
            });
        });
        
        // Icon size slider
        document.getElementById('icon-size')?.addEventListener('input', (e) => {
            document.getElementById('icon-size-value').textContent = e.target.value + 'px';
        });
        
        // Add icon to canvas
        document.querySelectorAll('.icon-item').forEach(item => {
            item.addEventListener('click', () => {
                const iconClass = item.dataset.icon;
                const size = parseInt(document.getElementById('icon-size').value);
                const color = document.getElementById('icon-color').value;
                
                // Create a group with circle background and icon text
                const circle = new fabric.Circle({
                    radius: size / 2,
                    fill: 'transparent',
                    stroke: color,
                    strokeWidth: 0
                });
                
                // Use HTML element to render Font Awesome icon, then convert to data URL
                const tempDiv = document.createElement('div');
                tempDiv.style.position = 'absolute';
                tempDiv.style.left = '-9999px';
                tempDiv.innerHTML = `<i class="fas ${iconClass}" style="font-size: ${size}px; color: ${color};"></i>`;
                document.body.appendChild(tempDiv);
                
                // Use html2canvas alternative - create as text with Unicode
                // Simpler approach: Create as styled text
                const iconText = new fabric.Text('★', {  // Fallback star
                    fontSize: size,
                    fill: color,
                    fontFamily: 'Arial',
                    fontWeight: 'bold'
                });
                
                // Map common restaurant icons to Unicode equivalents
                const iconMap = {
                    'fa-utensils': '🍴',
                    'fa-wine-glass': '🍷',
                    'fa-beer-mug-empty': '🍺',
                    'fa-mug-hot': '☕',
                    'fa-pizza-slice': '🍕',
                    'fa-burger': '🍔',
                    'fa-fish': '🐟',
                    'fa-star': '⭐',
                    'fa-heart': '❤',
                    'fa-fire': '🔥',
                    'fa-leaf': '🌿',
                    'fa-phone': '📞',
                    'fa-location-dot': '📍',
                    'fa-clock': '🕐',
                    'fa-dollar-sign': '$',
                    'fa-trophy': '🏆',
                    'fa-crown': '👑'
                };
                
                const iconChar = iconMap[iconClass] || '●';
                iconText.text = iconChar;
                
                const group = new fabric.Group([circle, iconText], {
                    left: this.canvas.width / 2,
                    top: this.canvas.height / 2,
                    originX: 'center',
                    originY: 'center'
                });
                
                this.canvas.add(group);
                this.canvas.setActiveObject(group);
                this.canvas.renderAll();
                
                document.body.removeChild(tempDiv);
                
                // Close panel
                this.closePanel();
            });
        });
    },
    
    handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Check file size (5MB limit for localStorage)
        if (file.size > 5 * 1024 * 1024) {
            this.showToast('File too large. Maximum 5MB for localStorage storage.', 'error');
            e.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result;
            
            // Just add to canvas without saving
            fabric.Image.fromURL(imageData, (img) => {
                img.scaleToWidth(300);
                img.set({
                    left: this.canvas.width / 2,
                    top: this.canvas.height / 2,
                    originX: 'center',
                    originY: 'center'
                });
                
                this.canvas.add(img);
                this.canvas.setActiveObject(img);
                this.canvas.renderAll();
            });
        };
        reader.readAsDataURL(file);
        
        e.target.value = '';
    },
    
    handleLogoUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Check file size
        if (file.size > 2 * 1024 * 1024) {
            this.showToast('Logo too large. Maximum 2MB.', 'error');
            e.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result;
            
            // Save to library
            this.saveUserImage(imageData, 'logo');
            
            this.showToast('Logo saved to your library!', 'success');
            this.showLogoLibrary();
        };
        reader.readAsDataURL(file);
        
        e.target.value = '';
    },
    
    handleFoodPhotoUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Check file size
        if (file.size > 5 * 1024 * 1024) {
            this.showToast('Photo too large. Maximum 5MB.', 'error');
            e.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result;
            
            // Save to library
            this.saveUserImage(imageData, 'foodPhoto');
            
            this.showToast('Photo saved to your library!', 'success');
            this.showFoodPhotoLibrary();
        };
        reader.readAsDataURL(file);
        
        e.target.value = '';
    },
    
    // ========== EXPORT ==========
    
    exportMenu() {
        const canExport = LicenseManager.canExport();
        
        if (!canExport.allowed) {
            if (canExport.reason === 'no_license') {
                showUpgradeModal();
            } else if (canExport.reason === 'limit_reached') {
                this.showToast("You've used your single export. Upgrade to Pro for unlimited exports!", 'warning', 4000);
                showUpgradeModal();
            }
            return;
        }
        
        // Show preview first
        this.showExportPreview();
    },
    
    showExportPreview() {
        this.canvas.discardActiveObject();
        this.canvas.renderAll();
        
        // Add watermark for preview
        let watermarkText = null;
        if (!LicenseManager.hasFeature('removeWatermark') && CONFIG.features.enableWatermark) {
            watermarkText = this.addWatermark();
        }
        
        const dataURL = this.canvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 1
        });
        
        // Remove watermark
        if (watermarkText) {
            this.canvas.remove(watermarkText);
            this.canvas.renderAll();
        }
        
        // Create preview modal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'export-preview-modal';
        modal.style.zIndex = '99999';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 90vw; max-height: 90vh;">
                <div class="modal-header">
                    <h2><i class="fas fa-eye"></i> Export Preview</h2>
                    <i class="fas fa-times" style="cursor: pointer; font-size: 1.5rem;" onclick="document.getElementById('export-preview-modal').remove()"></i>
                </div>
                <div class="modal-body" style="padding: 20px; text-align: center; overflow: auto; max-height: 70vh;">
                    <img src="${dataURL}" style="max-width: 100%; height: auto; border: 2px solid var(--border-color); border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                    
                    <div style="margin-top: 20px; font-size: 0.9rem; color: #999; margin-bottom: 15px;">
                        <i class="fas fa-info-circle"></i> Size: ${this.canvas.width} x ${this.canvas.height}px
                    </div>
                    
                    <div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                        <button id="export-png-btn" style="padding: 15px 30px; background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.2s;">
                            <i class="fas fa-image"></i> Download PNG
                        </button>
                        <button id="export-pdf-btn" style="padding: 15px 30px; background: linear-gradient(135deg, #ff4081 0%, #ff5a96 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.2s;">
                            <i class="fas fa-file-pdf"></i> Download PDF
                        </button>
                        <button onclick="document.getElementById('export-preview-modal').remove()" style="padding: 15px 30px; background: var(--bg-dark); color: #999; border: 2px solid var(--border-color); border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s;">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    </div>
                    
                    <div style="margin-top: 15px; font-size: 0.75rem; color: #666;">
                        <i class="fas fa-lightbulb"></i> <strong>PDF</strong> is recommended for printing | <strong>PNG</strong> for digital use
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // PNG export
        document.getElementById('export-png-btn').addEventListener('click', () => {
            this.downloadMenu(dataURL, 'png');
            modal.remove();
        });
        
        // PDF export
        document.getElementById('export-pdf-btn').addEventListener('click', () => {
            this.downloadMenuPDF(dataURL);
            modal.remove();
        });
        
        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    },
    
    downloadMenu(dataURL, format = 'png') {
        const link = document.createElement('a');
        link.download = `menu-${this.currentFormat}-${Date.now()}.${format}`;
        link.href = dataURL;
        link.click();
        
        // Record usage
        LicenseManager.recordExport();
        
        this.showToast(`✅ Menu exported as ${format.toUpperCase()}!`, 'success');
        
        // Show upgrade prompt if appropriate
        if (LicenseManager.shouldShowUpgradePrompt()) {
            setTimeout(() => {
                const msg = LicenseManager.getUpgradeMessage();
                if (msg && confirm(`${msg.message}\n\n${msg.cta}?`)) {
                    showUpgradeModal();
                }
            }, 1000);
        }
    },
    
    downloadMenuPDF(dataURL) {
        try {
            const { jsPDF } = window.jspdf;
            const format = this.formats[this.currentFormat];
            
            // Convert pixels to mm (at 300 DPI)
            const widthMM = (format.width / format.dpi) * 25.4;
            const heightMM = (format.height / format.dpi) * 25.4;
            
            // Create PDF
            const pdf = new jsPDF({
                orientation: format.width > format.height ? 'landscape' : 'portrait',
                unit: 'mm',
                format: [widthMM, heightMM]
            });
            
            // Add image to PDF
            pdf.addImage(dataURL, 'PNG', 0, 0, widthMM, heightMM);
            
            // Download
            pdf.save(`menu-${this.currentFormat}-${Date.now()}.pdf`);
            
            // Record usage
            LicenseManager.recordExport();
            
            this.showToast('✅ PDF exported successfully!', 'success');
            
            // Show upgrade prompt if appropriate
            if (LicenseManager.shouldShowUpgradePrompt()) {
                setTimeout(() => {
                    const msg = LicenseManager.getUpgradeMessage();
                    if (msg && confirm(`${msg.message}\n\n${msg.cta}?`)) {
                        showUpgradeModal();
                    }
                }, 1000);
            }
        } catch (e) {
            console.error('PDF export failed:', e);
            this.showToast('PDF export failed. Try PNG instead.', 'error');
        }
    },
    
    addWatermark() {
        const watermark = new fabric.Text(CONFIG.features.watermarkText, {
            left: this.canvas.width / 2,
            top: this.canvas.height / 2,
            fontSize: 120,
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
            fill: '#000',
            opacity: CONFIG.features.watermarkOpacity,
            angle: -45,
            originX: 'center',
            originY: 'center',
            selectable: false,
            evented: false
        });
        
        this.canvas.add(watermark);
        this.canvas.renderAll();
        
        return watermark;
    },
    
    // ========== UTILITIES ==========
    
    toggleGrid() {
        this.gridVisible = !this.gridVisible;
        document.getElementById('btn-grid').classList.toggle('active');
        
        if (this.gridVisible) {
            this.drawGrid();
        } else {
            // Remove grid lines
            const objects = this.canvas.getObjects();
            const gridLines = objects.filter(obj => obj.id === 'grid-line');
            gridLines.forEach(line => this.canvas.remove(line));
            this.canvas.renderAll();
        }
    },
    
    drawGrid() {
        const gridSize = 50;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Vertical lines
        for (let i = 0; i <= width / gridSize; i++) {
            const line = new fabric.Line([i * gridSize, 0, i * gridSize, height], {
                stroke: '#e0e0e0',
                strokeWidth: 1,
                selectable: false,
                evented: false,
                id: 'grid-line'
            });
            this.canvas.add(line);
            this.canvas.sendToBack(line);
        }
        
        // Horizontal lines
        for (let i = 0; i <= height / gridSize; i++) {
            const line = new fabric.Line([0, i * gridSize, width, i * gridSize], {
                stroke: '#e0e0e0',
                strokeWidth: 1,
                selectable: false,
                evented: false,
                id: 'grid-line'
            });
            this.canvas.add(line);
            this.canvas.sendToBack(line);
        }
        
        this.canvas.renderAll();
    },
    
    toggleSafeZone() {
        this.safeZoneVisible = !this.safeZoneVisible;
        document.getElementById('btn-safe').classList.toggle('active');
        
        if (this.safeZoneVisible) {
            this.drawSafeZone();
        } else {
            this.canvas.overlayImage = null;
            this.canvas.renderAll();
        }
    },
    
    drawSafeZone() {
        const margin = 100;
        const rect = new fabric.Rect({
            left: margin,
            top: margin,
            width: this.canvas.width - (margin * 2),
            height: this.canvas.height - (margin * 2),
            fill: 'transparent',
            stroke: CONFIG.branding.primaryColor,
            strokeWidth: 2,
            strokeDashArray: [10, 5],
            selectable: false,
            evented: false
        });
        
        this.canvas.overlayImage = rect;
        this.canvas.renderAll();
    },
    
    copyObject() {
        const activeObj = this.canvas.getActiveObject();
        if (!activeObj) return;
        
        activeObj.clone((cloned) => {
            this.clipboard = cloned;
        });
    },
    
    pasteObject() {
        if (!this.clipboard) return;
        
        this.clipboard.clone((cloned) => {
            cloned.set({
                left: cloned.left + 20,
                top: cloned.top + 20,
                evented: true
            });
            
            if (cloned.type === 'activeSelection') {
                cloned.canvas = this.canvas;
                cloned.forEachObject((obj) => {
                    this.canvas.add(obj);
                });
                cloned.setCoords();
            } else {
                this.canvas.add(cloned);
            }
            
            this.clipboard.top += 20;
            this.clipboard.left += 20;
            this.canvas.setActiveObject(cloned);
            this.canvas.requestRenderAll();
        });
    },
    
    deleteObject() {
        const activeObj = this.canvas.getActiveObject();
        if (!activeObj) return;
        
        if (activeObj.type === 'activeSelection') {
            activeObj.forEachObject((obj) => {
                this.canvas.remove(obj);
            });
        } else {
            this.canvas.remove(activeObj);
        }
        
        this.canvas.discardActiveObject();
        this.canvas.renderAll();
        this.closePropertiesPanel();
    },
    
    // ========== CANVAS ZOOM CONTROLS ==========
    
    zoomIn() {
        this.zoomLevel = Math.min(this.zoomLevel + 0.1, 3); // Max 300%
        this.applyZoom();
    },
    
    zoomOut() {
        this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.25); // Min 25%
        this.applyZoom();
    },
    
    zoomReset() {
        this.zoomLevel = 1;
        this.applyZoom();
    },
    
    applyZoom() {
        const canvasContainer = document.querySelector('.canvas-container');
        canvasContainer.style.transform = `scale(${this.zoomLevel})`;
        
        // Update zoom percentage display
        document.getElementById('zoom-percentage').textContent = Math.round(this.zoomLevel * 100) + '%';
        
        // Save zoom preference
        localStorage.setItem('menuCreator_zoomLevel', this.zoomLevel);
    },
    
    loadZoomPreference() {
        const saved = localStorage.getItem('menuCreator_zoomLevel');
        if (saved) {
            this.zoomLevel = parseFloat(saved);
            this.applyZoom();
        }
    },
    
    // ========== LAYER CONTROLS ==========
    
    bringToFront() {
        const obj = this.canvas.getActiveObject();
        if (obj) {
            this.canvas.bringToFront(obj);
            this.canvas.renderAll();
            this.saveHistory();
        }
    },

    bringForward() {
        const obj = this.canvas.getActiveObject();
        if (obj) {
            this.canvas.bringForward(obj);
            this.canvas.renderAll();
            this.saveHistory();
        }
    },

    sendBackward() {
        const obj = this.canvas.getActiveObject();
        if (obj) {
            this.canvas.sendBackwards(obj);
            this.canvas.renderAll();
            this.saveHistory();
        }
    },

    sendToBack() {
        const obj = this.canvas.getActiveObject();
        if (obj) {
            this.canvas.sendToBack(obj);
            this.canvas.renderAll();
            this.saveHistory();
        }
    },
    
    duplicateObject() {
        const obj = this.canvas.getActiveObject();
        if (obj) {
            obj.clone((cloned) => {
                cloned.set({
                    left: obj.left + 20,
                    top: obj.top + 20
                });
                this.canvas.add(cloned);
                this.canvas.setActiveObject(cloned);
                this.canvas.renderAll();
                this.saveHistory();
            });
        }
    },
    
    // ========== PROPERTIES PANEL ==========
    
    showPropertiesPanel(obj) {
        if (!obj) {
            this.closePropertiesPanel();
            return;
        }
        
        const panel = document.getElementById('properties-panel');
        const content = document.getElementById('properties-content');
        
        if (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text') {
            content.innerHTML = `
                <div class="property-section">
                    <label>Font Family</label>
                    <select id="prop-font" class="property-input">
                        <optgroup label="Classic">
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Garamond">Garamond</option>
                        </optgroup>
                        <optgroup label="Modern Sans-Serif">
                            <option value="Montserrat">Montserrat</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Lato">Lato</option>
                            <option value="Raleway">Raleway</option>
                            <option value="Poppins">Poppins</option>
                            <option value="Nunito">Nunito</option>
                            <option value="Work Sans">Work Sans</option>
                        </optgroup>
                        <optgroup label="Elegant Serif">
                            <option value="Playfair Display">Playfair Display</option>
                            <option value="Merriweather">Merriweather</option>
                            <option value="Cormorant">Cormorant</option>
                            <option value="Libre Baskerville">Libre Baskerville</option>
                            <option value="Lora">Lora</option>
                            <option value="EB Garamond">EB Garamond</option>
                            <option value="Cinzel">Cinzel</option>
                            <option value="Abril Fatface">Abril Fatface</option>
                        </optgroup>
                        <optgroup label="Display">
                            <option value="Bebas Neue">Bebas Neue</option>
                            <option value="Righteous">Righteous</option>
                            <option value="Oswald">Oswald</option>
                            <option value="Anton">Anton</option>
                            <option value="Archivo Black">Archivo Black</option>
                        </optgroup>
                        <optgroup label="Script">
                            <option value="Lobster">Lobster</option>
                            <option value="Pacifico">Pacifico</option>
                            <option value="Dancing Script">Dancing Script</option>
                            <option value="Great Vibes">Great Vibes</option>
                            <option value="Sacramento">Sacramento</option>
                            <option value="Satisfy">Satisfy</option>
                            <option value="Caveat">Caveat</option>
                        </optgroup>
                    </select>
                </div>
                
                <div class="property-section">
                    <label>Font Size: <span id="font-size-value">${Math.round(obj.fontSize)}</span></label>
                    <input type="range" id="prop-size" class="property-slider" min="12" max="200" value="${obj.fontSize}">
                </div>
                
                <div class="property-section">
                    <label>Text Color</label>
                    <input type="color" id="prop-color" class="property-color" value="${obj.fill || '#000000'}">
                </div>
                
                <div class="property-section">
                    <label>Text Alignment</label>
                    <div class="button-group">
                        <button class="prop-btn" data-align="left"><i class="fas fa-align-left"></i></button>
                        <button class="prop-btn" data-align="center"><i class="fas fa-align-center"></i></button>
                        <button class="prop-btn" data-align="right"><i class="fas fa-align-right"></i></button>
                    </div>
                </div>
                
                <div class="property-section">
                    <label>Text Style</label>
                    <div class="button-group">
                        <button class="prop-btn ${obj.fontWeight === 'bold' ? 'active' : ''}" id="prop-bold"><i class="fas fa-bold"></i></button>
                        <button class="prop-btn ${obj.fontStyle === 'italic' ? 'active' : ''}" id="prop-italic"><i class="fas fa-italic"></i></button>
                        <button class="prop-btn ${obj.underline ? 'active' : ''}" id="prop-underline"><i class="fas fa-underline"></i></button>
                    </div>
                </div>
                
                <div class="property-section">
                    <label>Opacity: <span id="opacity-value">${Math.round((obj.opacity || 1) * 100)}%</span></label>
                    <input type="range" id="prop-opacity" class="property-slider" min="0" max="100" value="${(obj.opacity || 1) * 100}">
                </div>
                
                <div class="property-section">
                    <button class="delete-btn" id="prop-delete">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            
            // Set up event listeners
            document.getElementById('prop-font').value = obj.fontFamily || 'Arial';
            document.getElementById('prop-font').addEventListener('change', (e) => {
                obj.set('fontFamily', e.target.value);
                this.canvas.renderAll();
            });
            
            document.getElementById('prop-size').addEventListener('input', (e) => {
                obj.set('fontSize', parseInt(e.target.value));
                document.getElementById('font-size-value').textContent = e.target.value;
                this.canvas.renderAll();
            });
            
            document.getElementById('prop-color').addEventListener('input', (e) => {
                obj.set('fill', e.target.value);
                this.canvas.renderAll();
            });
            
            document.getElementById('prop-opacity').addEventListener('input', (e) => {
                obj.set('opacity', e.target.value / 100);
                document.getElementById('opacity-value').textContent = e.target.value + '%';
                this.canvas.renderAll();
            });
            
            document.querySelectorAll('[data-align]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const align = e.currentTarget.dataset.align;
                    obj.set('textAlign', align);
                    this.canvas.renderAll();
                });
            });
            
            document.getElementById('prop-bold').addEventListener('click', () => {
                obj.set('fontWeight', obj.fontWeight === 'bold' ? 'normal' : 'bold');
                this.canvas.renderAll();
                this.showPropertiesPanel(obj);
            });
            
            document.getElementById('prop-italic').addEventListener('click', () => {
                obj.set('fontStyle', obj.fontStyle === 'italic' ? 'normal' : 'italic');
                this.canvas.renderAll();
                this.showPropertiesPanel(obj);
            });
            
            document.getElementById('prop-underline').addEventListener('click', () => {
                obj.set('underline', !obj.underline);
                this.canvas.renderAll();
                this.showPropertiesPanel(obj);
            });
            
            document.getElementById('prop-delete').addEventListener('click', () => {
                this.deleteObject();
            });
            
        } else if (obj.type === 'image') {
            content.innerHTML = `
                <div class="property-section">
                    <label>Opacity: <span id="opacity-value">${Math.round((obj.opacity || 1) * 100)}%</span></label>
                    <input type="range" id="prop-opacity" class="property-slider" min="0" max="100" value="${(obj.opacity || 1) * 100}">
                </div>
                
                <div class="property-section">
                    <label>Rotation: <span id="rotation-value">${Math.round(obj.angle || 0)}°</span></label>
                    <input type="range" id="prop-rotation" class="property-slider" min="0" max="360" value="${obj.angle || 0}">
                </div>
                
                <div class="property-section">
                    <button class="delete-btn" id="prop-delete">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            
            document.getElementById('prop-opacity').addEventListener('input', (e) => {
                obj.set('opacity', e.target.value / 100);
                document.getElementById('opacity-value').textContent = e.target.value + '%';
                this.canvas.renderAll();
            });
            
            document.getElementById('prop-rotation').addEventListener('input', (e) => {
                obj.set('angle', parseInt(e.target.value));
                document.getElementById('rotation-value').textContent = e.target.value + '°';
                this.canvas.renderAll();
            });
            
            document.getElementById('prop-delete').addEventListener('click', () => {
                this.deleteObject();
            });
            
        } else {
            content.innerHTML = `
                <div class="property-section">
                    <label>Fill Color</label>
                    <input type="color" id="prop-fill" class="property-color" value="${obj.fill || '#000000'}">
                </div>
                
                <div class="property-section">
                    <label>Opacity: <span id="opacity-value">${Math.round((obj.opacity || 1) * 100)}%</span></label>
                    <input type="range" id="prop-opacity" class="property-slider" min="0" max="100" value="${(obj.opacity || 1) * 100}">
                </div>
                
                <div class="property-section">
                    <button class="delete-btn" id="prop-delete">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            
            document.getElementById('prop-fill').addEventListener('input', (e) => {
                obj.set('fill', e.target.value);
                this.canvas.renderAll();
            });
            
            document.getElementById('prop-opacity').addEventListener('input', (e) => {
                obj.set('opacity', e.target.value / 100);
                document.getElementById('opacity-value').textContent = e.target.value + '%';
                this.canvas.renderAll();
            });
            
            document.getElementById('prop-delete').addEventListener('click', () => {
                this.deleteObject();
            });
        }
        
        panel.classList.add('open');
    },

    closePropertiesPanel() {
        const panel = document.getElementById('properties-panel');
        if (panel) {
            panel.classList.remove('open');
        }
    },
    
    saveHistory() {
        const json = JSON.stringify(this.canvas.toJSON());
        
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }
        
        this.history.push(json);
        this.historyIndex++;
        
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
    },
    
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.loadHistory(this.history[this.historyIndex]);
        }
    },
    
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.loadHistory(this.history[this.historyIndex]);
        }
    },
    
    loadHistory(json) {
        this.canvas.loadFromJSON(json, () => {
            this.canvas.renderAll();
        });
    },
    
    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    },
    
    reset() {
        if (confirm('Start over? All progress will be lost.')) {
            this.canvas.clear();
            this.stage = 1;
            this.currentFormat = null;
            this.currentStyle = null;
            this.currentBackground = null;
            this.showStage1();
        }
    },
    
    nextStage() {
        if (this.stage < this.maxStage) {
            this.stage++;
            
            switch (this.stage) {
                case 2: this.showStage2(); break;
                case 3: this.showStage3(); break;
                case 4: this.showStage4(); break;
                case 5: this.showStage5(); break;
            }
        }
    },
    
    showStage5() {
        this.stage = 5;
        this.updateStageDisplay();
        this.updateToolbar();
        this.showToast('🎉 Menu complete! Full editing control enabled.', 'success', 4000);
    },
    
    showAccountMenu() {
        if (LicenseManager.currentLicense) {
            if (confirm('Deactivate your license?')) {
                deactivateLicense();
            }
        } else {
            showLicenseModal();
        }
    },
    
    openPanel() {
        document.getElementById('main-panel').classList.add('open');
    },
    
    closePanel() {
        document.getElementById('main-panel').classList.remove('open');
    },
    
    updatePanelContent(title, content) {
        document.getElementById('panel-title').textContent = title;
        document.getElementById('panel-content').innerHTML = content;
    },
    
    onLicenseChanged() {
        // Reload backgrounds if license changed
        if (this.stage === 3) {
            this.showStage3();
        }
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
