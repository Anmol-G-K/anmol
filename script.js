// ========== PROJECTS DATA - EDIT YOUR PROJECTS HERE ==========
// Each project object has the following properties:
// - title: Project name
// - description: Brief description of the project
// - tags: Array of technology tags
// - github: GitHub repository URL (optional)
// - demo: Live demo URL (optional)

const projectsData = [
    {
        title: 'Gesture Controlled Robotic Arm',
        description: 'An innovative robotic arm system controlled through hand gestures and computer vision, demonstrating real-time signal processing and robotics integration.',
        tags: ['Robotics', 'Computer Vision', 'Control Systems'],
        github: 'https://github.com/Robo-Linkers/Gesture-controlled-robotic-arm',
        demo: null
    },
    {
        title: 'Electronic Component Classifier',
        description: 'Machine learning system for automated classification and sorting of electronic components, combining computer vision with embedded systems.',
        tags: ['ML', 'Computer Vision', 'Embedded Systems'],
        github: 'https://github.com/Vanguard-s/Electronic-Component-Sorter',
        demo: null
    },
    {
        title: 'Hardware Design & Optimization',
        description: 'Ongoing exploration in PCB design, circuit optimization, and hardware architecture. Working with KiCad, Altium, and simulation tools for real-world applications.',
        tags: ['PCB Design', 'Circuit Design', 'Hardware'],
        github: null,
        demo: null
    }
];
// ========== END OF PROJECTS DATA ==========

// Function to render projects dynamically
function renderProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Create tags HTML
        const tagsHTML = project.tags
            .map(tag => `<span class="project-tag">${tag}</span>`)
            .join('');
        
        // Create links HTML
        let linksHTML = '<div class="project-links">';
        
        if (project.github) {
            linksHTML += `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>`;
        }
        
        if (project.demo) {
            linksHTML += `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>`;
        }
        
        if (!project.github && !project.demo) {
            linksHTML += `<a href="mailto:booleanconnoisseurs@gmail.com?subject=About ${project.title}" class="project-link">Get Info</a>`;
        }
        
        linksHTML += '</div>';
        
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">${tagsHTML}</div>
            ${linksHTML}
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Render projects when DOM is loaded
document.addEventListener('DOMContentLoaded', renderProjects);

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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill categories and project cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-category, .project-card, .interest-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
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
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

setupMobileMenu();

// Add hover effect to skill tags
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .project-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't create ripple for external links
            if (this.getAttribute('target') === '_blank') {
                return;
            }
            
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

document.addEventListener('DOMContentLoaded', addRippleEffect);

// Lazy load images (if you add images later)
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