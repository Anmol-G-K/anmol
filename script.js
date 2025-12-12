// Randomized Lightning Blink Effect - Direct Opacity Control
(function() {
    const lightning = document.querySelector('.lightning');
    if (!lightning) return;
    
    // Reset any animation styles that might not be working
    lightning.style.animation = 'none';
    lightning.style.webkitAnimation = 'none';
    
    function blink() {
        // Random stutter pattern
        const pattern = [
            { opacity: 1, duration: 150 },
            { opacity: 0.4, duration: 100 },
            { opacity: 1, duration: 150 },
            { opacity: 0.3, duration: 100 },
            { opacity: 1, duration: 200 }
        ];
        
        let delay = 0;
        pattern.forEach((step) => {
            setTimeout(() => {
                lightning.style.opacity = step.opacity;
                lightning.style.textShadow = `0 0 ${step.opacity * 4}px rgba(251, 191, 36, ${step.opacity * 0.5})`;
            }, delay);
            delay += step.duration;
        });
        
        // Wait before next blink sequence (2-4 seconds random)
        setTimeout(blink, delay + (Math.random() * 2000 + 2000));
    }
    
    // Start blinking
    blink();
})();
(function() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
    
    // Set initial theme
    if (savedTheme === 'light') {
        html.style.colorScheme = 'light';
        html.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        html.style.colorScheme = 'dark';
        html.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '💡';
    }
    
    // Toggle on click
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const currentTheme = html.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        html.style.colorScheme = newTheme;
        localStorage.setItem('portfolioTheme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '🌙' : '💡';
    });
})();

// Smooth scrolling for navigation links
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

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -10px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
        }
    });
}, observerOptions);

// Observe skill categories and project cards
document.querySelectorAll('.skill-category, .project-card, .interest-item').forEach(el => {
    observer.observe(el);
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// Mobile menu toggle (if needed for hamburger menu)
function setupMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

setupMobileMenu();

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
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
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

addRippleEffect();

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Log page load time
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time: ' + pageLoadTime + 'ms');
});