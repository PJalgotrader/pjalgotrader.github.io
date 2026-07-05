// Main JavaScript functionality for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeThemeToggle();
    initializeNavigation();
    initializeAnimations();
    initializeHeroWalk();
});

// Theme toggle — dark is the default; light is stored as a preference.
// Pages set data-theme="light" on <html> before first paint via an inline
// head script, so this only needs to handle clicks.
function initializeThemeToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        try {
            localStorage.setItem('pj-theme', isLight ? 'dark' : 'light');
        } catch (e) { /* private browsing */ }
        window.dispatchEvent(new Event('themechange'));
    });
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Add scroll effect to navbar (class toggle so theming stays in CSS)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });
    }
}

// Animation and interaction effects
function initializeAnimations() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation; siblings stagger slightly
    const animateElements = document.querySelectorAll(
        '.content-card, .highlight-card, .hero-content, .index-row, .plate, .about-text'
    );
    animateElements.forEach(el => {
        const siblingIndex = Array.prototype.indexOf.call(el.parentElement.children, el);
        const stagger = (el.classList.contains('plate') || el.classList.contains('index-row'))
            ? Math.min(Math.max(0, siblingIndex), 6) * 90
            : 0;
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease ' + stagger + 'ms, transform 0.6s ease ' + stagger + 'ms';
        observer.observe(el);
    });

    // Safety net: instant jumps (End key, anchors) skip IntersectionObserver
    // frames, so reveal anything the viewport has already passed.
    let revealTick = false;
    window.addEventListener('scroll', function() {
        if (revealTick) return;
        revealTick = true;
        requestAnimationFrame(function() {
            animateElements.forEach(el => {
                if (el.style.opacity === '0' && el.getBoundingClientRect().top < window.innerHeight) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
            revealTick = false;
        });
    }, { passive: true });

}

// Hero random walk — a quiet nod to the random walk teaching tool.
// A seeded X_t = X_{t-1} + mu + eps walk drawn live inside its own theoretical
// ±2σ√t forecast fan, with ghost realizations behind it. Click to re-roll.
function initializeHeroWalk() {
    const svg = document.getElementById('hero-walk');
    if (!svg) return;

    const NS = 'http://www.w3.org/2000/svg';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = null;
    let seed = 42;

    // Deterministic PRNG so the seed shown in the caption is real
    function mulberry32(a) {
        return function() {
            a |= 0; a = a + 0x6D2B79F5 | 0;
            let t = Math.imul(a ^ a >>> 15, 1 | a);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    function gaussianFactory(rand) {
        // Box–Muller
        return function() {
            let u = 0, v = 0;
            while (u === 0) u = rand();
            while (v === 0) v = rand();
            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        };
    }

    function simulate(walkSeed, n, mu, sigma) {
        const normal = gaussianFactory(mulberry32(walkSeed));
        const values = [0];
        for (let i = 1; i < n; i++) {
            values.push(values[i - 1] + mu + sigma * normal());
        }
        return values;
    }

    function el(tag, attrs) {
        const node = document.createElementNS(NS, tag);
        for (const k in attrs) node.setAttribute(k, attrs[k]);
        return node;
    }

    function drawWalk() {
        if (animationId) cancelAnimationFrame(animationId);
        svg.innerHTML = '';

        // Theme-aware colors so light and dark pages share this code
        const rootStyle = getComputedStyle(document.documentElement);
        const inkColor = (rootStyle.getPropertyValue('--ink') || '#1C1B18').trim();
        const accentColor = (rootStyle.getPropertyValue('--green') || '#0E7A4E').trim();
        const muteColor = (rootStyle.getPropertyValue('--ink-mute') || '#807D72').trim();
        const fanOpacity = (rootStyle.getPropertyValue('--walk-fan-opacity') || '0.05').trim();

        const w = svg.clientWidth || window.innerWidth;
        const h = svg.clientHeight || 300;
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

        const n = 220;
        const mu = 0.35;
        const sigma = h / 60;

        const values = simulate(seed, n, mu, sigma);
        const ghostA = simulate(seed + 1013, n, mu, sigma);
        const ghostB = simulate(seed + 2027, n, mu, sigma);

        // Theoretical envelope: E[X_t] = mu*t, sd = sigma*sqrt(t)
        const upper2 = [], lower2 = [], driftLine = [];
        for (let t = 0; t < n; t++) {
            const sd = sigma * Math.sqrt(t);
            driftLine.push(mu * t);
            upper2.push(mu * t + 2 * sd);
            lower2.push(mu * t - 2 * sd);
        }

        // Scale to fit walk + fan together
        const all = values.concat(ghostA, ghostB, upper2, lower2);
        const min = Math.min(...all);
        const max = Math.max(...all);
        const padTop = h * 0.10;
        const padBottom = h * 0.16;
        const scaleY = v => h - padBottom - ((v - min) / (max - min || 1)) * (h - padTop - padBottom);
        const scaleX = i => (i / (n - 1)) * w;
        const pts = arr => arr.map((v, i) => scaleX(i) + ',' + scaleY(v)).join(' ');

        // Forecast fan (±2σ√t), drawn first so everything sits on top
        const fanPts = upper2.map((v, i) => scaleX(i) + ',' + scaleY(v))
            .concat(lower2.slice().reverse().map((v, i) => scaleX(n - 1 - i) + ',' + scaleY(v)));
        svg.appendChild(el('polygon', {
            points: fanPts.join(' '), fill: accentColor, 'fill-opacity': fanOpacity
        }));
        svg.appendChild(el('polyline', {
            points: pts(upper2), fill: 'none', stroke: accentColor,
            'stroke-opacity': '0.25', 'stroke-width': '1', 'stroke-dasharray': '2 4'
        }));
        svg.appendChild(el('polyline', {
            points: pts(lower2), fill: 'none', stroke: accentColor,
            'stroke-opacity': '0.25', 'stroke-width': '1', 'stroke-dasharray': '2 4'
        }));

        // Drift line E[X_t] = mu*t
        svg.appendChild(el('polyline', {
            points: pts(driftLine), fill: 'none', stroke: muteColor,
            'stroke-opacity': '0.55', 'stroke-width': '1', 'stroke-dasharray': '6 5'
        }));

        // Axis ticks along the bottom
        const axisY = h - padBottom + 14;
        svg.appendChild(el('line', {
            x1: 0, y1: axisY, x2: w, y2: axisY,
            stroke: inkColor, 'stroke-opacity': '0.12', 'stroke-width': '1'
        }));
        for (let t = 0; t < n; t += 20) {
            svg.appendChild(el('line', {
                x1: scaleX(t), y1: axisY, x2: scaleX(t), y2: axisY + 5,
                stroke: inkColor, 'stroke-opacity': '0.25', 'stroke-width': '1'
            }));
        }

        // Ghost realizations — same process, other draws
        [ghostA, ghostB].forEach(g => {
            svg.appendChild(el('polyline', {
                points: pts(g), fill: 'none', stroke: inkColor,
                'stroke-opacity': '0.06', 'stroke-width': '1.25'
            }));
        });

        // The walk itself
        const path = el('polyline', {
            fill: 'none', stroke: inkColor, 'stroke-opacity': '0.2', 'stroke-width': '1.5'
        });
        svg.appendChild(path);

        // Pulsing ring + head dot
        const ring = el('circle', { r: '7', fill: 'none', stroke: accentColor, 'stroke-width': '1.5' });
        ring.setAttribute('class', 'walk-ring');
        svg.appendChild(ring);
        const dot = el('circle', { r: '3.5', fill: accentColor });
        svg.appendChild(dot);

        // Caption: the actual recursion, with the live seed
        const label = el('text', {
            x: 12, y: h - 8, fill: muteColor,
            'font-family': "'IBM Plex Mono', monospace", 'font-size': '11'
        });
        label.textContent = 'fig. 00 — Xₜ = Xₜ₋₁ + μ + εₜ · '
            + '±2σ√t · seed ' + String(seed).padStart(3, '0')
            + ' · click to re-roll';
        svg.appendChild(label);

        let i = 0;
        const step = reducedMotion ? n : 2;
        function frame() {
            i = Math.min(i + step, n);
            const drawn = [];
            for (let k = 0; k < i; k++) drawn.push(scaleX(k) + ',' + scaleY(values[k]));
            path.setAttribute('points', drawn.join(' '));
            if (i > 0) {
                const cx = scaleX(i - 1);
                const cy = scaleY(values[i - 1]);
                dot.setAttribute('cx', cx);
                dot.setAttribute('cy', cy);
                ring.setAttribute('cx', cx);
                ring.setAttribute('cy', cy);
            }
            if (i < n) animationId = requestAnimationFrame(frame);
        }
        frame();
    }

    drawWalk();

    svg.addEventListener('click', function() {
        seed = Math.floor(Math.random() * 999) + 1;
        drawWalk();
    });

    // Redraw with the same seed when the theme changes so colors follow
    window.addEventListener('themechange', drawWalk);

    // Redraw on resize with the same seed so the walk survives reflow
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawWalk, 200);
    });
}

// Utility functions for responsive design
function handleResponsiveGrid() {
    const contentGrids = document.querySelectorAll('.content-grid');
    
    function adjustGrid() {
        const screenWidth = window.innerWidth;
        
        contentGrids.forEach(grid => {
            if (screenWidth < 768) {
                grid.style.gridTemplateColumns = '1fr';
            } else if (screenWidth < 1024) {
                grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                // Reset to CSS default
                grid.style.gridTemplateColumns = '';
            }
        });
    }

    // Initial adjustment
    adjustGrid();

    // Adjust on window resize
    window.addEventListener('resize', adjustGrid);
}

// Initialize responsive grid handling
handleResponsiveGrid();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a simple loading animation class to CSS if needed
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            opacity: 0;
        }
        body.loaded {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = ['.navbar', '.nav-menu', '.hamburger'];
    
    requiredElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Warning: Required element '${selector}' not found in DOM`);
        }
    });
}

// Initialize error handling
handleMissingElements();

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeThemeToggle,
        initializeNavigation,
        initializeAnimations,
        handleResponsiveGrid
    };
}