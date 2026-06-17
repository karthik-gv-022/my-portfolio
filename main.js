   'use strict';

    // ============================================================
    // SKILLS DATA
    // ============================================================
    const skills = [
      { abbr: 'H5',  name: 'HTML5',        cat: 'Core',      g: 'linear-gradient(135deg,#E44D26,#F16529)' },
      { abbr: 'CS',  name: 'CSS3',          cat: 'Core',      g: 'linear-gradient(135deg,#1572B6,#33A9DC)' },
      { abbr: 'JS',  name: 'JavaScript',    cat: 'Core',      g: 'linear-gradient(135deg,#F7DF1E,#F0B300)', dark: true },
      { abbr: 'TS',  name: 'TypeScript',    cat: 'Language',  g: 'linear-gradient(135deg,#3178C6,#55AADD)' },
      { abbr: 'Re',  name: 'React',         cat: 'Framework', g: 'linear-gradient(135deg,#3B82F6,#06B6D4)' },
      { abbr: 'N',   name: 'Node.js',       cat: 'Runtime',   g: 'linear-gradient(135deg,#339933,#68CC68)' },
      { abbr: 'Vt',  name: 'Vite',          cat: 'Tooling',   g: 'linear-gradient(135deg,#646CFF,#BD34FE)' },
      { abbr: 'A11', name: 'Accessibility', cat: 'Practice',  g: 'linear-gradient(135deg,#06B6D4,#0EA5E9)' },
      { abbr: 'Px',  name: 'Performance',   cat: 'Practice',  g: 'linear-gradient(135deg,#8B5CF6,#EC4899)' },
    ];

    const grid = document.getElementById('skillsGrid');

    skills.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'skill-card reveal';
      card.style.setProperty('--g', s.g);
      card.style.transitionDelay = (i * 0.06) + 's';
      card.innerHTML = `
        <div class="skill-card-glow"></div>
        <span class="skill-abbr">${s.abbr}</span>
        <div class="skill-name">${s.name}</div>
        <div class="skill-cat">${s.cat}</div>
      `;
      grid.appendChild(card);

      // 3D tilt on hover
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -10;
        const rotY = ((x - cx) / cx) * 10;
        card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
        card.style.setProperty('--mx', (x / rect.width * 100) + '%');
        card.style.setProperty('--my', (y / rect.height * 100) + '%');
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // ============================================================
    // CUSTOM CURSOR
    // ============================================================
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let animFrame;

    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

    if (!isTouchDevice()) {
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
      });

      const lerp = (a, b, t) => a + (b - a) * t;

      const updateRing = () => {
        ringX = lerp(ringX, mouseX, 0.12);
        ringY = lerp(ringY, mouseY, 0.12);
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        animFrame = requestAnimationFrame(updateRing);
      };
      updateRing();

      // Hover state on interactive elements
      const interactives = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card, .exp-card');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
      });

      document.addEventListener('mouseleave', () => {
        dot.style.opacity  = '0';
        ring.style.opacity = '0';
      });
      document.addEventListener('mouseenter', () => {
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
      });
    }

    // ============================================================
    // NAV: SCROLL GLASS + ACTIVE STATES
    // ============================================================
    const nav    = document.getElementById('nav');
    const links  = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);

      // Active nav
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
      });
      links.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ============================================================
    // MOBILE NAV
    // ============================================================
    const hamburger   = document.getElementById('navHamburger');
    const mobileNav   = document.getElementById('navMobile');
    const closeBtn    = document.getElementById('navClose');
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');

    const openMobileNav = () => {
      mobileNav.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeMobileNav = () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', openMobileNav);
    closeBtn.addEventListener('click', closeMobileNav);
    mobileLinks.forEach(l => l.addEventListener('click', closeMobileNav));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileNav();
    });

    // ============================================================
    // SMOOTH SCROLL
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // ============================================================
    // SCROLL REVEAL (Intersection Observer)
    // ============================================================
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ============================================================
    // HERO PARALLAX (floating shapes follow mouse slightly)
    // ============================================================
    const shapes = document.querySelectorAll('.shape');
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      shapes.forEach((s, i) => {
        const depth = (i + 1) * 4;
        s.style.transform = `translate(${dx * depth}px, ${dy * depth}px) rotate(${i * 12}deg)`;
      });
    });

    // ============================================================
    // PROJECT CARD TILT
    // ============================================================
    document.querySelectorAll('.project-card:not(.accent)').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -3;
        const rotY = ((x - cx) / cx) * 3;
        card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // ============================================================
    // PREFERS-REDUCED-MOTION: disable animations
    // ============================================================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible');
      });
      if (animFrame) cancelAnimationFrame(animFrame);
    }