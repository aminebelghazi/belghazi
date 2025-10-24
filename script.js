// Portfolio JavaScript - Amine Belghazi | Data Science, Modélisation & IA

class Portfolio {
    constructor() {
        this.currentLang = 'fr';
        this.isLoading = true;
        this.init();
    }

    init() {
        this.initParticles();
        this.handleLoading();
        this.setupEventListeners();
        this.initScrollAnimations();
        this.initSkillBars();
        this.setupNavigation();
    }

    // Écran de chargement
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

    // Animation de particules vertes (fond Hero)
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

    // Gestion des événements
    setupEventListeners() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.scrollToSection(target);
            });
        });
    }

    // Changement de langue
    switchLanguage(lang) {
        if (lang === this.currentLang) return;
        this.currentLang = lang;

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
        });

        document.querySelectorAll('[data-fr], [data-en]').forEach(element => {
            if (element.hasAttribute(`data-${lang}`)) {
                const text = element.getAttribute(`data-${lang}`);
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    // Défilement fluide
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

    // Navigation dynamique
    setupNavigation() {
        const nav = document.getElementById('navigation');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });
    }

    // Animation d'apparition au scroll
    initScrollAnimations() {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');

                    if (entry.target.classList.contains('experience-timeline')) {
                        const items = entry.target.querySelectorAll('.timeline-item');
                        items.forEach((item, index) =>
                            setTimeout(() => item.classList.add('animate'), index * 200)
                        );
                    }
                }
            });
        }, observerOptions);

        const elements = [
            '.section-header', '.about-text', '.skills-grid',
            '.experience-timeline', '.contact-info', '.footer-content'
        ];
        elements.forEach(sel =>
            document.querySelectorAll(sel).forEach(el => observer.observe(el))
        );
    }

    // Animation barres de compétences
    initSkillBars() {
        const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -50px 0px' };
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.skill-progress');
                    bars.forEach((bar, index) => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.setProperty('--width', width + '%');
                            bar.classList.add('animate');
                        }, index * 200);
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-category').forEach(sec => skillObserver.observe(sec));
    }

    // Formulaire de contact
    handleContactForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (!data.name || !data.email || !data.opportunity || !data.message) {
            this.showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        this.showNotification('✅ Message envoyé avec succès ! Amine Belghazi vous répondra sous 24h.', 'success');
        e.target.reset();
    }

    // Notifications
    showNotification(message, type = 'info') {
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            color: '#fff',
            fontWeight: '600',
            fontSize: '0.95rem',
            zIndex: '10000',
            maxWidth: '400px',
            opacity: '0',
            transform: 'translateX(100px)',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        });

        const bg = {
            success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
        };
        notification.style.background = bg[type] || bg.info;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Fonctions globales
function switchLanguage(lang) {
    if (window.portfolio) window.portfolio.switchLanguage(lang);
}
function scrollToSection(sectionId) {
    if (window.portfolio) window.portfolio.scrollToSection(sectionId);
}

// Initialisation principale
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();

    // Animation fond neurones (corrigée)
    const canvas = document.getElementById('neuron-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodeCount = 80;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            move: function () {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        });
    }

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#00FFFF');
    grad.addColorStop(1, '#9B30FF');

    function drawNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    ctx.strokeStyle = 'rgba(0,255,255,0.3)';
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        nodes.forEach(n => {
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
            ctx.fill();
            n.move();
        });

        requestAnimationFrame(drawNetwork);
    }

    drawNetwork();
});

// Masquer le loading screen
setTimeout(() => {
    const screen = document.getElementById('loading-screen');
    if (screen) {
        screen.style.opacity = '0';
        setTimeout(() => { screen.style.display = 'none'; }, 500);
    }
}, 2500);

// Menu mobile
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}
