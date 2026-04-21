// ===== МОБИЛЬНОЕ МЕНЮ =====
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(26, 15, 10, 0.95)';
        navLinks.style.padding = '20px';
        navLinks.style.gap = '16px';
        navLinks.style.textAlign = 'center';
        navLinks.style.borderBottom = '1px solid rgba(224, 122, 95, 0.2)';
    });
}

// ===== SCROLL АНИМАЦИИ =====
const animateElements = document.querySelectorAll('.menu-card, .contact-card, .hours-card');

animateElements.forEach(el => el.classList.add('animate-on-scroll'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

animateElements.forEach(el => observer.observe(el));

// ===== PARTICLES (огоньки) =====
const canvas = document.createElement('canvas');
canvas.id = 'fire-particles';
canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.4;';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Ember {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
        const colors = ['#E07A5F', '#F4845F', '#F2CC8F', '#E8B059'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.life * 0.02) * 0.3;
        this.life++;
        this.opacity = Math.max(0, this.opacity - 0.002);

        if (this.life > this.maxLife || this.y < -10 || this.opacity <= 0) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

const embers = Array.from({ length: 25 }, () => new Ember());

function animateEmbers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    embers.forEach(e => {
        e.update();
        e.draw();
    });
    requestAnimationFrame(animateEmbers);
}

animateEmbers();
