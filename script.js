/* ============================================================
   LASEA — Lady Anusuya Singhania Educational Academy
   index.js  |  Main JavaScript
   ============================================================
   Dependencies (loaded before this file in <head> / <body>):
     - gsap 3.12.2          (cdn)
     - gsap ScrollTrigger   (cdn)
   ============================================================ */

'use strict';

/* ============================================================
   REGISTER GSAP PLUGINS
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   HELPERS
   ============================================================ */

/**
 * Returns the rendered height of the announcement band.
 * Used to offset the navbar position.
 */
function getBandHeight() {
    const band = document.getElementById('announcementBand');
    return band ? band.offsetHeight : 0;
}


/* ============================================================
   LOADER
   ============================================================ */
(function initLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) loader.classList.add('hidden');

            // Place navbar below the announcement band
            const navbar = document.getElementById('navbar');
            if (navbar) navbar.style.top = getBandHeight() + 'px';

            // Fire all scroll / entrance animations after load
            initAnimations();
        }, 1400);
    });
})();


/* ============================================================
   NAVBAR — scroll state + colour swap
   ============================================================ */
(function initNavbar() {
    const navbar    = document.getElementById('navbar');
    const logoTitle = document.getElementById('logoTitle');
    const navLinks  = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');

    if (!navbar) return;

    function onScroll() {
        const scrolled = window.scrollY > 60;

        // Swap style
        navbar.classList.toggle('nav-scrolled', scrolled);
        navbar.style.top = scrolled ? '0' : getBandHeight() + 'px';

        // Logo text colour
        if (logoTitle) {
            logoTitle.classList.toggle('text-white',       !scrolled);
            logoTitle.classList.toggle('text-school-navy',  scrolled);
        }

        // Nav-link colours
        navLinks.forEach(link => {
            link.classList.toggle('text-white/85',      !scrolled);
            link.classList.toggle('text-school-navy',    scrolled);
        });

        // Back-to-top button
        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ============================================================
   ACTIVE NAV LINK — highlight current section
   ============================================================ */
(function initActiveNav() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    function highlightActive() {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', highlightActive, { passive: true });
})();


/* ============================================================
   MOBILE MENU — hamburger toggle + close on link click
   ============================================================ */
(function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const ml1 = document.getElementById('ml1');
    const ml2 = document.getElementById('ml2');
    const ml3 = document.getElementById('ml3');

    if (!menuToggle || !mobileMenu) return;

    let menuOpen = false;

    function openMenu() {
        menuOpen = true;
        mobileMenu.classList.add('active');

        // Animate hamburger → X
        ml1.style.transform = 'rotate(45deg) translate(5px, 5px)';
        ml2.style.opacity   = '0';
        ml3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
        ml3.style.width     = '24px';
    }

    function closeMenu() {
        menuOpen = false;
        mobileMenu.classList.remove('active');

        // Restore hamburger
        ml1.style.transform = 'none';
        ml2.style.opacity   = '1';
        ml3.style.transform = 'none';
        ml3.style.width     = '16px';
    }

    menuToggle.addEventListener('click', () => {
        menuOpen ? closeMenu() : openMenu();
    });

    // Close when any mobile nav link is tapped
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
})();


/* ============================================================
   SMOOTH SCROLL — override default anchor jump
   ============================================================ */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetSelector = anchor.getAttribute('href');
            if (!targetSelector || targetSelector === '#') return;

            const target = document.querySelector(targetSelector);
            if (!target) return;

            e.preventDefault();

            const offset = 90; // navbar height buffer
            const top    = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();


/* ============================================================
   BACK TO TOP button click
   ============================================================ */
(function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();


/* ============================================================
   CONTACT FORM — submission handler
   ============================================================ */
function handleFormSubmit(e) {
    e.preventDefault();

    const successMsg = document.getElementById('formSuccess');
    if (successMsg) {
        successMsg.classList.remove('hidden');
    }

    e.target.reset();

    // Auto-hide the success message after 5 s
    setTimeout(() => {
        if (successMsg) successMsg.classList.add('hidden');
    }, 5000);
}

// Make it globally accessible for the inline onsubmit attribute
window.handleFormSubmit = handleFormSubmit;


/* ============================================================
   GSAP ANIMATIONS
   ============================================================ */
function initAnimations() {

    /* ── HERO entrance ── */
    gsap.to('[data-reveal]', {
        y: 0,
        duration: 1.4,
        stagger: 0.18,
        ease: 'power4.out',
    });

    gsap.to('#heroBadge',    { opacity: 1, duration: 1,   delay: 0.3 });
    gsap.to('#heroSubtitle', { opacity: 1, y: 0, duration: 0.9, delay: 0.6 });
    gsap.to('#heroCTA',      { opacity: 1, y: 0, duration: 0.9, delay: 0.8 });
    gsap.to('#heroScroll',   { opacity: 1, duration: 0.9, delay: 1.0 });
    gsap.to('#heroStats',    { opacity: 1, duration: 0.9, delay: 1.1 });


    /* ── Hero stat counters ── */
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const obj    = { val: 0 };

        gsap.to(obj, {
            val:      target,
            duration: 2.5,
            delay:    1.5,
            ease:     'power2.out',
            onUpdate() {
                el.textContent = Math.floor(obj.val);
            },
            onComplete() {
                // 1986 stays as-is; everything else gets a "+" suffix
                el.textContent = target === 1986 ? target : target + '+';
            },
        });
    });


    /* ── Academic cards ── */
    gsap.utils.toArray('.school-card').forEach((card, i) => {
        gsap.from(card, {
            y:       55,
            opacity: 0,
            duration: 0.85,
            delay:   i * 0.08,
            ease:    'power3.out',
            scrollTrigger: {
                trigger: card,
                start:   'top 88%',
            },
        });
    });


    /* ── About section ── */
    gsap.from('.img-frame', {
        x:       -70,
        opacity: 0,
        duration: 1.1,
        ease:    'power3.out',
        scrollTrigger: {
            trigger: '#about',
            start:   'top 72%',
        },
    });

    gsap.from('#about .order-1 > *', {
        x:       50,
        opacity: 0,
        duration: 0.85,
        stagger:  0.1,
        ease:    'power3.out',
        scrollTrigger: {
            trigger: '#about',
            start:   'top 72%',
        },
    });


    /* ── Leadership testimonials ── */
    gsap.from('.testimonial-card', {
        y:       45,
        opacity: 0,
        duration: 0.85,
        stagger:  0.12,
        ease:    'power3.out',
        scrollTrigger: {
            trigger: '#leadership',
            start:   'top 78%',
        },
    });


    /* ── Gallery items ── */
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scale:   0.92,
            opacity: 0,
            duration: 0.8,
            delay:   i * 0.06,
            ease:    'power3.out',
            scrollTrigger: {
                trigger: '#gallery',
                start:   'top 82%',
            },
        });
    });


    /* ── Section headings ── */
    gsap.utils.toArray('h2').forEach(heading => {
        gsap.from(heading, {
            y:       30,
            opacity: 0,
            duration: 0.9,
            ease:    'power3.out',
            scrollTrigger: {
                trigger: heading,
                start:   'top 88%',
            },
        });
    });
}