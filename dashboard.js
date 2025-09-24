// Dashboard specific JavaScript
class GeoDashboard {
    constructor() {
        this.currentPage = 'setup';
        this.keywords = [];
        this.auditData = null;
        this.contentSuggestions = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSampleData();
        this.showPage('setup');
        this.initializeCharts();
    }

    bindEvents() {
        // Navigation
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

        // Setup form
        const setupForm = document.getElementById('setup-form');
        if (setupForm) {
            setupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSetupSubmit();
            });
        }

        // Keywords input
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

        // Workflow controls
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

        // Modal close
        const modalClose = document.getElementById('modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal('success-modal');
                this.showPage('audit');
                this.setActiveNavItem(document.querySelector('[data-page="audit"]'));
            });
        }

        // View results button
        const viewResults = document.getElementById('view-results');
        if (viewResults) {
            viewResults.addEventListener('click', () => {
                this.closeModal('success-modal');
                this.showPage('audit');
                this.setActiveNavItem(document.querySelector('[data-page="audit"]'));
            });
        }
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            
            // Initialize page-specific content
            setTimeout(() => {
                this.initializePage(pageId);
            }, 10);
        }
    }

    initializePage(pageId) {
        switch(pageId) {
            case 'audit':
                this.renderAuditResults();
                break;
            case 'optimization':
                this.renderOptimizationSuggestions();
                break;
            case 'workflow':
                this.renderWorkflowTasks();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            case 'publishing':
                this.renderPublishingStatus();
                break;
        }
    }

    setActiveNavItem(activeItem) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    addKeyword(keyword) {
        if (keyword && keyword.length > 0 && !this.keywords.includes(keyword)) {
            this.keywords.push(keyword);
            this.renderKeywordTags();
        }
    }

    removeKeyword(keyword) {
        this.keywords = this.keywords.filter(k => k !== keyword);
        this.renderKeywordTags();
    }

    renderKeywordTags() {
        const container = document.getElementById('keyword-tags');
        if (!container) return;

        container.innerHTML = '';
        this.keywords.forEach(keyword => {
            const tag = document.createElement('div');
            tag.className = 'keyword-tag';
            tag.innerHTML = `
                ${keyword}
                <button type="button" onclick="dashboard.removeKeyword('${keyword}')">&times;</button>
            `;
            container.appendChild(tag);
        });
    }

    handleSetupSubmit() {
        const websiteUrl = document.getElementById('website-url')?.value;
        const pageUrls = document.getElementById('page-urls')?.value;
        const selectedPlatforms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

        if (!websiteUrl) {
            this.showNotification('Please enter a website URL', 'error');
            return;
        }

        if (this.keywords.length === 0) {
            this.showNotification('Please add at least one keyword', 'error');
            return;
        }

        const formData = {
            websiteUrl,
            keywords: this.keywords,
            pageUrls: pageUrls ? pageUrls.split('\n').filter(url => url.trim()) : [],
            aiPlatforms: selectedPlatforms
        };

        console.log('Form data:', formData);

        // Show loading
        this.showLoading();

        // Simulate audit process
        setTimeout(() => {
            this.hideLoading();
            this.showModal('success-modal');
        }, 3000);
    }

    showLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    loadSampleData() {
        // Sample audit results
        this.auditData = [
            {
                platform: "ChatGPT",
                keyword: "best kurtas for Diwali 2025",
                ranking: 3,
                cited: true,
                competitors: ["Myntra", "Ajio", "FabIndia"]
            },
            {
                platform: "Gemini",
                keyword: "traditional Indian wear online",
                ranking: 7,
                cited: false,
                competitors: ["Nykaa Fashion", "Meesho", "Amazon Fashion"]
            },
            {
                platform: "Perplexity",
                keyword: "festive clothing India",
                ranking: 1,
                cited: true,
                competitors: ["W for Woman", "Biba", "Global Desi"]
            }
        ];

        // Sample content suggestions
        this.contentSuggestions = [
            {
                id: 1,
                page: "Product Page - Silk Kurtas",
                current: "Our silk kurtas are made from premium fabric",
                recommended: "Our premium silk kurtas feature hand-woven fabrics sourced from Banaras, perfect for Diwali celebrations. Each piece combines traditional craftsmanship with contemporary designs.",
                reasoning: "More specific, includes cultural context and location references for better AI visibility",
                status: "pending"
            },
            {
                id: 2,
                page: "FAQ Section",
                current: "Basic return policy",
                recommended: "Add comprehensive FAQ section covering: 'What size kurta should I choose for Diwali?', 'How to care for silk kurtas?', 'Best kurta colors for festivals?'",
                reasoning: "AI tools favor detailed FAQ sections with conversational questions",
                status: "pending"
            }
        ];
    }

    renderAuditResults() {
        const tableBody = document.querySelector('#audit-table tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        this.auditData.forEach(result => {
            const row = document.createElement('tr');
            const rankingClass = result.ranking === 1 ? 'ranking-1' : 
                                result.ranking <= 3 ? 'ranking-2-3' : 'ranking-4-plus';
            
            row.innerHTML = `
                <td>${result.platform}</td>
                <td>${result.keyword}</td>
                <td><span class="ranking-badge ${rankingClass}">${result.ranking}</span></td>
                <td>${result.cited ? '✓ Yes' : '✗ No'}</td>
                <td><div class="competitors-list">${result.competitors.join(', ')}</div></td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderOptimizationSuggestions() {
        const container = document.getElementById('suggestions-container');
        if (!container) return;

        container.innerHTML = '';
        this.contentSuggestions.forEach(suggestion => {
            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.innerHTML = `
                <div class="suggestion-header">
                    <h4>${suggestion.page}</h4>
                    <span class="status-badge status-${suggestion.status}">${suggestion.status}</span>
                </div>
                <div class="suggestion-body">
                    <div class="content-comparison">
                        <div class="content-section">
                            <h5>Current</h5>
                            <div class="content-text">${suggestion.current}</div>
                        </div>
                        <div class="content-section">
                            <h5>Recommended</h5>
                            <div class="content-text editable">${suggestion.recommended}</div>
                        </div>
                    </div>
                    <div class="suggestion-reasoning">
                        <strong>Why this change:</strong> ${suggestion.reasoning}
                    </div>
                    <div class="suggestion-actions">
                        <button class="btn-secondary" onclick="dashboard.rejectSuggestion(${suggestion.id})">Reject</button>
                        <button class="btn-primary" onclick="dashboard.acceptSuggestion(${suggestion.id})">Accept</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    acceptSuggestion(id) {
        const suggestion = this.contentSuggestions.find(s => s.id === id);
        if (suggestion) {
            suggestion.status = 'accepted';
            this.showNotification('Suggestion accepted!', 'success');
            this.renderOptimizationSuggestions();
        }
    }

    rejectSuggestion(id) {
        const suggestion = this.contentSuggestions.find(s => s.id === id);
        if (suggestion) {
            suggestion.status = 'rejected';
            this.showNotification('Suggestion rejected', 'info');
            this.renderOptimizationSuggestions();
        }
    }

    renderWorkflowTasks() {
        const container = document.getElementById('workflow-tasks');
        if (!container) return;

        const acceptedSuggestions = this.contentSuggestions.filter(s => s.status === 'accepted');
        
        if (acceptedSuggestions.length === 0) {
            container.innerHTML = '<p>No pending tasks. Accept some suggestions from the Optimization page to see them here.</p>';
            return;
        }

        container.innerHTML = '';
        acceptedSuggestions.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <div class="task-info">
                    <h4>${task.page}</h4>
                    <p>Content optimization ready for review</p>
                </div>
                <div class="task-actions">
                    <button class="btn-secondary">Edit</button>
                    <button class="btn-primary">Approve & Publish</button>
                </div>
            `;
            container.appendChild(taskItem);
        });
    }

    bulkApprove() {
        this.contentSuggestions.forEach(suggestion => {
            if (suggestion.status === 'accepted') {
                suggestion.status = 'approved';
            }
        });
        this.showNotification('All tasks approved!', 'success');
        this.renderWorkflowTasks();
    }

    bulkReject() {
        this.contentSuggestions.forEach(suggestion => {
            if (suggestion.status === 'accepted') {
                suggestion.status = 'rejected';
            }
        });
        this.showNotification('All tasks rejected', 'info');
        this.renderWorkflowTasks();
    }

    renderAnalytics() {
        // Render competitor table
        const competitorTable = document.getElementById('competitor-table');
        if (competitorTable) {
            const competitors = [
                { name: 'Competitor A', score: 85 },
                { name: 'Competitor B', score: 78 },
                { name: 'Your Site', score: 73 },
                { name: 'Competitor C', score: 65 }
            ];

            competitorTable.innerHTML = '';
            competitors.forEach((competitor, index) => {
                const row = document.createElement('div');
                row.className = `competitor-row ${competitor.name === 'Your Site' ? 'current' : ''}`;
                row.innerHTML = `
                    <span>${competitor.name}</span>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${competitor.score}%"></div>
                    </div>
                    <span>${competitor.score}</span>
                `;
                competitorTable.appendChild(row);
            });
        }
    }

    renderPublishingStatus() {
        const container = document.getElementById('publication-list');
        if (!container) return;

        const publications = [
            {
                page: 'Homepage',
                changes: 3,
                status: 'published',
                timestamp: new Date(Date.now() - 86400000) // 1 day ago
            },
            {
                page: 'Product Category',
                changes: 7,
                status: 'pending',
                timestamp: new Date()
            },
            {
                page: 'About Page',
                changes: 2,
                status: 'failed',
                timestamp: new Date(Date.now() - 3600000) // 1 hour ago
            }
        ];

        container.innerHTML = '';
        publications.forEach(item => {
            const pubItem = document.createElement('div');
            pubItem.className = 'publication-item';
            pubItem.innerHTML = `
                <div class="publication-info">
                    <h5>${item.page}</h5>
                    <p>${item.changes} change${item.changes > 1 ? 's' : ''} • ${this.formatDate(item.timestamp)}</p>
                </div>
                <div class="publication-status">
                    <span class="status-badge status-${item.status}">${item.status}</span>
                    ${item.status === 'failed' ? '<button class="btn-secondary btn-sm">Retry</button>' : ''}
                </div>
            `;
            container.appendChild(pubItem);
        });
    }

    initializeCharts() {
        // Initialize visibility chart
        setTimeout(() => {
            const visibilityChart = document.getElementById('visibilityChart');
            if (visibilityChart) {
                const ctx = visibilityChart.getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Visibility Score',
                            data: [45, 52, 58, 61, 67, 73],
                            borderColor: '#6C5CE7',
                            backgroundColor: 'rgba(108, 92, 231, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: false,
                                min: 40,
                                max: 100,
                                title: {
                                    display: true,
                                    text: 'Score (%)'
                                }
                            }
                        }
                    }
                });
            }
        }, 100);
    }

    formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else {
            return `${days} days ago`;
        }
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

// Global functions for upgrade modal
function openUpgradeModal() {
    alert('Upgrade functionality would redirect to pricing page or open upgrade modal');
}

// Initialize dashboard
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new GeoDashboard();
});

// Add additional CSS for dashboard-specific elements
const dashboardStyles = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }

    .loading-overlay.hidden {
        display: none;
    }

    .loading-content {
        text-align: center;
        color: white;
    }

    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid #6C5CE7;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .modal {
        display: flex;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;
    }

    .modal.hidden {
        display: none;
    }

    .modal-content {
        background: white;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }

    .modal-header {
        padding: 1.5rem 1.5rem 1rem;
        border-bottom: 1px solid #E5E7EB;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h3 {
        margin: 0;
        color: #1F2937;
    }

    .close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6B7280;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s;
    }

    .close:hover {
        background: #F3F4F6;
        color: #374151;
    }

    .modal-body {
        padding: 1.5rem;
    }

    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .status-pending {
        background: #FEF3C7;
        color: #92400E;
    }

    .status-accepted {
        background: #D1FAE5;
        color: #065F46;
    }

    .status-rejected {
        background: #FEE2E2;
        color: #991B1B;
    }

    .status-approved {
        background: #DBEAFE;
        color: #1E40AF;
    }

    .status-published {
        background: #D1FAE5;
        color: #065F46;
    }

    .status-failed {
        background: #FEE2E2;
        color: #991B1B;
    }

    .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }

    .sidebar-footer {
        margin-top: auto;
        padding: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
    }

    .user-avatar {
        width: 32px;
        height: 32px;
        background: #6C5CE7;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
    }

    .user-name {
        color: white;
        font-weight: 500;
        font-size: 0.875rem;
    }

    .user-plan {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.75rem;
    }

    .charts-section {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        margin: 2rem 0;
    }

    .chart-container {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid #E5E7EB;
    }

    .chart-container h4 {
        margin-bottom: 1rem;
        color: #374151;
    }

    .competitor-benchmark {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid #E5E7EB;
    }

    .settings-sections {
        display: grid;
        gap: 2rem;
    }

    .settings-section {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid #E5E7EB;
    }

    .settings-section h3 {
        margin-bottom: 1.5rem;
        color: #374151;
    }

    .settings-form .form-group {
        margin-bottom: 1.5rem;
    }

    .settings-toggles {
        display: grid;
        gap: 1rem;
    }

    .toggle-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        padding: 0.75rem;
        border-radius: 8px;
        transition: background-color 0.2s;
    }

    .toggle-item:hover {
        background: #F9FAFB;
    }

    .toggle-switch {
        width: 48px;
        height: 28px;
        background: #D1D5DB;
        border-radius: 14px;
        position: relative;
        transition: background-color 0.3s;
    }

    .toggle-switch::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        top: 4px;
        left: 4px;
        transition: transform 0.3s;
    }

    .toggle-item input:checked + .toggle-switch {
        background: #6C5CE7;
    }

    .toggle-item input:checked + .toggle-switch::before {
        transform: translateX(20px);
    }

    .toggle-item input {
        display: none;
    }

    .api-keys {
        display: grid;
        gap: 1.5rem;
    }

    .api-key-item {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 1rem;
        align-items: end;
    }

    .api-key-item label {
        font-weight: 500;
        margin-bottom: 0.5rem;
        display: block;
    }

    .billing-info {
        background: #F9FAFB;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
    }

    .billing-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .analytics-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid #E5E7EB;
        text-align: center;
    }

    .analytics-card h3 {
        color: #6B7280;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .metric-trend {
        color: #059669;
        font-size: 0.875rem;
        font-weight: 500;
        margin-top: 0.5rem;
    }

    .publishing-summary {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid #E5E7EB;
        display: grid;
        gap: 1.5rem;
    }

    .summary-item {
        text-align: center;
    }

    .summary-item h4 {
        color: #6B7280;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
    }

    .summary-count {
        font-size: 2rem;
        font-weight: bold;
        color: #6C5CE7;
    }
`;

// Inject dashboard styles
const dashboardStyleElement = document.createElement('style');
dashboardStyleElement.textContent = dashboardStyles;
document.head.appendChild(dashboardStyleElement);