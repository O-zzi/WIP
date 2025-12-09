// News Page Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all news page components
    initializeNewsFilters();
    initializeLoadMore();
    initializeNewsletterForm();
});

// Category Filters
function initializeCategoryFilters() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const newsCards = document.querySelectorAll('.news-card');
    
    if (categoryTabs.length === 0) return;
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            try {
                const category = this.getAttribute('data-category');
                
                // Update active tab
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Filter news cards
                filterNewsCards(category, newsCards);
                
                // Update URL without page reload
                if (history.pushState) {
                    const newUrl = category === 'all' ? 
                        window.location.pathname : 
                        `${window.location.pathname}?category=${category}`;
                    history.pushState({ category }, '', newUrl);
                }
            } catch (error) {
                console.error('Error filtering news categories:', error);
            }
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.category) {
            const activeTab = document.querySelector(`[data-category="${event.state.category}"]`);
            if (activeTab) {
                activeTab.click();
            }
        }
    });
    
    // Initialize from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const targetTab = document.querySelector(`[data-category="${categoryParam}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
}

function filterNewsCards(category, newsCards) {
    newsCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            // Show card with animation
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            // Hide card with animation
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Update results count
    updateResultsCount(category, newsCards);
}

function updateResultsCount(category, newsCards) {
    const visibleCards = Array.from(newsCards).filter(card => {
        const cardCategory = card.getAttribute('data-category');
        return category === 'all' || cardCategory === category;
    });
    
    // You could add a results counter here if needed
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (!loadMoreBtn) return;
    
    let currentPage = 1;
    const articlesPerPage = 6;
    
    loadMoreBtn.addEventListener('click', function() {
        try {
            this.disabled = true;
            this.textContent = 'Loading...';
            
            // Simulate loading delay
            setTimeout(() => {
                loadMoreArticles(currentPage + 1);
                currentPage++;
                
                this.disabled = false;
                this.textContent = 'Load More Articles';
                
                // Hide button after loading 3 pages (simulate end of content)
                if (currentPage >= 3) {
                    this.style.display = 'none';
                    
                    // Show end message
                    const endMessage = document.createElement('p');
                    endMessage.textContent = 'You\'ve reached the end of our news articles.';
                    endMessage.style.cssText = `
                        text-align: center;
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 16px;
                        margin-top: 40px;
                    `;
                    this.parentElement.appendChild(endMessage);
                }
            }, 1500);
        } catch (error) {
            console.error('Error loading more articles:', error);
            this.disabled = false;
            this.textContent = 'Load More Articles';
        }
    });
}

function loadMoreArticles(page) {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;
    
    // Sample additional articles data
    const additionalArticles = [
        {
            category: 'training',
            title: 'Advanced Training Techniques for Elite Athletes',
            excerpt: 'Discover cutting-edge training methods used by top Pakistani athletes to achieve peak performance.',
            author: 'Coach Rahman',
            date: 'Aug 3, 2025',
            image: 'images/gymbhai-hero.jpg'
        },
        {
            category: 'community',
            title: 'Sports Collective Expands to Rural Areas',
            excerpt: 'New initiative brings sports programs and facilities to underserved communities across Pakistan.',
            author: 'Community Team',
            date: 'Aug 2, 2025',
            image: 'images/roshan-zindagi-hero.jpg'
        },
        {
            category: 'achievements',
            title: 'Young Athletes Break Multiple Records',
            excerpt: 'Rising stars in Pakistani sports continue to set new benchmarks in their respective disciplines.',
            author: 'Sports Reporter',
            date: 'Aug 1, 2025',
            image: 'images/the-fastest-pakistani-hero.jpg'
        }
    ];
    
    additionalArticles.forEach((article, index) => {
        const articleElement = createNewsCard(article);
        articleElement.style.opacity = '0';
        articleElement.style.transform = 'translateY(30px)';
        newsGrid.appendChild(articleElement);
        
        // Animate in with delay
        setTimeout(() => {
            articleElement.style.transition = 'all 0.5s ease';
            articleElement.style.opacity = '1';
            articleElement.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function createNewsCard(article) {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.setAttribute('data-category', article.category);
    
    card.innerHTML = `
        <div class="news-image">
            <img src="${article.image}" alt="${article.title}">
            <div class="news-category">${article.category.toUpperCase()}</div>
        </div>
        <div class="news-content">
            <div class="news-meta">
                <span class="news-date">${article.date}</span>
                <span class="news-author">${article.author}</span>
            </div>
            <h3 class="news-title">${article.title}</h3>
            <p class="news-excerpt">${article.excerpt}</p>
            <a href="#" class="news-link">Read More</a>
        </div>
    `;
    
    // Add click handler
    card.addEventListener('click', function(event) {
        if (!event.target.classList.contains('news-link')) {
            const link = this.querySelector('.news-link');
            if (link) link.click();
        }
    });
    
    return card;
}

// Breaking News Animation
function initializeBreakingNews() {
    const breakingText = document.querySelector('.breaking-text');
    
    if (!breakingText) return;
    
    // Pause animation on hover
    const breakingBanner = document.querySelector('.breaking-banner');
    if (breakingBanner) {
        breakingBanner.addEventListener('mouseenter', function() {
            breakingText.style.animationPlayState = 'paused';
        });
        
        breakingBanner.addEventListener('mouseleave', function() {
            breakingText.style.animationPlayState = 'running';
        });
    }
    
    // Auto-update breaking news (simulate real-time updates)
    const breakingNews = [
        "Pakistan's Ahmad Hassan breaks national 100m record with 10.12 seconds at Lahore Championship",
        "The Sports Collective announces new training facility in Karachi with state-of-the-art equipment",
        "National volleyball team qualifies for Asian Championships after defeating regional rivals",
        "GymBhai app reaches 100,000 downloads milestone, revolutionizing fitness tracking in Pakistan"
    ];
    
    let currentNewsIndex = 0;
    
    setInterval(() => {
        currentNewsIndex = (currentNewsIndex + 1) % breakingNews.length;
        
        // Fade out
        breakingText.style.transition = 'opacity 0.5s ease';
        breakingText.style.opacity = '0';
        
        setTimeout(() => {
            breakingText.textContent = breakingNews[currentNewsIndex];
            breakingText.style.opacity = '1';
        }, 500);
    }, 10000); // Change every 10 seconds
}

// Newsletter Subscription
function initializeNewsletterSubscription() {
    const newsletterForms = document.querySelectorAll('.newsletter-form-large, .newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            try {
                const emailInput = this.querySelector('input[type="email"]');
                const submitBtn = this.querySelector('button[type="submit"]');
                
                if (!emailInput || !submitBtn) return;
                
                const email = emailInput.value.trim();
                
                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Disable form during submission
                submitBtn.disabled = true;
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribing...';
                
                // Simulate API call
                setTimeout(() => {
                    showNotification('Thank you for subscribing to our newsletter!', 'success');
                    emailInput.value = '';
                    
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
                
            } catch (error) {
                console.error('Error subscribing to newsletter:', error);
                showNotification('An error occurred. Please try again.', 'error');
            }
        });
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Initialize newsletter subscription when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNewsletterSubscription();
});

// Search functionality (if search input exists)
function initializeNewsSearch() {
    const searchInput = document.querySelector('.news-search-input');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            filterNewsBySearch(query);
        }, 300);
    });
}

function filterNewsBySearch(query) {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        const title = card.querySelector('.news-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();
        const category = card.getAttribute('data-category').toLowerCase();
        
        const matches = title.includes(query) || excerpt.includes(query) || category.includes(query);
        
        if (query === '' || matches) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimized scroll handler for news page
const optimizedNewsScrollHandler = debounce(() => {
    // Handle any scroll-based animations or effects here
}, 10);

window.addEventListener('scroll', optimizedNewsScrollHandler);

