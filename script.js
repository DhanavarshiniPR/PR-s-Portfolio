// ============================================
// Theme Toggle
// ============================================

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
}

// ============================================
// Sidebar Navigation (menu open state)
// ============================================

const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar-nav');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const navLinks = document.querySelectorAll('.sidebar-link');

const sidebarMenuState = { isOpen: false };

function setSidebarOpen(isOpen) {
    sidebarMenuState.isOpen = isOpen;

    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );

    sidebar.classList.toggle('is-open', isOpen);
    sidebar.setAttribute('aria-hidden', String(!isOpen));

    sidebarOverlay.classList.toggle('is-open', isOpen);
    sidebarOverlay.setAttribute('aria-hidden', String(!isOpen));

    document.body.classList.toggle('sidebar-open', isOpen);
}

function toggleSidebar() {
    setSidebarOpen(!sidebarMenuState.isOpen);
}

function closeSidebar() {
    if (sidebarMenuState.isOpen) {
        setSidebarOpen(false);
    }
}

menuToggle.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

const SCROLL_OFFSET = 24;

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - SCROLL_OFFSET;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }

        closeSidebar();
    });
});

const sidebarLogo = document.querySelector('.sidebar-logo');
if (sidebarLogo) {
    sidebarLogo.addEventListener('click', (e) => {
        e.preventDefault();
        const home = document.querySelector('#home');
        if (home) {
            window.scrollTo({
                top: home.offsetTop - SCROLL_OFFSET,
                behavior: 'smooth',
            });
        }
        closeSidebar();
    });
}

// ============================================
// Typing Effect
// ============================================

const typingText = document.getElementById('typing-text');
const typingWords = ['Full Stack Developer', 'MERN Stack Enthusiast', 'Problem Solver', 'Code Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = typingWords[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
typeEffect();

// ============================================
// Scroll Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .about-content, .contact-content');
animateElements.forEach(el => {
    observer.observe(el);
});

// ============================================
// Skill Progress Bars
// ============================================

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = `${progress}%`;
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// Contact Form — Web3Forms (free, static-site friendly)
// Get your access key: https://web3forms.com → enter your email → copy key
// ============================================

const CONTACT_CONFIG = {
    web3formsAccessKey: 'a6643f22-4f63-4b6b-8a43-844312982927',
    fallbackEmail: 'dhanavarshinipr@gmail.com',
};

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

function showFormStatus(message, type = 'info') {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status form-status--${type}`;
}

function clearFormStatus() {
    if (!formStatus) return;
    formStatus.textContent = '';
    formStatus.className = 'form-status';
}

async function handleContactSubmit(e) {
    e.preventDefault();
    clearFormStatus();

    const formData = new FormData(contactForm);

    if (formData.get('botcheck')) {
        return;
    }

    if (!CONTACT_CONFIG.web3formsAccessKey) {
        showFormStatus(
            `Form not set up yet. Please email ${CONTACT_CONFIG.fallbackEmail} directly, or add your free Web3Forms key in script.js.`,
            'error'
        );
        return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    const originalBackground = submitBtn.style.background;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';

    const payload = {
        access_key: CONTACT_CONFIG.web3formsAccessKey,
        name: formData.get('name'),
        email: formData.get('email'),
        subject: `[Portfolio] ${formData.get('subject')}`,
        message: formData.get('message'),
        from_name: 'Portfolio — Dhanavarshini PR',
        replyto: formData.get('email'),
    };

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Unable to send message');
        }

        contactForm.reset();
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = '#10b981';
        showFormStatus('Thank you! Your message was sent — I will get back to you soon.', 'success');

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.background = originalBackground;
            clearFormStatus();
        }, 5000);
    } catch (error) {
        console.error('Contact form error:', error);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.background = originalBackground;
        showFormStatus(
            `Could not send message. Please try again or email ${CONTACT_CONFIG.fallbackEmail} directly.`,
            'error'
        );
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}

// ============================================
// Parallax Effect for Hero Section
// ============================================

const heroOrbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    heroOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${rate * speed}px)`;
    });
});

// ============================================
// Smooth Page Load
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Mark sections as visible for animation
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// ============================================
// Project Card Effects (consolidated)
// ============================================

// ============================================
// Copy Email to Clipboard
// ============================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');
        
        // Copy to clipboard
        navigator.clipboard.writeText(email).then(() => {
            // Show tooltip or notification
            const originalText = link.textContent;
            link.textContent = 'Email copied!';
            setTimeout(() => {
                link.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
        });
    });
});

// ============================================
// Performance Optimization
// ============================================

// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttled scroll handler is set up below with updateActiveNavLink

// ============================================
// Drive Links Configuration
// ============================================

// Update these with your actual drive links when you have them
const driveLinks = {
    projects: '#', // Projects drive link removed
    certificates: '#', // Certificates drive link removed
    project1: '#', // Online Marketing Place deploy link (not available yet)
    project2: 'https://drive.google.com/drive/folders/18lJ6yDZOO9RLo-XJaQEy-OK5enS3sKDz', // Smart Poultry Farming working model drive link
    project3: 'https://travel-6n7dnyzvb-dhanavarshini-prs-projects.vercel.app/', // Travel Blog Website deploy link
    project1Code: 'https://github.com/DhanavarshiniPR/Nearby-market-FRONTEND', // Online Marketing Place GitHub link
    project2Code: '#', // Replace with Smart Poultry Farming GitHub link
    project3Code: 'https://github.com/DhanavarshiniPR/Travel' // Travel Blog Website GitHub link
};

// Set drive links
document.addEventListener('DOMContentLoaded', () => {
    const project2Link = document.getElementById('project2-link');
    const project3Link = document.getElementById('project3-link');
    const project1Code = document.getElementById('project1-code');
    const project3Code = document.getElementById('project3-code');
    
    if (project2Link) project2Link.href = driveLinks.project2;
    if (project3Link) project3Link.href = driveLinks.project3;
    if (project1Code) project1Code.href = driveLinks.project1Code;
    if (project3Code) project3Code.href = driveLinks.project3Code;
});

// ============================================
// Scroll Progress Indicator
// ============================================

const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
}

window.addEventListener('scroll', updateScrollProgress);

// ============================================
// Back to Top Button
// ============================================

const backToTopBtn = document.getElementById('back-to-top');

function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleBackToTop);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Particle Background Effect
// ============================================

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
}

// Create particles on load
createParticles();

// ============================================
// Enhanced Scroll Animations with Stagger
// ============================================

const enhancedObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            enhancedObserver.unobserve(entry.target);
        }
    });
}, enhancedObserverOptions);

// Observe project cards with stagger
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    enhancedObserver.observe(card);
});

// Observe skill categories with stagger
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    enhancedObserver.observe(category);
});

// ============================================
// Enhanced Card 3D Tilt Effect
// ============================================

function add3DTiltEffect(cards) {
    cards.forEach(card => {
        // Only apply 3D tilt if card is visible (has been animated in)
        let isVisible = false;
        
        const checkVisibility = () => {
            if (card.style.opacity === '1' || getComputedStyle(card).opacity === '1') {
                isVisible = true;
            }
        };
        
        // Check visibility after a delay to allow animations
        setTimeout(checkVisibility, 1000);
        
        card.addEventListener('mousemove', (e) => {
            if (!isVisible) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Apply 3D tilt to project and achievement cards after they're set up
setTimeout(() => {
    add3DTiltEffect(document.querySelectorAll('.project-card'));
}, 500);

// ============================================
// Enhanced Form Interactions
// ============================================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Add input validation feedback
    input.addEventListener('input', () => {
        if (input.validity.valid) {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else if (input.value) {
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
    });
});

// Contact form validation feedback (submit handled above)

function revealImage(img) {
    img.style.opacity = '1';
}

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const img = entry.target;
        img.style.transition = 'opacity 0.5s ease';

        if (img.complete && img.naturalWidth > 0) {
            revealImage(img);
        } else {
            img.style.opacity = '0';
            img.addEventListener('load', () => revealImage(img), { once: true });
            img.addEventListener('error', () => {
                revealImage(img);
                img.closest('.project-image')?.classList.add('image-load-error');
            }, { once: true });
        }

        imageObserver.unobserve(img);
    });
}, { threshold: 0.1 });

document.querySelectorAll('img:not(.project-img):not(.profile-avatar-img):not(.profile-photo-img)').forEach((img) => {
    imageObserver.observe(img);
});

document.querySelectorAll('.profile-avatar-img, .profile-photo-img').forEach((img) => {
    img.style.opacity = '1';
});

document.querySelectorAll('.project-img').forEach((img) => {
    img.style.opacity = '1';
    img.addEventListener('error', () => {
        img.closest('.project-image')?.classList.add('image-load-error');
    });
});

// ============================================
// Enhanced Text Reveal Animation
// ============================================

function revealTextOnScroll() {
    const textElements = document.querySelectorAll('.section-title, .hero-title, .project-title');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'textReveal 0.8s ease-out';
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => {
        textObserver.observe(el);
    });
}

revealTextOnScroll();

// ============================================
// Enhanced Parallax Effect
// ============================================

function enhancedParallax() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

enhancedParallax();

// ============================================
// Enhanced Button Click Effects
// ============================================

const buttons = document.querySelectorAll('.btn, .social-link, .project-link');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Enhanced Navigation Active State
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.sidebar-link');
    
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Throttled scroll handler for active nav link
const throttledNavUpdate = throttle(updateActiveNavLink, 100);
window.addEventListener('scroll', throttledNavUpdate);

// Also call on page load
updateActiveNavLink();

// ============================================
// Enhanced Smooth Scroll for Navigation
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (
        anchor.classList.contains('sidebar-link') ||
        anchor.classList.contains('sidebar-logo') ||
        anchor.classList.contains('profile-avatar')
    ) {
        return;
    }
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - SCROLL_OFFSET,
                behavior: 'smooth',
            });
        }
        closeSidebar();
    });
});

// ============================================
// Enhanced Theme Toggle Animation
// ============================================

themeToggle.addEventListener('click', () => {
    themeToggle.classList.add('theme-toggle--pressed');
    setTimeout(() => {
        themeToggle.classList.remove('theme-toggle--pressed');
    }, 200);
});

// ============================================
// Console Message
// ============================================

console.log('%c👋 Hello! Interested in my code?', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cCheck out my GitHub: https://github.com/dhanavarshini-pr', 'font-size: 14px; color: #6c757d;');

