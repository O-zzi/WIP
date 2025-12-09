// Enhanced TSC Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeHeroCarousel();
    initializeAnimations();
    initializeImageHandling();
    initializeNewsletterForm();
});

// Navigation Enhancement
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            
            try {
                navLinks.classList.toggle('open');
                hamburger.classList.toggle('active');
                
                // Animate hamburger icon
                const spans = hamburger.querySelectorAll('span');
                
                if (navLinks.classList.contains('open')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    hamburger.setAttribute('aria-label', 'Close menu');
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                    hamburger.setAttribute('aria-label', 'Open menu');
                }
            } catch (error) {
                console.error('Error toggling mobile menu:', error);
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                try {
                    if (window.innerWidth <= 768 && navLinks.classList.contains('open')) {
                        navLinks.classList.remove('open');
                        hamburger.classList.remove('active');
                        const spans = hamburger.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                        hamburger.setAttribute('aria-label', 'Open menu');
                    }
                } catch (error) {
                    console.error('Error closing mobile menu:', error);
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            try {
                if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                    if (navLinks.classList.contains('open')) {
                        navLinks.classList.remove('open');
                        hamburger.classList.remove('active');
                        const spans = hamburger.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                        hamburger.setAttribute('aria-label', 'Open menu');
                    }
                }
            } catch (error) {
                console.error('Error handling outside click:', error);
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            try {
                if (window.innerWidth > 768) {
                    navLinks.classList.remove('open');
                    hamburger.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                    hamburger.setAttribute('aria-label', 'Open menu');
                }
            } catch (error) {
                console.error('Error handling window resize:', error);
            }
        });
    } else {
        console.error('Mobile navigation elements not found!');
        console.error('Hamburger:', hamburger);
        console.error('NavLinks:', navLinks);
    }
    
    // Enhanced Dropdown functionality
    if (dropdowns.length > 0) {
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    try {
                        // Close other dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                        
                        // Toggle current dropdown
                        dropdown.classList.toggle('active');
                        
                        // Handle arrow rotation
                        const arrow = toggle.querySelector('.dropdown-arrow');
                        if (arrow) {
                            arrow.style.transform = dropdown.classList.contains('active') 
                                ? 'rotate(180deg)' 
                                : 'rotate(0deg)';
                        }
                    } catch (error) {
                        console.error('Error toggling dropdown:', error);
                    }
                });
            }
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        try {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove('active');
                    const arrow = dropdown.querySelector('.dropdown-arrow');
                    if (arrow) {
                        arrow.style.transform = 'rotate(0deg)';
                    }
                }
            });
        } catch (error) {
            console.error('Error closing dropdowns:', error);
        }
    });
}

// Rest of the functions would go here...
// For now, let's add simple placeholder functions

function initializeHeroCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    
    let currentSlide = 0;
    let isTransitioning = false;
    let autoPlayInterval;

    // Set background images for slides
    function setSlideBackgrounds() {
        slides.forEach(slide => {
            const bgImage = slide.getAttribute('data-bg');
            if (bgImage) {
                slide.style.backgroundImage = `url('${bgImage}')`;
                slide.style.backgroundSize = 'cover';
                slide.style.backgroundPosition = 'center';
                slide.style.backgroundRepeat = 'no-repeat';
            }
        });
    }

    // Update slide visibility and indicators
    function updateSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });

        currentSlide = index;
        
        // Reset transition flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }

    // Go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        updateSlide(nextIndex);
    }

    // Go to previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(prevIndex);
    }

    // Go to specific slide
    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            updateSlide(index);
        }
    }

    // Start auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Stop auto-play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swiped left - next slide
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swiped right - previous slide
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        }
    });

    // Initialize carousel
    setSlideBackgrounds();
    startAutoPlay();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });
}

function initializeAnimations() {
    // Animation functionality
}

function initializeImageHandling() {
    // Image handling functionality
}

function initializeNewsletterForm() {
    // Newsletter form functionality
}
