// Portfolio JavaScript - Amine Belghazi | Data Science, Modélisation & IA

class Portfolio {
    constructor() {
        this.currentLang = 'fr';
        this.isLoading = true;
        this.init();
    }

    init() {
        this.handleLoading();
        setTimeout(() => {
            this.initParticles();       // démarre après le fade-out
            this.setupNavigation();
            this.setupEventListeners();
            this.initScrollAnimations();
            this.initSkillBars();
        }, 1200);
    }

    /* --- Écran de chargement --- */
    handleLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;

        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.isLoading = false;
            }, 600);
        }, 1500);
    }

    /* --- Animation de particules (canvas du hero) --- */
    initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        for (let i = 0; i < 60; i++) {
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
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        };

        animate();
    }

    /* --- Navigation & scroll doux --- */
    setupNavigation() {
        const nav = document.getElementById('navigation');
        if (!nav) return;
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    setupEventListeners() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = link.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                if (target) this.scrollToSection(target);
            });
        });
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = document.querySelector('.navigation').offsetHeight;
            const targetPos = element.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    }

    /* --- Animations de sections au scroll --- */
    initScrollAnimations() {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    if (entry.target.classList.contains('experience-timeline')) {
                        entry.target.querySelectorAll('.timeline-item')
                            .forEach((item, i) => setTimeout(() => item.classList.add('animate'), i * 200));
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

    /* --- Animation des barres de compétences --- */
    initSkillBars() {
        const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -50px 0px' };
        const skillObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.skill-progress');
                    bars.forEach((bar, i) => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.setProperty('--width', width + '%');
                            bar.classList.add('animate');
                        }, i * 200);
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-category').forEach(sec => skillObserver.observe(sec));
    }
}

/* --- Fonctions globales --- */
function switchLanguage(lang) {
    if (window.portfolio) window.portfolio.switchLanguage(lang);
}
function scrollToSection(sectionId) {
    if (window.portfolio) window.portfolio.scrollToSection(sectionId);
}

/* --- Initialisation complète après chargement du DOM --- */
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();

    /* === Animation du réseau neuronal (canvas global) === */
    const canvas = document.getElementById('neuron-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodeCount = 80;
    const nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        move() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
    }));

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#00FFFF');
    gradient.addColorStop(1, '#9B30FF');

    function drawNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < 200) {
                    ctx.strokeStyle = 'rgba(0,255,255,0.25)';
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        nodes.forEach(n => {
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
            ctx.fill();
            n.move();
        });
        requestAnimationFrame(drawNetwork);
    }
    drawNetwork();
});

/* --- Menu mobile --- */
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    if (menu) menu.classList.toggle('active');
}
