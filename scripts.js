// GEO Automations - Main JavaScript
class GEOApp {
    constructor() {
        this.currentUser = null;
        this.trialDaysLeft = 7;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupCharts();
        this.initializeFAQ();
        this.checkAuthStatus();
    }

    setupEventListeners() {
        // Navigation
        document.addEventListener('DOMContentLoaded', () => {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');

            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                });
            }

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Pricing toggle
            const pricingSwitch = document.getElementById('pricing-switch');
            if (pricingSwitch) {
                pricingSwitch.addEventListener('change', this.togglePricing);
            }

            // Form submissions
            this.setupForms();
        });

        // Window events
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    }

    setupForms() {
        // Login form
        const loginForm = document.querySelector('#login-modal form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e.target);
            });
        }

        // Signup form
        const signupForm = document.querySelector('#signup-modal form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup(e.target);
            });
        }
    }

    handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email') || form.querySelector('#login-email')?.value;
        const password = formData.get('password') || form.querySelector('#login-password')?.value;

        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="spinner"></span> Signing in...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Mock successful login
            this.currentUser = {
                name: 'Demo User',
                email: email,
                plan: 'Professional',
                trialDaysLeft: 7
            };

            this.showNotification('Welcome back!', 'success');
            this.closeModal('login-modal');
            this.redirectToDashboard();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    handleSignup(form) {
        const formData = new FormData(form);
        const name = formData.get('name') || form.querySelector('#signup-name')?.value;
        const email = formData.get('email') || form.querySelector('#signup-email')?.value;
        const password = formData.get('password') || form.querySelector('#signup-password')?.value;
        const website = formData.get('website') || form.querySelector('#signup-website')?.value;

        if (!name || !email || !password) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="spinner"></span> Creating account...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Mock successful signup
            this.currentUser = {
                name: name,
                email: email,
                website: website,
                plan: 'Trial',
                trialDaysLeft: 7
            };

            this.showNotification('Account created! Welcome to GEO Automations!', 'success');
            this.closeModal('signup-modal');
            this.redirectToDashboard();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    redirectToDashboard() {
        // In a real app, this would redirect to dashboard.html
        // For demo, we'll simulate it
        setTimeout(() => {
            if (confirm('Welcome! Would you like to go to your dashboard to set up your first GEO audit?')) {
                this.showDashboardDemo();
            }
        }, 1000);
    }

    showDashboardDemo() {
        // Create a simulated dashboard experience
        document.body.innerHTML = this.getDashboardHTML();
        this.initializeDashboard();
    }

    getDashboardHTML() {
        return `
            <div class="dashboard-container">
                <aside class="sidebar">
                    <div class="sidebar-header">
                        <div class="logo">GEO Automations</div>
                    </div>
                    <nav class="nav-menu">
                        <a href="#" class="nav-item active" data-page="setup">
                            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-10-5z"></path>
                            </svg>
                            Setup
                        </a>
                        <a href="#" class="nav-item" data-page="audit">
                            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11l3 3L22 4"></path>
                            </svg>
                            Audit Results
                        </a>
                        <a href="#" class="nav-item" data-page="optimization">
                            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                            Optimization
                        </a>
                        <a href="#" class="nav-item" data-page="analytics">
                            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                            Analytics
                        </a>
                    </nav>
                </aside>
                <main class="main-content">
                    <div class="trial-banner">
                        <div class="trial-info">
                            <h4>Free Trial Active</h4>
                            <p>${this.trialDaysLeft} days remaining - Upgrade to continue after trial</p>
                        </div>
                        <button class="btn-secondary" onclick="openModal('upgrade-modal')">Upgrade Now</button>
                    </div>
                    <div id="setup-page" class="page-content active">
                        <div class="page-header">
                            <h1>Welcome to GEO Automations</h1>
                            <p class="page-description">Let's set up your first AI optimization audit</p>
                        </div>
                        <div class="setup-wizard">
                            <div class="setup-card">
                                <h3>Quick Setup</h3>
                                <form id="dashboard-setup-form">
                                    <div class="form-group">
                                        <label>Website URL</label>
                                        <input type="url" value="${this.currentUser?.website || ''}" placeholder="https://yourwebsite.com" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Target Keywords (Press Enter to add)</label>
                                        <input type="text" id="keywords-input" placeholder="e.g., best software for...">
                                        <div class="keywords-list" id="keywords-list"></div>
                                    </div>
                                    <div class="form-group">
                                        <label>AI Platforms to Monitor</label>
                                        <div class="checkbox-grid">
                                            <label class="checkbox-item">
                                                <input type="checkbox" value="chatgpt" checked>
                                                <span class="checkmark"></span>
                                                ChatGPT
                                            </label>
                                            <label class="checkbox-item">
                                                <input type="checkbox" value="gemini" checked>
                                                <span class="checkmark"></span>
                                                Google Gemini
                                            </label>
                                            <label class="checkbox-item">
                                                <input type="checkbox" value="perplexity" checked>
                                                <span class="checkmark"></span>
                                                Perplexity
                                            </label>
                                            <label class="checkbox-item">
                                                <input type="checkbox" value="claude">
                                                <span class="checkmark"></span>
                                                Claude
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn-primary btn-full">Start GEO Audit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div id="audit-page" class="page-content">
                        <div class="page-header">
                            <h1>AI Audit Results</h1>
                            <p class="page-description">Your current AI search presence analysis</p>
                        </div>
                        <div class="audit-results">
                            <div class="results-summary">
                                <div class="summary-card">
                                    <h3>Visibility Score</h3>
                                    <div class="score">73%</div>
                                    <p>Above average but room for improvement</p>
                                </div>
                                <div class="summary-card">
                                    <h3>Citations Found</h3>
                                    <div class="score">24</div>
                                    <p>Across 5 AI platforms this month</p>
                                </div>
                                <div class="summary-card">
                                    <h3>Competitor Gap</h3>
                                    <div class="score">-17%</div>
                                    <p>Behind top competitor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }

    initializeDashboard() {
        // Dashboard specific initialization
        const setupForm = document.getElementById('dashboard-setup-form');
        if (setupForm) {
            setupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.startAudit();
            });
        }

        // Keywords input
        const keywordsInput = document.getElementById('keywords-input');
        if (keywordsInput) {
            keywordsInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addKeyword(e.target.value.trim());
                    e.target.value = '';
                }
            });
        }

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchDashboardPage(item.dataset.page);
            });
        });
    }

    addKeyword(keyword) {
        if (!keyword) return;
        
        const keywordsList = document.getElementById('keywords-list');
        if (!keywordsList) return;

        const keywordTag = document.createElement('span');
        keywordTag.className = 'keyword-tag';
        keywordTag.innerHTML = `
            ${keyword}
            <button type="button" onclick="this.parentElement.remove()">&times;</button>
        `;
        keywordsList.appendChild(keywordTag);
    }

    switchDashboardPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageId}"]`)?.classList.add('active');
    }

    startAudit() {
        const submitBtn = document.querySelector('#dashboard-setup-form button[type="submit"]');
        submitBtn.innerHTML = '<span class="spinner"></span> Running audit...';
        submitBtn.disabled = true;

        setTimeout(() => {
            this.showNotification('Audit completed! Check your results.', 'success');
            this.switchDashboardPage('audit');
            submitBtn.innerHTML = 'Start GEO Audit';
            submitBtn.disabled = false;
        }, 3000);
    }

    initializeAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .pricing-card, .insight-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupCharts() {
        const comparisonChart = document.getElementById('comparisonChart');
        if (comparisonChart) {
            const ctx = comparisonChart.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Traditional SEO',
                        data: [12, 19, 15, 17, 18, 20],
                        borderColor: '#E17055',
                        backgroundColor: 'rgba(225, 112, 85, 0.1)',
                        tension: 0.4
                    }, {
                        label: 'GEO Optimization',
                        data: [15, 25, 35, 42, 55, 68],
                        borderColor: '#6C5CE7',
                        backgroundColor: 'rgba(108, 92, 231, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Visibility Score'
                            }
                        }
                    }
                }
            });
        }
    }

    initializeFAQ() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    togglePricing() {
        const monthlyPrices = document.querySelectorAll('.monthly-price');
        const annualPrices = document.querySelectorAll('.annual-price');
        const isAnnual = document.getElementById('pricing-switch').checked;

        monthlyPrices.forEach(price => {
            price.style.display = isAnnual ? 'none' : 'inline';
        });

        annualPrices.forEach(price => {
            price.style.display = isAnnual ? 'inline' : 'none';
        });
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    handleResize() {
        // Handle responsive behavior
        const chatWindow = document.getElementById('chat-window');
        if (window.innerWidth <= 768 && chatWindow) {
            chatWindow.style.width = '90vw';
            chatWindow.style.right = '5vw';
        }
    }

    checkAuthStatus() {
        // Check if user is already logged in (localStorage/sessionStorage)
        const savedUser = localStorage.getItem('geo_user');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.updateUIForLoggedInUser();
            } catch (e) {
                localStorage.removeItem('geo_user');
            }
        }
    }

    updateUIForLoggedInUser() {
        const navAuth = document.querySelector('.nav-auth');
        if (navAuth && this.currentUser) {
            navAuth.innerHTML = `
                <span>Welcome, ${this.currentUser.name}</span>
                <button class="btn-primary" onclick="geoApp.redirectToDashboard()">Dashboard</button>
                <button class="btn-secondary" onclick="geoApp.logout()">Logout</button>
            `;
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('geo_user');
        location.reload();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Global Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function switchModal(currentModalId, newModalId) {
    closeModal(currentModalId);
    setTimeout(() => openModal(newModalId), 300);
}

function selectPlan(planName) {
    // Store selected plan and open signup
    sessionStorage.setItem('selected_plan', planName);
    openModal('signup-modal');
}

function startFreeTrial() {
    openModal('signup-modal');
}

function watchDemo() {
    // Open demo video or redirect to demo page
    window.open('https://www.youtube.com/watch?v=demo', '_blank');
}

// Chat Functions
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
        const isVisible = chatWindow.style.display !== 'none';
        chatWindow.style.display = isVisible ? 'none' : 'block';
    }
}

function openChat() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
        chatWindow.style.display = 'block';
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const messagesContainer = document.querySelector('.chat-messages');
    
    if (input && input.value.trim()) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `<p>${input.value}</p>`;
        messagesContainer.appendChild(userMessage);

        // Clear input
        const userInput = input.value;
        input.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.innerHTML = `<p>Thanks for your message! Our support team will get back to you soon. For immediate help, check our <a href="#faq">FAQ section</a>.</p>`;
            messagesContainer.appendChild(botMessage);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize app
let geoApp;
document.addEventListener('DOMContentLoaded', () => {
    geoApp = new GEOApp();
});

// Handle pricing switch
document.addEventListener('DOMContentLoaded', () => {
    const pricingSwitch = document.getElementById('pricing-switch');
    if (pricingSwitch) {
        pricingSwitch.addEventListener('change', () => {
            const monthlyPrices = document.querySelectorAll('.monthly-price');
            const annualPrices = document.querySelectorAll('.annual-price');
            const isAnnual = pricingSwitch.checked;

            monthlyPrices.forEach(price => {
                price.style.display = isAnnual ? 'none' : 'inline';
            });

            annualPrices.forEach(price => {
                price.style.display = isAnnual ? 'inline' : 'none';
            });
        });
    }
});

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key closes modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    // Enter key in chat input sends message
    if (e.key === 'Enter' && e.target.id === 'chat-input') {
        e.preventDefault();
        sendMessage();
    }
});

// Additional styling for notifications
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        padding: 1rem 1.5rem;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid #6C5CE7;
    }

    .notification-success {
        border-left-color: #00B894;
        background: linear-gradient(135deg, #ffffff 0%, #f0fff4 100%);
    }

    .notification-error {
        border-left-color: #E74C3C;
        background: linear-gradient(135deg, #ffffff 0%, #fff5f5 100%);
    }

    .notification button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.7;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .keyword-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: #F3F4F6;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
        margin: 0.25rem;
        border: 1px solid #E5E7EB;
    }

    .keyword-tag button {
        background: none;
        border: none;
        color: #6B7280;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
        line-height: 1;
    }

    .keyword-tag button:hover {
        color: #EF4444;
    }

    .setup-card {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        margin: 0 auto;
    }

    .checkbox-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 0.5rem;
    }

    .checkbox-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-weight: 500;
    }

    .checkbox-item input[type="checkbox"] {
        display: none;
    }

    .checkmark {
        width: 18px;
        height: 18px;
        border: 2px solid #D1D5DB;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .checkbox-item input[type="checkbox"]:checked + .checkmark {
        background: #6C5CE7;
        border-color: #6C5CE7;
    }

    .checkbox-item input[type="checkbox"]:checked + .checkmark::after {
        content: '✓';
        color: white;
        font-size: 12px;
        font-weight: bold;
    }

    .results-summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .summary-card {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        text-align: center;
        border: 1px solid #E5E7EB;
    }

    .summary-card h3 {
        margin-bottom: 1rem;
        color: #374151;
        font-size: 1rem;
        font-weight: 600;
    }

    .summary-card .score {
        font-size: 3rem;
        font-weight: bold;
        color: #6C5CE7;
        margin-bottom: 0.5rem;
        display: block;
    }

    .summary-card p {
        color: #6B7280;
        font-size: 0.875rem;
        margin: 0;
    }
`;

// Inject notification styles
const style = document.createElement('style');
style.textContent = notificationStyles;
document.head.appendChild(style);