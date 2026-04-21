// ===== ЛЕПЕСТКИ САКУРЫ (CANVAS) =====
const canvas = document.getElementById('sakura-canvas');
const ctx = canvas.getContext('2d');

let petals = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createPetals() {
    petals = [];
    const count = Math.min(Math.floor(canvas.width / 25), 35);
    for (let i = 0; i < count; i++) {
        petals.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 1 + 0.5,
            speedX: Math.random() * 0.8 - 0.2,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            opacity: Math.random() * 0.4 + 0.2,
            color: ['#FFB7C5', '#FFD4E0', '#FFC0CB', '#FFa0b0'][Math.floor(Math.random() * 4)]
        });
    }
}

function drawPetal(petal) {
    ctx.save();
    ctx.translate(petal.x, petal.y);
    ctx.rotate(petal.rotation);
    ctx.globalAlpha = petal.opacity;

    // Лепесток — овальная форма
    ctx.beginPath();
    ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
    ctx.fillStyle = petal.color;
    ctx.fill();

    // Маленькая деталь на лепестке
    ctx.beginPath();
    ctx.ellipse(petal.size * 0.2, 0, petal.size * 0.4, petal.size * 0.2, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();

    ctx.restore();
}

function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const petal of petals) {
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5;
        petal.rotation += petal.rotationSpeed;

        // Перезапуск лепестка когда выходит за экран
        if (petal.y > canvas.height + 20) {
            petal.y = -20;
            petal.x = Math.random() * canvas.width;
        }
        if (petal.x > canvas.width + 20) {
            petal.x = -20;
        }

        drawPetal(petal);
    }

    requestAnimationFrame(animatePetals);
}

resizeCanvas();
createPetals();
animatePetals();

window.addEventListener('resize', () => {
    resizeCanvas();
    createPetals();
});

// ===== МОБИЛЬНОЕ МЕНЮ =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// ===== ПЛАВАЮЩАЯ КНОПКА =====
const floatingCta = document.getElementById('floating-cta');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        floatingCta.classList.add('visible');
    } else {
        floatingCta.classList.remove('visible');
    }
});

// ===== ФОРМА БРОНИРОВАНИЯ =====
const bookForm = document.getElementById('book-form');
const successMessage = document.getElementById('success-message');

// Установить минимальную дату — сегодня
const dateInput = document.getElementById('guest-date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
}

// ===== ГАЛЕРЕЯ-КАРУСЕЛЬ =====
const galleryTrack = document.getElementById('gallery-track');
const dotsContainer = document.getElementById('gallery-dots');
const slides = document.querySelectorAll('.gallery-slide');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');

let currentSlide = 0;
let slidesPerView = 3;
let autoPlayInterval;

function getSlidesPerView() {
    return window.innerWidth <= 768 ? 1 : 3;
}

function getMaxSlide() {
    return Math.max(0, slides.length - slidesPerView);
}

function updateGallery() {
    const slideWidth = galleryTrack.parentElement.offsetWidth / slidesPerView;
    const gap = 20;
    const offset = currentSlide * (slideWidth + gap);
    galleryTrack.style.transform = `translateX(-${offset}px)`;
    
    // Update dots
    document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function createDots() {
    dotsContainer.innerHTML = '';
    const maxSlide = getMaxSlide();
    for (let i = 0; i <= maxSlide; i++) {
        const dot = document.createElement('button');
        dot.classList.add('gallery-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateGallery();
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    }
}

function nextSlide() {
    currentSlide = currentSlide >= getMaxSlide() ? 0 : currentSlide + 1;
    updateGallery();
}

function prevSlide() {
    currentSlide = currentSlide <= 0 ? getMaxSlide() : currentSlide - 1;
    updateGallery();
}

nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

// Auto-play
function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 4000);
}

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

galleryTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

galleryTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
        resetAutoPlay();
    }
}, { passive: true });

// Resize handler
window.addEventListener('resize', () => {
    slidesPerView = getSlidesPerView();
    currentSlide = Math.min(currentSlide, getMaxSlide());
    createDots();
    updateGallery();
});

slidesPerView = getSlidesPerView();
createDots();
resetAutoPlay();

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = bookForm.querySelector('.btn-submit');
    btn.innerHTML = '<span>Бронируем...</span> 🌸';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
        bookForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.style.animation = 'fadeInUp 0.5s ease';
    }, 1500);
});

// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК =====
const cards = document.querySelectorAll('.menu-card, .about-stat');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease ${i * 0.15}s both`;
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => cardObserver.observe(card));

// ===== НАВБАР — ФИКСАЦИЯ ПРИ СКРОЛЛЕ =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(139, 111, 94, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});
