class GEODashboard {
    constructor() {
        this.currentPage = 'setup';
        this.keywords = [];
        this.auditData = null;
        this.contentSuggestions = [];
        this.chartsRendered = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        this.bindEvents();
        this.loadSampleData();
        this.initializeTheme();
        this.showPage('setup');
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }

    bindEvents() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                if (page) {
                    this.showPage(page);
                    this.setActiveNavItem(item);
                }
            });
        });

        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        const setupForm = document.getElementById('setup-form');
        if (setupForm) {
            setupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSetupSubmit();
            });
        }

        const keywordsInput = document.getElementById('keywords');
        if (keywordsInput) {
            keywordsInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addKeyword(e.target.value.trim());
                    e.target.value = '';
                }
            });
        }

        const bulkApprove = document.getElementById('bulk-approve');
        if (bulkApprove) {
            bulkApprove.addEventListener('click', () => {
                this.bulkApprove();
            });
        }

        const bulkReject = document.getElementById('bulk-reject');
        if (bulkReject) {
            bulkReject.addEventListener('click', () => {
                this.bulkReject();
            });
        }

        const modalClose = document.getElementById('modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal();
                this.showPage('audit');
                this.setActiveNavItem(document.querySelector('[data-page="audit"]'));
            });
        }

        // Chatbot
        const chatSend = document.getElementById('chat-send');
        if (chatSend) {
            chatSend.addEventListener('click', () => {
                this.sendChatMessage();
            });
        }
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }

        // Signup form
        const signupForm = document.querySelector('.signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup();
            });
        }
    }

    // Add this new method for chat
    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const window = document.getElementById('chat-window');
        if (input.value.trim()) {
            const message = document.createElement('div');
            message.textContent = input.value;
            window.appendChild(message);
            input.value = '';
            // Simulate response
            setTimeout(() => {
                const response = document.createElement('div');
                response.textContent = "Thanks for your question. Our team will respond soon.";
                window.appendChild(response);
            }, 1000);
        }
    }

    // Add this for signup mock
    handleSignup() {
        // Mock signup - redirect to dashboard
        window.location.href = 'dashboard.html';
    }

    // ... (rest of the original app.js code remains the same, truncated for brevity)
}

// Initialize dashboard
let dashboard;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        dashboard = new GEODashboard();
        setTimeout(() => {
            if (dashboard) {
                dashboard.addKeyword('best kurtas for Diwali 2025');
                dashboard.addKeyword('traditional Indian wear online');
                dashboard.addKeyword('festive clothing India');
            }
        }, 500);
    });
} else {
    dashboard = new GEODashboard();
    setTimeout(() => {
        if (dashboard) {
            dashboard.addKeyword('best kurtas for Diwali 2025');
            dashboard.addKeyword('traditional Indian wear online');
            dashboard.addKeyword('festive clothing India');
        }
    }, 500);
}