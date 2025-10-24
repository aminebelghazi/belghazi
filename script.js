// Portfolio JavaScript - Ugur Balci Expert Data Science & IA

class Portfolio {
    constructor() {
        this.currentLang = 'fr';
        this.isLoading = true;
        this.init();
    }

    init() {
        // Initialize particles
        this.initParticles();
        
        // Handle loading screen
        this.handleLoading();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize scroll animations
        this.initScrollAnimations();
        
        // Initialize skill bars animation
        this.initSkillBars();
        
        // Setup navigation scroll effect
        this.setupNavigation();
    }

    // Loading Screen
    handleLoading() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    this.isLoading = false;
                }, 500);
            }
        }, 1500);
    }

    // Particles Animation
    initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // Event Listeners
    setupEventListeners() {
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.scrollToSection(target);
            });
        });
    }

    // Language Switching
    switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        this.currentLang = lang;
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
        });
        
        // Update all text elements
        document.querySelectorAll('[data-fr], [data-en]').forEach(element => {
            if (element.hasAttribute(`data-${lang}`)) {
                const text = element.getAttribute(`data-${lang}`);
                
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-placeholder-fr], [data-placeholder-en]').forEach(element => {
            if (element.hasAttribute(`data-placeholder-${lang}`)) {
                element.placeholder = element.getAttribute(`data-placeholder-${lang}`);
            }
        });
    }

    // Smooth Scrolling
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = document.querySelector('.navigation').offsetHeight;
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Navigation Scroll Effect
    setupNavigation() {
        const nav = document.getElementById('navigation');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Special handling for expertise items
                    if (entry.target.classList.contains('expertise-grid')) {
                        const items = entry.target.querySelectorAll('.expertise-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, index * 100);
                        });
                    }
                    
                    // Special handling for skill categories
                    if (entry.target.classList.contains('skills-grid')) {
                        const categories = entry.target.querySelectorAll('.skill-category');
                        categories.forEach((category, index) => {
                            setTimeout(() => {
                                category.classList.add('animate');
                                
                                // Animate skill items within this category
                                const skillItems = category.querySelectorAll('.skill-item');
                                skillItems.forEach((item, itemIndex) => {
                                    setTimeout(() => {
                                        item.classList.add('animate');
                                    }, itemIndex * 100);
                                });
                            }, index * 200);
                        });
                    }
                    
                    // Special handling for timeline items
                    if (entry.target.classList.contains('experience-timeline')) {
                        const items = entry.target.querySelectorAll('.timeline-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, index * 200);
                        });
                    }
                    
                    // Special handling for project cards
                    if (entry.target.classList.contains('projects-grid')) {
                        const cards = entry.target.querySelectorAll('.project-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToObserve = [
            '.section-header',
            '.about-text',
            '.about-highlights',
            '.expertise-grid',
            '.skills-grid',
            '.experience-timeline',
            '.projects-grid',
            '.contact-info',
            '.contact-form-container',
            '.footer-content'
        ];

        elementsToObserve.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                observer.observe(element);
            });
        });
    }

    // Skill Bars Animation
    initSkillBars() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach((bar, index) => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.setProperty('--width', width + '%');
                            bar.classList.add('animate');
                        }, index * 200);
                    });
                }
            });
        }, observerOptions);

        const skillsSections = document.querySelectorAll('.skill-category');
        skillsSections.forEach(section => {
            skillObserver.observe(section);
        });
    }

    // Contact Form Handling
    handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.opportunity || !data.message) {
            this.showNotification(
                this.currentLang === 'fr' 
                    ? 'Veuillez remplir tous les champs obligatoires.'
                    : 'Please fill in all required fields.',
                'error'
            );
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showNotification(
                this.currentLang === 'fr'
                    ? 'Veuillez entrer une adresse email valide.'
                    : 'Please enter a valid email address.',
                'error'
            );
            return;
        }

        // Simulate form submission (replace with actual API call for production)
        this.showNotification(
            this.currentLang === 'fr'
                ? '✅ Message envoyé avec succès! Je vous répondrai sous 24h.'
                : '✅ Message sent successfully! I will respond within 24h.',
            'success'
        );

        // Reset form
        e.target.reset();

        // For production, you would send the data to your backend:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                language: this.currentLang,
                timestamp: new Date().toISOString()
            })
        })
        .then(response => response.json())
        .then(result => {
            this.showNotification(
                this.currentLang === 'fr'
                    ? 'Message envoyé avec succès!'
                    : 'Message sent successfully!',
                'success'
            );
            e.target.reset();
        })
        .catch(error => {
            this.showNotification(
                this.currentLang === 'fr'
                    ? 'Erreur lors de l\'envoi. Veuillez réessayer.'
                    : 'Error sending message. Please try again.',
                'error'
            );
        });
        */
    }

    // Notification System
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            color: '#ffffff',
            fontWeight: '600',
            fontSize: '0.95rem',
            zIndex: '10000',
            maxWidth: '400px',
            opacity: '0',
            transform: 'translateX(100px)',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        });

        // Set background color based on type
        const backgrounds = {
            success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
        };
        notification.style.background = backgrounds[type] || backgrounds.info;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);

        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
}

// Global functions for HTML onclick handlers
function switchLanguage(lang) {
    if (window.portfolio) {
        window.portfolio.switchLanguage(lang);
    }
}

function scrollToSection(sectionId) {
    if (window.portfolio) {
        window.portfolio.scrollToSection(sectionId);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
});

// Handle page visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause heavy animations when tab is not active
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
    } else {
        // Resume animations when tab becomes active
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            canvas.style.display = 'block';
        }
    }
});


// Add smooth scroll behavior for browsers that don't support CSS scroll-behavior
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = document.querySelector('.navigation').offsetHeight;
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;

            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function
                const ease = percentage < 0.5 
                    ? 2 * percentage * percentage 
                    : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (progress < duration) {
                    requestAnimationFrame(step);
                }
            };
            
            requestAnimationFrame(step);
        }
    };
    
    // Override the global function
    window.scrollToSection = scrollToSection;
}


const canvas = document.getElementById('neuron-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Paramètres du réseau
const nodeCount = 80;
const nodes = [];

for(let i=0;i<nodeCount;i++){
    nodes.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        vx: (Math.random()-0.5)*0.5,
        vy: (Math.random()-0.5)*0.5,
        move: function(){ this.x += this.vx; this.y += this.vy; 
            if(this.x<0||this.x>canvas.width) this.vx*=-1;
            if(this.y<0||this.y>canvas.height) this.vy*=-1;
        }
    });
}

// Dégradé néon
const neuronGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
neuronGradient.addColorStop(0, '#00FFFF');
neuronGradient.addColorStop(1, '#9B30FF');

function drawNetwork(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Lignes entre noeuds proches
    for(let i=0;i<nodeCount;i++){
        for(let j=i+1;j<nodeCount;j++){
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 200){
                ctx.strokeStyle = 'rgba(0,255,255,0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }

    // Noeuds
    nodes.forEach(n=>{
        ctx.fillStyle = neuronGradient;
        ctx.beginPath();
        ctx.arc(n.x,n.y,3,0,Math.PI*2);
        ctx.fill();
        n.move();
    });

    requestAnimationFrame(drawNetwork);
}

drawNetwork();

// Supprime le loading screen après 2,5s
setTimeout(()=>{ 
    document.getElementById('loading-screen').style.opacity='0';
    setTimeout(()=>{ document.getElementById('loading-screen').style.display='none'; },500);
}, 2500);

function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}
