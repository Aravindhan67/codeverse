/**
 * HACKHUB'26 - Modern Tech Event Website
 * JavaScript for animations, interactions, and effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });
    
    // Initialize all components
    initLoader();
    initParticles();
    initNavbar();
    initMobileMenu();
    initProblemExpansion();
    initSmoothScroll();
    initGradientAnimation();
});

// 1. Loader Animation with Progress
function initLoader() {
    const loader = document.getElementById('loader');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress++;
        if (progressPercentage) {
            progressPercentage.textContent = `${progress}%`;
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                // Enable body scroll after loader
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }, 25);
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
}

// 2. Floating Particles Background
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 6 + 3;
    const left = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 15 + 15;
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;
    
    container.appendChild(particle);
}

// 3. Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 4. Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// 5. Problem Statement Expansion
function initProblemExpansion() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const problemCard = this.closest('.problem-card');
            
            // Toggle active class
            problemCard.classList.toggle('active');
            this.classList.toggle('active');
            
            // Toggle text
            const span = this.querySelector('span');
            if (problemCard.classList.contains('active')) {
                span.textContent = 'Read Less';
            } else {
                span.textContent = 'Read More';
            }
        });
    });
}

// Global function for onclick handler in HTML
function toggleProblem(button) {
    const event = new Event('click');
    button.dispatchEvent(event);
}

// 6. Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 7. Gradient Background Animation
function initGradientAnimation() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        let angle = 0;
        
        function animateGradient() {
            angle += 0.5;
            const x1 = 50 + Math.sin(angle * Math.PI / 180) * 50;
            const y1 = 50 + Math.cos(angle * Math.PI / 180) * 50;
            const x2 = 50 - Math.sin(angle * Math.PI / 180) * 50;
            const y2 = 50 - Math.cos(angle * Math.PI / 180) * 50;
            
            heroSection.style.background = `linear-gradient(${angle}deg, #6B4CFF 0%, #9D7EFF 50%, #00D4FF 100%)`;
            heroSection.style.backgroundSize = '200% 200%';
            heroSection.style.backgroundPosition = `${x1}% ${y1}%`;
            
            requestAnimationFrame(animateGradient);
        }
        
        // Start animation (but CSS is handling it too, so this is optional)
        // animateGradient();
    }
}

// 8. Add hover effects to cards
function initCardEffects() {
    const cards = document.querySelectorAll('.detail-card, .benefit-card, .problem-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            cards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                    c.style.transform = 'scale(0.98)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            cards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = '';
            });
        });
    });
}

// 9. Button Ripple Effect
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            // Add ripple animation if not exists
            if (!document.getElementById('ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    @keyframes rippleEffect {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 10. Counter Animation for Statistics (if needed)
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let count = 0;
        
        const updateCounter = () => {
            const increment = target / 100;
            
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Use Intersection Observer to start animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// 11. Typing Effect for Hero Subtitle (Optional Enhancement)
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let index = 0;
        
        function type() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }
        
        // Start typing after page load
        setTimeout(type, 1000);
    }
}

// 12. Parallax Effect for Background Elements
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.gradient-blob, .particle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach((el, index) => {
            const speed = (index + 1) * 0.05;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize additional effects
initCardEffects();
initButtonRipple();

// Console Easter Egg
console.log('%c⚡ HACKHUB\'26', 'font-size: 30px; font-weight: bold; color: #6B4CFF; text-shadow: 2px 2px 0 #9D7EFF;');
console.log('%cInnovate. Build. Transform.', 'font-size: 14px; font-style: italic; color: #00D4FF;');
console.log('%cReady to hack the future? Register now!', 'font-size: 12px; color: #6B4CFF;');
