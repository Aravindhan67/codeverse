/**
 * CODEVERSE'26 - Spider-Verse Hackathon Website
 * JavaScript for animations, interactions, and effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initLoader();
    initCustomCursor();
    initParticles();
    initSwingingSpider();
    initNavbar();
    initScrollReveal();
    initCountdown();
    initParallax();
    initMobileMenu();
    initWebShootEffect();
    initPrizeCounter();
});

// 1. Loader Animation
function initLoader() {
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger hero animations after loader
            setTimeout(() => {
                document.querySelectorAll('.title-line, .title-sub, .hero-subtitle, .hero-btns').forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }, 500);
        }, 2500);
    });
}

// 2. Custom Cursor with Spider Logo
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    
    // Check if touch device
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        cursor.style.display = 'none';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor follow
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .domain-card, .contact-card, .date-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.querySelector('.cursor-spider').style.background = 'var(--electric-blue)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.querySelector('.cursor-spider').style.background = 'var(--spider-red)';
        });
    });
}

// 3. Floating Particles
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;
    const color = Math.random() > 0.5 ? 'var(--spider-red)' : 'var(--electric-blue)';
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color};
    `;
    
    container.appendChild(particle);
}

// 4. Swinging Spider-Man Animation (Canvas)
function initSwingingSpider() {
    const canvas = document.getElementById('swing-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class SpiderMan {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.anchorX = Math.random() * width * 0.6 + width * 0.2;
            this.anchorY = -100;
            this.length = 300 + Math.random() * 200;
            this.angle = Math.PI / 3;
            this.angleVel = 0;
            this.gravity = 0.3;
            this.damping = 0.995;
            this.x = this.anchorX + this.length * Math.sin(this.angle);
            this.y = this.anchorY + this.length * Math.cos(this.angle);
            this.swaySpeed = 0.02 + Math.random() * 0.02;
            this.color = Math.random() > 0.5 ? '#E10600' : '#000000';
            this.eyeColor = '#ffffff';
        }
        
        update() {
            // Pendulum physics
            const force = -this.gravity / this.length * Math.sin(this.angle);
            this.angleVel += force;
            this.angleVel *= this.damping;
            this.angle += this.angleVel;
            
            this.x = this.anchorX + this.length * Math.sin(this.angle);
            this.y = this.anchorY + this.length * Math.cos(this.angle);
            
            // Reset if off screen
            if (this.x < -100 || this.x > width + 100 || this.y > height + 100) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            
            // Draw web line
            ctx.beginPath();
            ctx.moveTo(this.anchorX, this.anchorY);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Draw small web details
            for (let i = 0.2; i < 0.8; i += 0.2) {
                const wx = this.anchorX + (this.x - this.anchorX) * i;
                const wy = this.anchorY + (this.y - this.anchorY) * i;
                ctx.beginPath();
                ctx.arc(wx, wy, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.fill();
            }
            
            // Draw Spider-Man (simplified stylized version)
            ctx.translate(this.x, this.y);
            ctx.rotate(-this.angle);
            
            // Body (oval shape)
            ctx.beginPath();
            ctx.ellipse(0, 0, 25, 35, 0, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Spider emblem on chest
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(-8, 5);
            ctx.lineTo(0, 0);
            ctx.lineTo(8, 5);
            ctx.closePath();
            ctx.fillStyle = this.color === '#E10600' ? '#000000' : '#E10600';
            ctx.fill();
            
            // Spider legs (8 legs)
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 3;
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI) / 4 - Math.PI / 2;
                const legX = Math.cos(angle) * 35;
                const legY = Math.sin(angle) * 35;
                
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(legX * 0.5, legY * 0.5, legX, legY);
                ctx.stroke();
                
                // Mirror for other side
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(-legX * 0.5, legY * 0.5, -legX, legY);
                ctx.stroke();
            }
            
            // Eyes (Spider-Man mask style)
            ctx.fillStyle = this.eyeColor;
            
            // Left eye
            ctx.beginPath();
            ctx.moveTo(-15, -8);
            ctx.quadraticCurveTo(-20, 5, -5, 12);
            ctx.quadraticCurveTo(-5, 2, -15, -8);
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Right eye
            ctx.beginPath();
            ctx.moveTo(15, -8);
            ctx.quadraticCurveTo(20, 5, 5, 12);
            ctx.quadraticCurveTo(5, 2, 15, -8);
            ctx.fill();
            ctx.stroke();
            
            ctx.restore();
        }
    }
    
    // Create multiple swinging spiders
    const spiders = [];
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            spiders.push(new SpiderMan());
        }, i * 2000);
    }
    
    let frameCount = 0;
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Only animate every 2nd frame for performance
        if (frameCount % 2 === 0) {
            spiders.forEach(spider => {
                spider.update();
                spider.draw();
            });
        }
        
        frameCount++;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 5. Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });
}

// 6. Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// 7. Countdown Timer
function initCountdown() {
    const eventDate = new Date('February 20, 2026 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 8. Parallax Effect
function initParallax() {
    const parallaxBg = document.getElementById('parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (parallaxBg) {
            parallaxBg.style.transform = `scale(1.1) translateY(${scrolled * 0.4}px)`;
        }
    });
    
    // Mouse parallax for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            if (parallaxBg) {
                parallaxBg.style.transform = `scale(1.1) translate(${xPos}px, ${yPos}px)`;
            }
        });
    }
}

// 9. Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// 10. Web Shoot Effect on Buttons
function initWebShootEffect() {
    const webButtons = document.querySelectorAll('.web-shoot-btn');
    
    webButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create web string effect
            const web = document.createElement('div');
            web.style.cssText = `
                position: fixed;
                top: ${e.clientY}px;
                left: ${e.clientX}px;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 20px white;
            `;
            document.body.appendChild(web);
            
            // Animate web shooting to top corner
            const targetX = Math.random() > 0.5 ? 0 : window.innerWidth;
            const targetY = 0;
            
            web.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${targetX - e.clientX}px, ${targetY - e.clientY}px) scale(0.5)`, opacity: 0 }
            ], {
                duration: 500,
                easing: 'ease-out'
            }).onfinish = () => web.remove();
            
            // Play "thwip" sound effect (visual feedback)
            createThwipEffect(e.clientX, e.clientY);
        });
    });
}

function createThwipEffect(x, y) {
    const thwip = document.createElement('div');
    thwip.textContent = 'THWIP!';
    thwip.style.cssText = `
        position: fixed;
        top: ${y - 30}px;
        left: ${x}px;
        font-family: 'Bangers', cursive;
        font-size: 1.5rem;
        color: white;
        text-shadow: 0 0 10px var(--spider-red);
        pointer-events: none;
        z-index: 9999;
        transform: translateX(-50%);
    `;
    document.body.appendChild(thwip);
    
    thwip.animate([
        { transform: 'translateX(-50%) translateY(0) scale(0.5)', opacity: 0 },
        { transform: 'translateX(-50%) translateY(-20px) scale(1)', opacity: 1, offset: 0.3 },
        { transform: 'translateX(-50%) translateY(-40px) scale(1.2)', opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    }).onfinish = () => thwip.remove();
}

// 11. Prize Counter Animation
function initPrizeCounter() {
    const prizeElement = document.getElementById('prize-counter');
    if (!prizeElement) return;
    
    const targetValue = 10000;
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounter(prizeElement, targetValue);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(prizeElement);
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

// 12. 3D Card Tilt Effect
function init3DCardTilt() {
    const cards = document.querySelectorAll('.domain-card, .date-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// 13. Glitch Text Effect (for special elements)
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(el => {
        setInterval(() => {
            el.style.textShadow = `
                ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 var(--spider-red),
                ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 var(--electric-blue)
            `;
            
            setTimeout(() => {
                el.style.textShadow = '';
            }, 100);
        }, 3000 + Math.random() * 2000);
    });
}

// Initialize 3D tilt and glitch effects
init3DCardTilt();
initGlitchEffect();

// 14. Comic Speech Bubble Tooltips
function createSpeechBubble(element, text) {
    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    bubble.textContent = text;
    bubble.style.cssText = `
        position: absolute;
        background: white;
        color: black;
        padding: 10px 15px;
        border-radius: 15px;
        font-family: 'Bangers', cursive;
        font-size: 1rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    
    element.style.position = 'relative';
    element.appendChild(bubble);
    
    element.addEventListener('mouseenter', () => {
        bubble.style.opacity = '1';
        bubble.style.transform = 'scale(1) translateY(-100%)';
    });
    
    element.addEventListener('mouseleave', () => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'scale(0) translateY(-100%)';
    });
}

// Add speech bubbles to elements
document.querySelectorAll('.domain-card').forEach((card, index) => {
    const messages = [
        'Build the web!',
        'Train the AI!',
        'Go mobile!',
        'Hack the planet!'
    ];
    createSpeechBubble(card, messages[index]);
});

// 15. Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Press 'S' for spider-sense effect
    if (e.key === 's' || e.key === 'S') {
        triggerSpiderSense();
    }
});

function triggerSpiderSense() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, transparent 30%, rgba(225, 6, 0, 0.3) 70%);
        pointer-events: none;
        z-index: 9998;
        animation: spiderSense 1s ease-out forwards;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spiderSense {
            0% { opacity: 0; transform: scale(1.5); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.remove();
        style.remove();
    }, 1000);
}

// Console Easter Egg
console.log('%c🕷️ CODEVERSE\'26', 'font-size: 30px; font-weight: bold; color: #E10600; text-shadow: 2px 2px 0 #00D4FF;');
console.log('%cWith great power comes great responsibility.', 'font-size: 14px; font-style: italic; color: #00D4FF;');
console.log('%cReady to hack? Visit the registration section!', 'font-size: 12px; color: #ffffff;');
