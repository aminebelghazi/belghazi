// === Portfolio "Neural Flow" — Amine Belghazi ===

class Portfolio {
  constructor() {
    this.isLoading = true;
    this.init();
  }

  init() {
    this.handleLoading();
    setTimeout(() => {
      this.initHeroParticles();
      this.setupNavigation();
      this.setupScrollObserver();
      this.initSkillBars();
    }, 800);

    this.initNeuronBackground();
  }

  /* Loading */
  handleLoading() {
    const loading = document.getElementById('loading-screen');
    if (!loading) return;
    setTimeout(() => {
      loading.classList.add('fade-out');
      setTimeout(() => { loading.style.display = 'none'; this.isLoading = false; }, 600);
    }, 900);
  }

  /* Navigation */
  setupNavigation() {
    const nav = document.getElementById('navigation');
    if (nav) {
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      });
    }

    // Fermer menu mobile après clic
    document.querySelectorAll('.nav-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const menu = document.querySelector('.nav-menu');
        if (menu && menu.classList.contains('active')) menu.classList.remove('active');
      });
    });
  }

  /* Smooth scroll util */
  scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    const navHeight = document.querySelector('.navigation')?.offsetHeight || 0;
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  /* Reveal on scroll */
  setupScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('animate');
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* Skill bars animation */
  initSkillBars() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.bar i').forEach((bar, i) => {
          const w = bar.getAttribute('data-width') || 0;
          setTimeout(() => { bar.style.setProperty('--w', w + '%'); bar.style.width = w + '%'; }, i * 120);
        });
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.skill-card').forEach(card => io.observe(card));
  }

  /* Hero particles canvas */
  initHeroParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize(); window.addEventListener('resize', resize);

    const count = window.innerWidth < 768 ? 30 : 60;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      o: Math.random() * 0.5 + 0.25
    }));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,255,${p.o})`;
        ctx.fill();
      });
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* Background neural network */
  initNeuronBackground() {
    const canvas = document.getElementById('neuron-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let gradient;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#00FFFF');
      gradient.addColorStop(1, '#9B30FF');
    };
    resize(); window.addEventListener('resize', resize);

    const N = window.innerWidth < 768 ? 50 : 80;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // lines
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 180) {
            ctx.strokeStyle = `rgba(0,255,255,${(1 - d / 180) * .25})`;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }
      // nodes
      nodes.forEach(n => {
        ctx.fillStyle = gradient;
        ctx.beginPath(); ctx.arc(n.x, n.y, 2.6, 0, Math.PI * 2); ctx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      requestAnimationFrame(draw);
    };
    draw();
  }
}

/* ====== Helpers globaux ====== */
function scrollToSection(id) {
  if (window.portfolio && typeof window.portfolio.scrollToSection === 'function') {
    window.portfolio.scrollToSection(id);
  }
}
function toggleMenu() {
  const menu = document.querySelector('.nav-menu');
  if (menu) {
    const active = menu.classList.toggle('active');
    menu.style.display = active ? 'flex' : '';
  }
}
function copyEmail() {
  const email = 'aminebelghazi@outlook.fr';
  navigator.clipboard.writeText(email).then(() => {
    alert('Adresse copiée : ' + email);
  });
}

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  window.portfolio = new Portfolio();
});
