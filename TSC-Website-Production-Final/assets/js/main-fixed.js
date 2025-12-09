// Enhanced TSC Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('TSC Website Enhanced - Loading...');
    
    // Initialize all components
    initializeNavigation();
    initializeHeroCarousel();
    initializeAnimations();
    initializeImageHandling();
    initializeNewsletterForm();
    
    console.log('TSC Website Enhanced - Loaded Successfully');
});

// Navigation Enhancement
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    console.log('Hamburger element:', hamburger);
    console.log('Nav links element:', navLinks);
    
    if (hamburger && navLinks) {
        console.log('Setting up mobile navigation...');
        
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hamburger clicked!');
            
            try {
                navLinks.classList.toggle('open');
                hamburger.classList.toggle('active');
                
                console.log('Nav menu toggled. Classes:', navLinks.className);
                
                // Animate hamburger icon
                const spans = hamburger.querySelectorAll('span');
                if (navLinks.classList.contains('open')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    hamburger.setAttribute('aria-label', 'Close menu');
                    console.log('Menu opened');
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                    hamburger.setAttribute('aria-label', 'Open menu');
                    console.log('Menu closed');
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
    console.log('Hero carousel initialized');
}

function initializeAnimations() {
    console.log('Animations initialized');
}

function initializeImageHandling() {
    console.log('Image handling initialized');
}

function initializeNewsletterForm() {
    console.log('Newsletter form initialized');
}
