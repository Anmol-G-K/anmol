// ==========================================
// DYNAMIC PORTFOLIO SCRIPT
// Interactive Effects & Theme Management
// Neo-Brutalist 2026 Edition
// ==========================================

// ==========================================
// THEME TOGGLE
// ==========================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;

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
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
// INTERSECTION OBSERVER — fade-in-section
// Uses .visible class for CSS spring transition
// ==========================================

const observerOptions = { threshold: 0.08, rootMargin: '0px 0px -80px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(el => {
    observer.observe(el);
});

// ==========================================
// LOGO EASTER EGG — Elastic spring-back
// Preserved: id="logoInteractive", clickCount=3
// ==========================================

let clickCount = 0;
const logo = document.getElementById('logoInteractive');

logo.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 3) {
        // Remove class first so re-triggering works
        logo.classList.remove('easter-egg-spring');
        // Force reflow
        void logo.offsetWidth;
        // Add class — CSS uses cubic-bezier(0.34, 1.8, 0.64, 1) elastic ease
        logo.classList.add('easter-egg-spring');

        // Clean up after animation completes
        setTimeout(() => {
            logo.classList.remove('easter-egg-spring');
        }, 750);

        clickCount = 0;
    }
});

// Inline rainbow-pulse keyframe still injected for compatibility
// (CSS class version is primary; this is fallback for any direct .style.animation calls)
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow-pulse {
        0%   { transform: scale(1);               color: #0040ff; }
        20%  { transform: scale(1.35) rotate(12deg); color: #ff3c00; }
        40%  { transform: scale(0.88) rotate(-6deg); color: #c8ff00; }
        60%  { transform: scale(1.22) rotate(6deg);  color: #ff00aa; }
        80%  { transform: scale(0.95) rotate(-2deg); color: #0040ff; }
        100% { transform: scale(1);                  color: inherit;  }
    }
`;
document.head.appendChild(style);

// ==========================================
// SKILL TAGS HOVER — Spring-back shine
// ==========================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.animation = 'none';
        void this.offsetWidth;
        this.style.animation = 'skill-shine 0.55s cubic-bezier(0.34, 1.7, 0.64, 1)';
    });
    tag.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});

const shineStyle = document.createElement('style');
shineStyle.textContent = `
    @keyframes skill-shine {
        0%   { filter: brightness(1);   transform: scale(1); }
        30%  { filter: brightness(2.2); transform: scale(1.2) translateY(-3px); }
        55%  { filter: brightness(0.8); transform: scale(0.93); }
        80%  { filter: brightness(1.5); transform: scale(1.06); }
        100% { filter: brightness(1);   transform: scale(1); }
    }
`;
document.head.appendChild(shineStyle);

// ==========================================
// NAME ANIMATION CONTROL — Typing effect
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const text = "ElecTRIcal & ELECTRONICS EnGIneeR";
    const typingElement = document.getElementById("typing-text");

    if (!typingElement) return;

    let index = 0;
    let isDeleting = false;

    const typingSpeed    = 80;
    const deletingSpeed  = 40;
    const pauseAfterTyping   = 1200;
    const pauseAfterDeleting = 500;

    function typeLoop() {
        if (!isDeleting) {
            typingElement.textContent = text.substring(0, index + 1);
            index++;
            if (index === text.length) {
                setTimeout(() => { isDeleting = true; }, pauseAfterTyping);
            }
        } else {
            typingElement.textContent = text.substring(0, index - 1);
            index--;
            if (index === 0) {
                isDeleting = false;
                setTimeout(() => {}, pauseAfterDeleting);
            }
        }
        setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
    }

    typeLoop();
});

// ==========================================
// CIRCUIT ANIMATION CONTROL
// ==========================================

const circuitPaths = document.querySelectorAll('.circuit-path');

document.addEventListener('scroll', () => {
    circuitPaths.forEach(path => {
        path.style.animationPlayState = 'running';
    });
});

// ==========================================
// PROJECT CARDS HOVER EFFECT
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function () {
        projectCards.forEach((c, i) => {
            if (i !== index) {
                c.style.opacity = '0.6';
                c.style.transition = 'opacity 0.25s ease';
            }
        });
    });
    card.addEventListener('mouseleave', function () {
        projectCards.forEach((c) => {
            c.style.opacity = '1';
        });
    });
});

// ==========================================
// INTEREST ITEMS HOVER — Elastic spring
// ==========================================

const interestItems = document.querySelectorAll('.interest-item');

interestItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        // CSS handles the transform spring; JS keeps for legacy compatibility
        this.style.boxShadow = '6px 6px 0 var(--fg)';
    });
    item.addEventListener('mouseleave', function () {
        this.style.boxShadow = '';
    });
});

// ==========================================
// BUTTON CLICK RIPPLE EFFECT
// ==========================================

document.querySelectorAll('.btn, .project-link').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width  = ripple.style.height = size + 'px';
        ripple.style.left   = x + 'px';
        ripple.style.top    = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    });
});

// Ripple CSS — elastic spring version
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .project-link { position: relative; overflow: hidden; }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 60, 0, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to { transform: scale(4); opacity: 0; }
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
            circuitBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
            hero.style.opacity = 1 - scrolled / (window.innerHeight * 1.5);
        }
    });
}

// ==========================================
// PERFORMANCE: LAZY LOADING
// ==========================================

if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                obs.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// DYNAMIC TITLE ANIMATION ON PAGE LOAD
// ==========================================

window.addEventListener('load', () => {
    document.querySelectorAll('.title-char').forEach((char, index) => {
        setTimeout(() => { char.style.opacity = '1'; }, index * 50);
    });
});

// ==========================================
// ACTIVE NAV LINK STYLE
// ==========================================

const style2 = document.createElement('style');
style2.textContent = `
    .nav-link.active {
        background: var(--fg);
        color: var(--bg);
        font-weight: 700;
    }
`;
document.head.appendChild(style2);

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.animation = 'page-load 0.4s ease-out';
});

const pageLoadStyle = document.createElement('style');
pageLoadStyle.textContent = `
    @keyframes page-load {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
`;
document.head.appendChild(pageLoadStyle);

// ==========================================
// CONSOLE EASTER EGG — preserved
// ==========================================

console.log(
    '%c⚡ Welcome to Anmol Krishhh\'s Portfolio ⚡',
    'color: #ff3c00; font-size: 20px; font-weight: bold; letter-spacing: 2px;'
);
console.log(
    '%c"From circuits to code, everything is possible!"',
    'color: #0040ff; font-size: 14px; font-style: italic;'
);
console.log(
    '%cElectrical & Electronics Engineer | Hardware & Embedded Systems',
    'color: #c8ff00; background: #0d0d0d; font-size: 12px; padding: 2px 6px;'
);
console.log(
    '%cTip: Click the logo 3 times for a surprise! ⚡',
    'color: #ff3c00; font-size: 12px;'
);

// ==========================================
// MOUSE TRAIL — hero section cursor glow
// ==========================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const heroEl = document.querySelector('.hero');
    if (heroEl && window.scrollY < window.innerHeight) {
        const rect = heroEl.getBoundingClientRect();
        if (mouseY > rect.top && mouseY < rect.bottom) {
            heroEl.style.setProperty('--mouse-x', mouseX + 'px');
            heroEl.style.setProperty('--mouse-y', mouseY + 'px');
        }
    }
});

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================

const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ==========================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '1') {
        document.querySelector('.hero-content')?.focus();
    }
});