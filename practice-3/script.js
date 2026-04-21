/* ============================================
   CHRONOS LUXE — Interactive Logic
   Text Scramble | Magnetic Buttons | GSAP
   ============================================ */

// ─── Text Scramble Effect ───
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#_АБВГДЕЖ';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => (this.resolve = resolve));
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                if (to === ' ') {
                    output += `<span class="scramble-char">&nbsp;</span>`;
                } else {
                    output += `<span class="scramble-char">${to}</span>`;
                }
            } else if (this.frame >= start) {
                if (to === ' ') {
                    output += `<span class="scramble-char">&nbsp;</span>`;
                } else {
                    if (!char || Math.random() < 0.28) {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char resolving">${char}</span>`;
                }
            } else {
                if (from === ' ') {
                    output += `<span class="scramble-char">&nbsp;</span>`;
                } else {
                    output += `<span class="scramble-char">${from}</span>`;
                }
            }
        }

        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

// ─── Custom Cursor ───
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor-follower');
        if (!this.cursor) return;

        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.15;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', e => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('cursor-click');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('cursor-click');
        });

        // Hover state for interactive elements
        const hoverEls = document.querySelectorAll(
            'a, button, .collection-card, .timeline-item, input, textarea, select'
        );
        hoverEls.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('cursor-hover'));
        });

        this.render();
    }

    render() {
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

        this.cursor.style.left = `${this.pos.x}px`;
        this.cursor.style.top = `${this.pos.y}px`;

        requestAnimationFrame(() => this.render());
    }
}

// ─── Magnetic Buttons ───
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.magnetic-btn');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            const wrap = btn.closest('.magnetic-wrap') || btn;

            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            wrap.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.4)'
                });
            });
        });
    }
}

// ─── Scroll Reveal ───
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        if (this.elements.length === 0) return;

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        this.elements.forEach(el => this.observer.observe(el));
    }
}

// ─── Nav Scroll Effect ───
class NavScroll {
    constructor() {
        this.header = document.querySelector('header');
        if (!this.header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }, { passive: true });
    }
}

// ─── Mobile Menu ───
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-toggle');
        this.mobileNav = document.querySelector('.mobile-nav');
        if (!this.toggle || !this.mobileNav) return;

        this.toggle.addEventListener('click', () => {
            this.toggle.classList.toggle('active');
            this.mobileNav.classList.toggle('open');
            document.body.style.overflow =
                this.mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        this.mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.toggle.classList.remove('active');
                this.mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }
}

// ─── Form Handler ───
class FormHandler {
    constructor() {
        this.form = document.getElementById('inquiry-form');
        this.success = document.getElementById('form-success');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.form.style.display = 'none';
            this.success.classList.add('visible');
        });
    }
}

// ─── Page Loader ───
class PageLoader {
    constructor() {
        this.loader = document.querySelector('.page-loader');
        if (!this.loader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loader.classList.add('loaded');
                this.onLoaded();
            }, 800);
        });
    }

    onLoaded() {
        // Trigger hero animations after loader
        initHeroAnimation();
    }
}

// ─── Hero GSAP Animation ───
function initHeroAnimation() {
    const title = document.getElementById('hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const cta = document.querySelector('.hero .magnetic-wrap');
    const heroImg = document.querySelector('.hero-image-container img');

    // Text Scramble
    if (title) {
        const scramble = new TextScramble(title);
        const originalText = title.getAttribute('data-value') || title.innerText;
        title.innerText = '';

        setTimeout(() => {
            scramble.setText(originalText);
        }, 300);

        // Re-scramble on hover
        title.addEventListener('mouseenter', () => {
            scramble.setText(originalText);
        });
    }

    // GSAP Timeline for the rest
    const tl = gsap.timeline({ delay: 0.5 });

    if (subtitle) {
        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    if (cta) {
        tl.from(cta, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.4');
    }

    if (heroImg) {
        tl.to(heroImg, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=0.8');
    }
}

// ─── Initialize Everything ───
document.addEventListener('DOMContentLoaded', () => {
    // Core systems
    new CustomCursor();
    new MagneticButtons();
    new ScrollReveal();
    new NavScroll();
    new MobileMenu();
    new FormHandler();

    // Page loader handles hero animation trigger
    const loader = new PageLoader();

    // If no loader element, init hero directly
    if (!document.querySelector('.page-loader')) {
        initHeroAnimation();
    }
});
