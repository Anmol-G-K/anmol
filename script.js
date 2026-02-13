// ==========================================
// DYNAMIC PORTFOLIO SCRIPT
// Interactive Effects & Theme Management
// ==========================================

// ==========================================
// THEME TOGGLE
// ==========================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    const isDarkMode = bodyElement.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '💡';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// NAVBAR ACTIVE STATE
// ==========================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in-section class
document.querySelectorAll('.fade-in-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// ==========================================
// LOGO EASTER EGG
// ==========================================

let clickCount = 0;
const logo = document.getElementById('logoInteractive');

logo.addEventListener('click', () => {
    clickCount++;
    
    // Rainbow animation on 3 clicks
    if (clickCount === 3) {
        logo.style.animation = 'rainbow-pulse 0.6s ease-out';
        setTimeout(() => {
            logo.style.animation = '';
        }, 600);
        clickCount = 0;
    }
});

// Add CSS animation for rainbow effect
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow-pulse {
        0% {
            transform: scale(1);
            color: #3b82f6;
        }
        25% {
            transform: scale(1.2) rotate(10deg);
            color: #8b5cf6;
        }
        50% {
            transform: scale(1.1) rotate(-5deg);
            color: #10b981;
        }
        75% {
            transform: scale(1.15) rotate(5deg);
            color: #f59e0b;
        }
        100% {
            transform: scale(1);
            color: #ef4444;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// SKILL TAGS HOVER EFFECT
// ==========================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.animation = 'skill-shine 0.6s ease-out';
    });
});

const shineStyle = document.createElement('style');
shineStyle.textContent = `
    @keyframes skill-shine {
        0% {
            filter: brightness(1);
        }
        50% {
            filter: brightness(1.5);
        }
        100% {
            filter: brightness(1);
        }
    }
`;
document.head.appendChild(shineStyle);

// ==========================================
// CIRCUIT ANIMATION CONTROL
// ==========================================

const circuitPaths = document.querySelectorAll('.circuit-path');
const animationControlStyle = document.createElement('style');

let animationPaused = false;

document.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    circuitPaths.forEach(path => {
        if (!animationPaused) {
            path.style.animationPlayState = 'running';
        }
    });
});

// ==========================================
// PROJECT CARDS HOVER EFFECT
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        projectCards.forEach((c, i) => {
            if (i !== index) {
                c.style.opacity = '0.7';
                c.style.transform = 'scale(0.95)';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        projectCards.forEach((c) => {
            c.style.opacity = '1';
            c.style.transform = 'scale(1)';
        });
    });
});

// ==========================================
// INTEREST ITEMS HOVER
// ==========================================

const interestItems = document.querySelectorAll('.interest-item');

interestItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.4)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.1)';
    });
});

// ==========================================
// BUTTON CLICK RIPPLE EFFECT
// ==========================================

document.querySelectorAll('.btn, .project-link').forEach(button => {
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
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .project-link {
        position: relative;
        overflow: hidden;
    }
    
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
document.head.appendChild(rippleStyle);

// ==========================================
// PARALLAX EFFECT FOR HERO
// ==========================================

const hero = document.querySelector('.hero');
const circuitBackground = document.querySelector('.circuit-background');

if (hero && circuitBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            circuitBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - scrolled / (window.innerHeight * 1.5);
        }
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATION: LAZY LOADING
// ==========================================

if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// DYNAMIC TITLE ANIMATION ON PAGE LOAD
// ==========================================

window.addEventListener('load', () => {
    const titleChars = document.querySelectorAll('.title-char');
    titleChars.forEach((char, index) => {
        setTimeout(() => {
            char.style.opacity = '1';
        }, index * 50);
    });
});

// ==========================================
// ACTIVE NAV LINK STYLING
// ==========================================

const style2 = document.createElement('style');
style2.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        font-weight: 700;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style2);

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.animation = 'page-load 0.5s ease-out';
});

const pageLoadStyle = document.createElement('style');
pageLoadStyle.textContent = `
    @keyframes page-load {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(pageLoadStyle);

// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log(
    '%c⚡ Welcome to Anmol Krishhh\'s Portfolio ⚡',
    'color: #3b82f6; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #3b82f6;'
);
console.log(
    '%c"From circuits to code, everything is possible!"',
    'color: #8b5cf6; font-size: 14px; font-style: italic;'
);
console.log(
    '%cElectrical & Electronics Engineer | Full-Stack Maker',
    'color: #10b981; font-size: 12px;'
);

// ==========================================
// MOUSE TRAIL EFFECT (OPTIONAL - SUBTLE)
// ==========================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create subtle glow effect following cursor in hero section
    const hero = document.querySelector('.hero');
    if (hero && window.scrollY < window.innerHeight) {
        const rect = hero.getBoundingClientRect();
        if (mouseY > rect.top && mouseY < rect.bottom) {
            hero.style.setProperty('--mouse-x', mouseX + 'px');
            hero.style.setProperty('--mouse-y', mouseY + 'px');
        }
    }
});

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================

const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    width: 0;
    z-index: 2000;
    box-shadow: 0 0 10px #3b82f6;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
});

console.log(
    '%cTip: Click the logo 3 times for a surprise! 🎨',
    'color: #f59e0b; font-size: 12px;'
);

// ==========================================
// CONTACT FORM VALIDATION (IF NEEDED)
// ==========================================

// Form would go here if contact form was added

// ==========================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', (e) => {
    // Skip to main content on Ctrl+1
    if (e.ctrlKey && e.key === '1') {
        document.querySelector('.hero-content')?.focus();
    }
});