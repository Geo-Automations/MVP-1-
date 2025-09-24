// Help page specific JavaScript
class GeoHelp {
    constructor() {
        this.articles = this.getArticlesDatabase();
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeSearch();
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('help-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchArticles(e.target.value);
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.searchArticles(e.target.value);
                }
            });
        }

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit(e.target);
            });
        }
    }

    initializeSearch() {
        // Setup search autocomplete
        const searchInput = document.getElementById('help-search-input');
        if (searchInput) {
            this.createSearchSuggestions();
        }
    }

    createSearchSuggestions() {
        const searchContainer = document.querySelector('.help-search');
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'search-suggestions';
        suggestionsDiv.id = 'search-suggestions';
        searchContainer.appendChild(suggestionsDiv);
    }

    searchArticles(query) {
        if (!query || query.length < 2) {
            this.hideSearchSuggestions();
            return;
        }

        const suggestions = this.articles
            .filter(article => 
                article.title.toLowerCase().includes(query.toLowerCase()) ||
                article.content.toLowerCase().includes(query.toLowerCase()) ||
                article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            )
            .slice(0, 5);

        this.showSearchSuggestions(suggestions);
    }

    showSearchSuggestions(suggestions) {
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (!suggestionsContainer) return;

        if (suggestions.length === 0) {
            suggestionsContainer.innerHTML = '<div class="no-results">No articles found</div>';
        } else {
            suggestionsContainer.innerHTML = suggestions.map(article => `
                <div class="suggestion-item" onclick="geoHelp.openArticle('${article.id}')">
                    <div class="suggestion-title">${article.title}</div>
                    <div class="suggestion-category">${article.category}</div>
                </div>
            `).join('');
        }

        suggestionsContainer.style.display = 'block';
    }

    hideSearchSuggestions() {
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }

    handleContactSubmit(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name') || form.querySelector('#contact-name')?.value,
            email: formData.get('email') || form.querySelector('#contact-email')?.value,
            subject: formData.get('subject') || form.querySelector('#contact-subject')?.value,
            message: formData.get('message') || form.querySelector('#contact-message')?.value
        };

        if (!data.name || !data.email || !data.subject || !data.message) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showNotification('Message sent successfully! We\'ll get back to you within 4 hours.', 'success');
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    getArticlesDatabase() {
        return [
            {
                id: 'setup-first-audit',
                title: 'How to Set Up Your First GEO Audit',
                category: 'Getting Started',
                tags: ['setup', 'audit', 'beginner'],
                content: 'Complete guide to configuring your website for AI search optimization analysis.',
                readTime: '5 min',
                helpful: 98,
                views: 1247
            },
            {
                id: 'understanding-citations',
                title: 'Understanding AI Citations and Rankings',
                category: 'GEO Optimization',
                tags: ['citations', 'rankings', 'ai'],
                content: 'Learn how AI engines cite content and what factors influence your rankings.',
                readTime: '8 min',
                helpful: 95,
                views: 892
            },
            {
                id: 'wordpress-integration',
                title: 'Connecting Your WordPress Site',
                category: 'Integrations',
                tags: ['wordpress', 'integration', 'cms'],
                content: 'Step-by-step guide to integrate GEO Automations with your WordPress website.',
                readTime: '6 min',
                helpful: 92,
                views: 654
            },
            {
                id: 'interpreting-metrics',
                title: 'How to Interpret Your GEO Metrics',
                category: 'Analytics',
                tags: ['metrics', 'analytics', 'reporting'],
                content: 'Understanding visibility scores, citation rates, and competitor benchmarks.',
                readTime: '7 min',
                helpful: 89,
                views: 423
            },
            {
                id: 'common-issues',
                title: 'Common Setup Issues and Solutions',
                category: 'Troubleshooting',
                tags: ['troubleshooting', 'issues', 'fixes'],
                content: 'Quick fixes for the most common problems users encounter during setup.',
                readTime: '4 min',
                helpful: 87,
                views: 312
            }
        ];
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
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    openArticle(articleId) {
        // In a real app, this would navigate to the article page
        const article = this.articles.find(a => a.id === articleId);
        if (article) {
            alert(`Opening article: "${article.title}"\n\nIn a real app, this would open the full article with detailed content, images, and interactive elements.`);
        }
        this.hideSearchSuggestions();
    }
}

// Global help functions
function showCategory(categoryName) {
    // Filter articles by category and show them
    const categoryDisplayNames = {
        'getting-started': 'Getting Started',
        'geo-optimization': 'GEO Optimization',
        'analytics': 'Analytics & Reporting',
        'integrations': 'Integrations',
        'billing': 'Billing & Plans',
        'troubleshooting': 'Troubleshooting'
    };
    
    const displayName = categoryDisplayNames[categoryName] || categoryName;
    alert(`Showing articles in category: ${displayName}\n\nIn a real app, this would filter and display all articles in this category with pagination and sorting options.`);
}

function startLiveChat() {
    // Open live chat widget
    const chatWidget = document.getElementById('chat-widget');
    const chatWindow = document.getElementById('chat-window');
    
    if (chatWidget && chatWindow) {
        chatWindow.style.display = 'block';
        
        // Add welcome message if not already present
        const messages = chatWindow.querySelector('.chat-messages');
        if (messages.children.length === 1) { // Only default message
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'message bot-message';
            welcomeMessage.innerHTML = '<p>Thanks for starting a chat! How can I help you today? Our average response time is 2 minutes.</p>';
            messages.appendChild(welcomeMessage);
        }
    } else {
        alert('Live Chat is currently available! Our support team responds within 2 minutes on average.');
    }
}

function scheduleDemo() {
    alert('Demo Scheduling\n\nIn a real app, this would open a calendar widget to schedule a personalized demo with our team. You\'d be able to:\n\n• Choose your preferred time slot\n• Add agenda items\n• Provide your contact information\n• Receive calendar invites');
}

function contactSupport() {
    // Scroll to contact form
    const contactSection = document.querySelector('.contact-support');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function openEmailSupport() {
    window.location.href = 'mailto:support@geoautomations.ai?subject=Support Request&body=Please describe your question or issue:';
}

function scheduleCall() {
    alert('Call Scheduling\n\nIn a real app, this would redirect to a calendar booking system where you can:\n\n• Choose available time slots\n• Select call duration (15-60 minutes)\n• Add your phone number\n• Specify topics to discuss\n• Get immediate confirmation');
}

// Initialize help page
let geoHelp;
document.addEventListener('DOMContentLoaded', () => {
    geoHelp = new GeoHelp();
    
    // Hide search suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.help-search')) {
            geoHelp.hideSearchSuggestions();
        }
    });
});

// Add help-specific styles
const helpStyles = `
    .help-hero {
        background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        padding: calc(80px + var(--space-3xl)) 0 var(--space-3xl);
        text-align: center;
    }

    .help-hero-content h1 {
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        margin-bottom: var(--space-md);
        color: var(--text-primary);
    }

    .help-hero-content p {
        font-size: 1.25rem;
        color: var(--text-secondary);
        margin-bottom: var(--space-xl);
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .help-search {
        max-width: 600px;
        margin: 0 auto var(--space-xl);
        position: relative;
    }

    .help-search input {
        width: 100%;
        padding: var(--space-md) var(--space-lg);
        padding-right: 60px;
        border: 2px solid var(--border-light);
        border-radius: var(--radius-full);
        font-size: 1.125rem;
        transition: all var(--transition-normal);
        background: var(--bg-primary);
    }

    .help-search input:focus {
        outline: none;
        border-color: var(--royal-purple);
        box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
    }

    .search-btn {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        background: var(--royal-purple);
        border: none;
        width: 44px;
        height: 44px;
        border-radius: var(--radius-full);
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
    }

    .search-btn:hover {
        background: var(--royal-blue);
        transform: translateY(-50%) scale(1.05);
    }

    .search-btn svg {
        width: 20px;
        height: 20px;
    }

    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid var(--border-light);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
        display: none;
    }

    .suggestion-item {
        padding: var(--space-md) var(--space-lg);
        cursor: pointer;
        border-bottom: 1px solid var(--border-light);
        transition: background var(--transition-fast);
    }

    .suggestion-item:hover {
        background: var(--bg-accent);
    }

    .suggestion-item:last-child {
        border-bottom: none;
    }

    .suggestion-title {
        font-weight: var(--font-weight-medium);
        color: var(--text-primary);
        margin-bottom: 2px;
    }

    .suggestion-category {
        font-size: 0.875rem;
        color: var(--text-muted);
    }

    .no-results {
        padding: var(--space-lg);
        text-align: center;
        color: var(--text-muted);
        font-style: italic;
    }

    .quick-actions {
        display: flex;
        justify-content: center;
        gap: var(--space-md);
        flex-wrap: wrap;
    }

    .quick-action {
        background: white;
        border: 2px solid var(--border-light);
        padding: var(--space-sm) var(--space-lg);
        border-radius: var(--radius-full);
        cursor: pointer;
        transition: all var(--transition-normal);
        font-weight: var(--font-weight-medium);
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .quick-action:hover {
        border-color: var(--royal-purple);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    .help-categories {
        padding: var(--space-3xl) 0;
        background: var(--bg-primary);
    }

    .help-categories h2 {
        text-align: center;
        margin-bottom: var(--space-3xl);
        color: var(--text-primary);
    }

    .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-xl);
    }

    .category-card {
        background: white;
        padding: var(--space-xl);
        border-radius: var(--radius-lg);
        border: 2px solid var(--border-light);
        text-align: center;
        cursor: pointer;
        transition: all var(--transition-normal);
        position: relative;
    }

    .category-card:hover {
        border-color: var(--royal-purple);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
    }

    .category-icon {
        font-size: 3rem;
        margin-bottom: var(--space-md);
        display: block;
    }

    .category-card h3 {
        margin-bottom: var(--space-sm);
        color: var(--text-primary);
    }

    .category-card p {
        color: var(--text-secondary);
        margin-bottom: var(--space-md);
        line-height: 1.6;
    }

    .article-count {
        background: var(--bg-accent);
        color: var(--text-muted);
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        font-weight: var(--font-weight-medium);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .popular-articles {
        padding: var(--space-3xl) 0;
        background: var(--bg-secondary);
    }

    .popular-articles h2 {
        text-align: center;
        margin-bottom: var(--space-3xl);
        color: var(--text-primary);
    }

    .articles-list {
        display: grid;
        gap: var(--space-lg);
        max-width: 800px;
        margin: 0 auto;
    }

    .article-item {
        background: white;
        padding: var(--space-xl);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-light);
        transition: all var(--transition-normal);
    }

    .article-item:hover {
        border-color: var(--royal-purple);
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
    }

    .article-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-sm);
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    .category-tag {
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        font-weight: var(--font-weight-bold);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .category-tag.getting-started {
        background: #E0F2FE;
        color: #075985;
    }

    .category-tag.geo-optimization {
        background: #F3E8FF;
        color: #7C2D92;
    }

    .category-tag.analytics {
        background: #ECFDF5;
        color: #065F46;
    }

    .category-tag.integrations {
        background: #FEF3C7;
        color: #92400E;
    }

    .category-tag.troubleshooting {
        background: #FEE2E2;
        color: #991B1B;
    }

    .read-time {
        color: var(--text-muted);
        font-size: 0.875rem;
    }

    .article-item h3 {
        margin-bottom: var(--space-sm);
    }

    .article-item h3 a {
        color: var(--text-primary);
        text-decoration: none;
        transition: color var(--transition-fast);
    }

    .article-item h3 a:hover {
        color: var(--royal-purple);
    }

    .article-item p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: var(--space-sm);
    }

    .article-stats {
        display: flex;
        gap: var(--space-md);
        font-size: 0.875rem;
        color: var(--text-muted);
    }

    .contact-support {
        padding: var(--space-3xl) 0;
        background: var(--bg-primary);
    }

    .support-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-3xl);
        align-items: start;
    }

    .support-info h2 {
        margin-bottom: var(--space-md);
        color: var(--text-primary);
    }

    .support-info > p {
        font-size: 1.125rem;
        color: var(--text-secondary);
        margin-bottom: var(--space-xl);
    }

    .support-options {
        display: grid;
        gap: var(--space-lg);
        margin-bottom: var(--space-xl);
    }

    .support-option {
        display: flex;
        gap: var(--space-md);
        padding: var(--space-lg);
        background: var(--bg-secondary);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-light);
    }

    .support-icon {
        font-size: 2rem;
        flex-shrink: 0;
    }

    .support-details h4 {
        margin-bottom: var(--space-xs);
        color: var(--text-primary);
    }

    .support-details p {
        margin-bottom: var(--space-md);
        color: var(--text-secondary);
        font-size: 0.875rem;
    }

    .response-times {
        background: var(--bg-accent);
        padding: var(--space-lg);
        border-radius: var(--radius-md);
    }

    .response-times h4 {
        margin-bottom: var(--space-md);
        color: var(--text-primary);
    }

    .response-times ul {
        list-style: none;
        padding: 0;
    }

    .response-times li {
        padding: var(--space-xs) 0;
        color: var(--text-secondary);
        font-size: 0.875rem;
    }

    .contact-form-container {
        background: white;
        padding: var(--space-xl);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-light);
        box-shadow: var(--shadow-sm);
    }

    .contact-form h3 {
        margin-bottom: var(--space-xl);
        color: var(--text-primary);
    }

    .contact-form .form-group {
        margin-bottom: var(--space-lg);
    }

    .contact-form label {
        display: block;
        margin-bottom: var(--space-xs);
        font-weight: var(--font-weight-medium);
        color: var(--text-primary);
    }

    .contact-form input,
    .contact-form select,
    .contact-form textarea {
        width: 100%;
        padding: var(--space-sm) var(--space-md);
        border: 2px solid var(--border-light);
        border-radius: var(--radius-md);
        font-size: 1rem;
        transition: all var(--transition-fast);
        background: var(--bg-primary);
        font-family: inherit;
    }

    .contact-form input:focus,
    .contact-form select:focus,
    .contact-form textarea:focus {
        outline: none;
        border-color: var(--royal-purple);
        box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
    }

    .contact-form textarea {
        resize: vertical;
        min-height: 120px;
    }

    @media (max-width: 768px) {
        .support-content {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
        }
        
        .quick-actions {
            flex-direction: column;
            align-items: center;
        }
        
        .categories-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
        }
        
        .article-meta {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .help-search input {
            font-size: 1rem;
            padding: var(--space-sm) var(--space-md);
            padding-right: 50px;
        }
        
        .search-btn {
            width: 36px;
            height: 36px;
        }
    }
`;

// Inject help-specific styles
const helpStyleElement = document.createElement('style');
helpStyleElement.textContent = helpStyles;
document.head.appendChild(helpStyleElement);