// Contact Page Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all contact page components
    initializeContactForm();
    initializeFAQ();
    initializeFormSaveLoad();
});

// Contact Form Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all contact page components
    initializeContactForm();
    initializeFAQAccordion();
    initializeFormValidation();
});

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        try {
            if (validateForm()) {
                submitForm();
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            showFormMessage('An error occurred. Please try again.', 'error');
        }
    });
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Clear previous error messages
    clearErrorMessages();
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        
        if (!value) {
            showFieldError(field, 'This field is required.');
            isValid = false;
        } else {
            // Specific validation for different field types
            if (field.type === 'email' && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address.');
                isValid = false;
            }
            
            if (field.name === 'phone' && value && !isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number.');
                isValid = false;
            }
            
            if (field.name === 'message' && value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters long.');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.form-submit-btn');
    
    // Disable form during submission
    const formElements = form.querySelectorAll('input, select, textarea, button');
    formElements.forEach(element => element.disabled = true);
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Message...';
    
    // Simulate form submission
    setTimeout(() => {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show success message
        showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Re-enable form elements
        formElements.forEach(element => element.disabled = false);
        submitBtn.textContent = originalText;
        
        // Scroll to success message
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
    }, 2000); // Simulate 2 second delay
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
}

function clearErrorMessages() {
    const errorFields = document.querySelectorAll('.form-input.error, .form-select.error, .form-textarea.error');
    const errorMessages = document.querySelectorAll('.error-message');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(message => message.remove());
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => {
        if (msg.parentElement.classList.contains('form-container')) {
            msg.remove();
        }
    });
    
    const messageElement = document.createElement('div');
    messageElement.className = type === 'success' ? 'success-message' : 'error-message';
    messageElement.textContent = message;
    
    const formContainer = document.querySelector('.form-container');
    const form = document.getElementById('contactForm');
    
    if (formContainer && form) {
        formContainer.insertBefore(messageElement, form);
    }
}

// Form Validation Helpers
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Pakistani phone number format validation
    const phoneRegex = /^(\+92|0)?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

// Real-time Form Validation
function initializeFormValidation() {
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    formInputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMessage = this.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
}

function validateSingleField(field) {
    const value = field.value.trim();
    
    // Skip validation if field is not required and empty
    if (!field.hasAttribute('required') && !value) {
        return true;
    }
    
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    } else if (field.name === 'phone' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
    } else if (field.name === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long.';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// FAQ Accordion
function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                try {
                    toggleFAQItem(item);
                } catch (error) {
                    console.error('Error toggling FAQ item:', error);
                }
            });
        }
    });
}

function toggleFAQItem(item) {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQ items
    const allFAQItems = document.querySelectorAll('.faq-item');
    allFAQItems.forEach(faqItem => {
        if (faqItem !== item) {
            faqItem.classList.remove('active');
        }
    });
    
    // Toggle current item
    if (isActive) {
        item.classList.remove('active');
    } else {
        item.classList.add('active');
        
        // Scroll to item if needed
        setTimeout(() => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            
            if (!isVisible) {
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    }
}

// Character Counter for Textarea
function initializeCharacterCounter() {
    const messageTextarea = document.getElementById('message');
    
    if (!messageTextarea) return;
    
    const maxLength = 1000;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        margin-top: 4px;
    `;
    
    messageTextarea.parentElement.appendChild(counter);
    
    function updateCounter() {
        const currentLength = messageTextarea.value.length;
        counter.textContent = `${currentLength}/${maxLength} characters`;
        
        if (currentLength > maxLength * 0.9) {
            counter.style.color = '#f39c12';
        } else if (currentLength > maxLength) {
            counter.style.color = '#e74c3c';
        } else {
            counter.style.color = 'rgba(255, 255, 255, 0.5)';
        }
    }
    
    messageTextarea.addEventListener('input', updateCounter);
    updateCounter(); // Initial count
}

// Auto-resize Textarea
function initializeAutoResizeTextarea() {
    const textareas = document.querySelectorAll('.form-textarea');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 300) + 'px';
        });
    });
}

// Form Auto-save (to localStorage)
function initializeFormAutoSave() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const formFields = form.querySelectorAll('input, select, textarea');
    const storageKey = 'contactFormData';
    
    // Load saved data
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && field.type !== 'checkbox') {
                    field.value = data[key];
                } else if (field && field.type === 'checkbox') {
                    field.checked = data[key];
                }
            });
        } catch (error) {
            console.error('Error loading saved form data:', error);
        }
    }
    
    // Save data on input
    formFields.forEach(field => {
        field.addEventListener('input', debounce(() => {
            saveFormData();
        }, 500));
    });
    
    function saveFormData() {
        const data = {};
        formFields.forEach(field => {
            if (field.type === 'checkbox') {
                data[field.name] = field.checked;
            } else {
                data[field.name] = field.value;
            }
        });
        
        localStorage.setItem(storageKey, JSON.stringify(data));
    }
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        setTimeout(() => {
            localStorage.removeItem(storageKey);
        }, 3000); // Clear after successful submission
    });
}

// Contact Method Cards Animation
function initializeContactMethodsAnimation() {
    const methodCards = document.querySelectorAll('.method-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    methodCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// Utility Functions
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

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharacterCounter();
    initializeAutoResizeTextarea();
    initializeFormAutoSave();
    initializeContactMethodsAnimation();
});

// Handle form submission analytics (if needed)
function trackFormSubmission(formData) {
    // This would typically send data to analytics service
    // Track form submission without console logging
}

// Keyboard navigation for FAQ
document.addEventListener('keydown', function(event) {
    if (event.target.classList.contains('faq-question')) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.target.click();
        }
    }
});

