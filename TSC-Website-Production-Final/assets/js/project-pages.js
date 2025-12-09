// Project Pages Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all project page components
    initializeProjectNavigation();
    initializeCalendar();
    initializeGalleryFilters();
    initializeVideoPlayers();
    initializeScrollAnimations();
});

// Project Navigation - Enhanced
function initializeProjectNavigation() {
    const navLinks = document.querySelectorAll('.project-nav-links .nav-link');
    const sections = document.querySelectorAll('.project-section[id]');
    const projectNav = document.getElementById('projectNav');
    const navProgress = document.getElementById('navProgress');
    const navLinksContainer = document.getElementById('projectNavLinks');
    
    if (navLinks.length === 0 || sections.length === 0) return;
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            try {
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Update active nav link
                    updateActiveNavLink(this);
                    
                    // Scroll to section with offset for fixed nav
                    const navHeight = document.querySelector('.project-nav').offsetHeight + 70; // navbar + project nav
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error('Error with project navigation:', error);
            }
        });
    });
    
    // Enhanced scroll tracking with progress indicator
    let ticking = false;
    
    function updateNavigationOnScroll() {
        const scrollPosition = window.scrollY;
        const navHeight = projectNav ? projectNav.offsetHeight + 70 : 140;
        
        // Add scrolled class to nav
        if (projectNav) {
            if (scrollPosition > 100) {
                projectNav.classList.add('scrolled');
            } else {
                projectNav.classList.remove('scrolled');
            }
        }
        
        // Update active section
        let currentSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            const currentId = currentSection.getAttribute('id');
            const correspondingLink = document.querySelector(`.project-nav-links .nav-link[href="#${currentId}"]`);
            
            if (correspondingLink && !correspondingLink.classList.contains('active')) {
                updateActiveNavLink(correspondingLink);
            }
            
            // Update progress indicator
            updateProgressIndicator(currentSection);
        }
        
        ticking = false;
    }
    
    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
        
        // Scroll active link into view if needed
        if (navLinksContainer) {
            const linkRect = activeLink.getBoundingClientRect();
            const containerRect = navLinksContainer.getBoundingClientRect();
            
            if (linkRect.left < containerRect.left || linkRect.right > containerRect.right) {
                activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    }
    
    function updateProgressIndicator(currentSection) {
        if (!navProgress) return;
        
        const sections = Array.from(document.querySelectorAll('.project-section[id]'));
        const currentIndex = sections.indexOf(currentSection);
        const progress = ((currentIndex + 1) / sections.length) * 100;
        
        navProgress.style.width = `${progress}%`;
    }
    
    // Scroll event listener with throttling
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavigationOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initialize on load
    updateNavigationOnScroll();
    
    // Update active nav link on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-140px 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const correspondingNavLink = document.querySelector(`.project-nav-links .nav-link[href="#${sectionId}"]`);
                
                if (correspondingNavLink) {
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Calendar Functionality
function initializeCalendar() {
    const calendarContainer = document.querySelector('.calendar-container');
    if (!calendarContainer) return;
    
    const prevBtn = document.querySelector('.prev-month');
    const nextBtn = document.querySelector('.next-month');
    const calendarTitle = document.querySelector('.calendar-title');
    const eventDays = document.querySelectorAll('.calendar-day.event');
    
    let currentDate = new Date();
    
    // Month navigation
    if (prevBtn && nextBtn && calendarTitle) {
        prevBtn.addEventListener('click', function() {
            try {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendarDisplay();
            } catch (error) {
                console.error('Error navigating to previous month:', error);
            }
        });
        
        nextBtn.addEventListener('click', function() {
            try {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendarDisplay();
            } catch (error) {
                console.error('Error navigating to next month:', error);
            }
        });
    }
    
    function updateCalendarDisplay() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const monthName = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        
        if (calendarTitle) {
            calendarTitle.textContent = `${monthName} ${year}`;
        }
        
        // Here you would typically regenerate the calendar grid
        // For now, we'll just update the title
    }
    
    // Event day interactions
    eventDays.forEach(day => {
        day.addEventListener('click', function() {
            try {
                const eventType = this.getAttribute('data-event');
                showEventDetails(eventType, this.textContent);
            } catch (error) {
                console.error('Error showing event details:', error);
            }
        });
        
        // Add hover effect
        day.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        day.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    function showEventDetails(eventType, day) {
        // Create a simple tooltip or modal for event details
        const tooltip = document.createElement('div');
        tooltip.className = 'event-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(26, 26, 26, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 20px;
            color: white;
            z-index: 10000;
            max-width: 300px;
            text-align: center;
            backdrop-filter: blur(10px);
        `;
        
        tooltip.innerHTML = `
            <h4 style="color: #ff6b35; margin-bottom: 12px;">${eventType === 'training' ? 'Training Session' : 'Competition'}</h4>
            <p style="margin-bottom: 16px;">Event scheduled for ${day} August 2025</p>
            <button onclick="this.parentElement.remove()" style="
                background: #ff6b35;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
            ">Close</button>
        `;
        
        document.body.appendChild(tooltip);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (tooltip.parentElement) {
                tooltip.parentElement.removeChild(tooltip);
            }
        }, 5000);
    }
}

// Gallery Filters
function initializeGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length === 0 || galleryItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            try {
                const filter = this.getAttribute('data-filter');
                
                // Update active filter button
                filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        // Animate in
                        setTimeout(() => {
                            item.style.transition = 'all 0.3s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            } catch (error) {
                console.error('Error filtering gallery:', error);
            }
        });
    });
    
    // Gallery item click handlers
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            try {
                openGalleryModal(this);
            } catch (error) {
                console.error('Error opening gallery modal:', error);
            }
        });
    });
}

function openGalleryModal(galleryItem) {
    const img = galleryItem.querySelector('img');
    const overlay = galleryItem.querySelector('.gallery-overlay');
    
    if (!img && !galleryItem.querySelector('.gallery-placeholder')) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        position: relative;
        text-align: center;
    `;
    
    if (img) {
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalImg.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            border-radius: 12px;
        `;
        modalContent.appendChild(modalImg);
    } else {
        // Handle placeholder
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 600px;
            height: 400px;
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.5);
            font-size: 24px;
        `;
        placeholder.textContent = 'Image Preview';
        modalContent.appendChild(placeholder);
    }
    
    if (overlay) {
        const modalOverlay = overlay.cloneNode(true);
        modalOverlay.style.cssText = `
            position: static;
            background: none;
            transform: none;
            padding: 20px 0;
            color: white;
        `;
        modalContent.appendChild(modalOverlay);
    }
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        transition: background 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentElement) {
                modal.parentElement.removeChild(modal);
            }
        }, 300);
    });
    
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeBtn.click();
        }
    });
    
    // Close on escape key
    const escapeHandler = function(event) {
        if (event.key === 'Escape') {
            closeBtn.click();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Video Players
function initializeVideoPlayers() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        
        if (playButton) {
            playButton.addEventListener('click', function(event) {
                event.stopPropagation();
                
                try {
                    const videoTitle = card.querySelector('.video-title').textContent;
                    showVideoModal(videoTitle);
                } catch (error) {
                    console.error('Error playing video:', error);
                }
            });
        }
        
        // Card click handler
        card.addEventListener('click', function() {
            try {
                const videoTitle = this.querySelector('.video-title').textContent;
                showVideoModal(videoTitle);
            } catch (error) {
                console.error('Error opening video:', error);
            }
        });
    });
}

function showVideoModal(videoTitle) {
    // Create video modal (placeholder for now)
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        position: relative;
        text-align: center;
        background: #1a1a1a;
        border-radius: 12px;
        padding: 40px;
    `;
    
    modalContent.innerHTML = `
        <h3 style="color: white; margin-bottom: 20px;">${videoTitle}</h3>
        <div style="
            width: 600px;
            height: 400px;
            background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.5);
            font-size: 18px;
            margin-bottom: 20px;
        ">
            🎥 Video Player Placeholder<br>
            <small style="font-size: 14px; margin-top: 8px; display: block;">
                Video content will be available when integrated with actual video sources
            </small>
        </div>
        <button onclick="this.closest('.video-modal').remove()" style="
            background: #ff6b35;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        ">Close</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    });
    
    // Close on escape key
    const escapeHandler = function(event) {
        if (event.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('achievement-card')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('stat-box')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .athlete-card,
        .video-card,
        .achievement-card,
        .gallery-item,
        .event-item,
        .stat-box
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function animateCounter(element) {
    const numberElement = element.querySelector('.achievement-number, .stat-number');
    if (!numberElement) return;
    
    const finalNumber = parseInt(numberElement.textContent.replace(/[^\d]/g, ''));
    if (isNaN(finalNumber)) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = finalNumber / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        
        // Preserve any suffix (like K, M, +)
        const originalText = numberElement.textContent;
        const suffix = originalText.replace(/[\d.]/g, '');
        numberElement.textContent = Math.floor(current) + suffix;
    }, duration / steps);
}

// Utility function for smooth scrolling
function smoothScrollTo(target, duration = 1000) {
    const targetPosition = target.offsetTop - 140; // Account for fixed headers
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
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

// Optimized scroll handler for project pages
const optimizedProjectScrollHandler = debounce(() => {
    // Handle any scroll-based animations or effects here
}, 10);

window.addEventListener('scroll', optimizedProjectScrollHandler);

