/* ============================================================
   Cosmos Archive — practice-4
   ============================================================ */

const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IS_TOUCH        = window.matchMedia('(pointer: coarse)').matches;
const IS_MOBILE       = window.innerWidth < 768;
const WEBGL_OK        = (() => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch { return false; }
})();

const lerp = (a, b, t) => a + (b - a) * t;

/* ----------------------------------------------------------
   StarField — 3D hero background
   ---------------------------------------------------------- */
class StarField {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouse  = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.time   = 0;
  }

  init() {
    const { canvas } = this;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      70, canvas.clientWidth / canvas.clientHeight, 0.1, 2000
    );
    this.camera.position.z = 400;

    this.renderer = new THREE.WebGLRenderer({
      canvas, alpha: true, antialias: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.resize();

    this.createStars();
    this.createNebula();

    window.addEventListener('resize', () => this.resize());
    if (!IS_TOUCH && !PREFERS_REDUCED) {
      window.addEventListener('mousemove', (e) => {
        this.target.x = (e.clientX / window.innerWidth  - 0.5) * 2;
        this.target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      });
    }

    this.animate();
  }

  createStars() {
    const count = IS_MOBILE ? 800 : 2200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const sizes     = new Float32Array(count);

    const colorStar    = new THREE.Color(0xE8EAF0);
    const colorNebula  = new THREE.Color(0x6B5CFF);
    const colorPlasma  = new THREE.Color(0xFF4D8F);

    for (let i = 0; i < count; i++) {
      const radius = 200 + Math.random() * 1200;
      const theta  = Math.random() * Math.PI * 2;
      const phi    = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const roll = Math.random();
      const color = roll < 0.9 ? colorStar : (roll < 0.97 ? colorNebula : colorPlasma);
      colors[i * 3]     = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 1.8 + 0.4;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    geometry.setAttribute('size',     new THREE.BufferAttribute(sizes,     1));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.stars = new THREE.Points(geometry, material);
    this.scene.add(this.stars);
  }

  createNebula() {
    // Decorative gradient plane behind stars
    const geometry = new THREE.PlaneGeometry(3000, 3000);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0A0E24,
      transparent: true,
      opacity: 0.0,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.z = -1500;
    this.scene.add(plane);
  }

  resize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  animate() {
    const loop = () => {
      this.time += 0.0015;
      this.mouse.x = lerp(this.mouse.x, this.target.x, 0.04);
      this.mouse.y = lerp(this.mouse.y, this.target.y, 0.04);

      if (this.stars) {
        this.stars.rotation.y = this.time;
        this.stars.rotation.x = this.time * 0.5;
      }

      this.camera.position.x = this.mouse.x * 40;
      this.camera.position.y = -this.mouse.y * 40;
      this.camera.lookAt(0, 0, 0);

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(loop);
    };
    loop();
  }
}

/* ----------------------------------------------------------
   MissionCard — 3D-model preview in each card
   ---------------------------------------------------------- */
class MissionCard {
  constructor(canvas, seed) {
    this.canvas   = canvas;
    this.seed     = seed;
    this.hovered  = false;
    this.rotSpeed = 0.003;
    this.current  = 0.003;
  }

  init() {
    const { canvas } = this;
    this.scene    = new THREE.Scene();
    this.camera   = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.resize();

    // Lights
    this.scene.add(new THREE.AmbientLight(0x8892B0, 0.4));
    const key = new THREE.PointLight(0x6B5CFF, 1.2);
    key.position.set(3, 3, 4);
    this.scene.add(key);
    const fill = new THREE.PointLight(0xFF4D8F, 0.6);
    fill.position.set(-3, -2, 2);
    this.scene.add(fill);

    // Geometry per seed
    const geometries = [
      new THREE.IcosahedronGeometry(1.3, 1),
      new THREE.TorusGeometry(1.1, 0.4, 8, 24),
      new THREE.OctahedronGeometry(1.4, 0),
      new THREE.TorusKnotGeometry(0.9, 0.3, 60, 8),
      new THREE.DodecahedronGeometry(1.3, 0),
      new THREE.ConeGeometry(1.2, 2, 6, 1),
    ];
    const idx = this.seed % geometries.length;
    const material = new THREE.MeshStandardMaterial({
      color: 0xE8EAF0,
      metalness: 0.3,
      roughness: 0.4,
      wireframe: false,
      flatShading: true,
    });

    this.mesh = new THREE.Mesh(geometries[idx], material);
    this.scene.add(this.mesh);

    const wf = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometries[idx]),
      new THREE.LineBasicMaterial({ color: 0x6B5CFF, transparent: true, opacity: 0.5 })
    );
    this.mesh.add(wf);

    window.addEventListener('resize', () => this.resize());
    this.animate();

    const card = canvas.closest('.mission');
    if (card) {
      card.addEventListener('mouseenter', () => this.hovered = true);
      card.addEventListener('mouseleave', () => this.hovered = false);
    }
  }

  resize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (w === 0 || h === 0) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  animate() {
    const loop = () => {
      const target = this.hovered ? 0.018 : 0.003;
      this.current = lerp(this.current, target, 0.08);
      this.mesh.rotation.y += this.current;
      this.mesh.rotation.x += this.current * 0.4;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(loop);
    };
    loop();
  }
}

/* ----------------------------------------------------------
   CustomCursor
   ---------------------------------------------------------- */
class CustomCursor {
  constructor() {
    this.el     = document.getElementById('cursor');
    this.ring   = this.el?.querySelector('.cursor__ring');
    this.dot    = this.el?.querySelector('.cursor__dot');
    this.mouse  = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.ring_p = { x: this.mouse.x, y: this.mouse.y };
    this.dot_p  = { x: this.mouse.x, y: this.mouse.y };
  }

  init() {
    if (!this.el) return;
    if (IS_TOUCH || PREFERS_REDUCED) { this.el.classList.add('is-hidden'); return; }

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    document.querySelectorAll('[data-cursor="hover"]').forEach(el => {
      el.addEventListener('mouseenter', () => this.el.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => this.el.classList.remove('is-hover'));
    });

    this.animate();
  }

  animate() {
    const loop = () => {
      this.ring_p.x = lerp(this.ring_p.x, this.mouse.x, 0.15);
      this.ring_p.y = lerp(this.ring_p.y, this.mouse.y, 0.15);
      this.dot_p.x  = lerp(this.dot_p.x,  this.mouse.x, 0.4);
      this.dot_p.y  = lerp(this.dot_p.y,  this.mouse.y, 0.4);

      if (this.ring) this.ring.style.transform = `translate(${this.ring_p.x}px, ${this.ring_p.y}px)`;
      if (this.dot)  this.dot.style.transform  = `translate(${this.dot_p.x}px, ${this.dot_p.y}px)`;

      requestAnimationFrame(loop);
    };
    loop();
  }
}

/* ----------------------------------------------------------
   MagneticButton
   ---------------------------------------------------------- */
class MagneticButton {
  constructor(el) { this.el = el; }

  init() {
    if (IS_TOUCH || PREFERS_REDUCED) return;
    const el = this.el;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.3;
      const dy = (e.clientY - cy) * 0.3;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
    });
  }
}

/* ----------------------------------------------------------
   ScrollReveal
   ---------------------------------------------------------- */
class ScrollReveal {
  init() {
    if (PREFERS_REDUCED) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Stagger missions and data-cards
    document.querySelectorAll('.missions__grid .mission').forEach((el, i) => {
      el.classList.add('reveal');
      el.dataset.revealDelay = i * 80;
      io.observe(el);
    });
    document.querySelectorAll('.data__grid .data-card').forEach((el, i) => {
      el.dataset.revealDelay = i * 100;
    });
  }
}

/* ----------------------------------------------------------
   CounterAnimator
   ---------------------------------------------------------- */
class CounterAnimator {
  init() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('[data-counter]').forEach(el => io.observe(el));
  }

  animate(el) {
    const target   = parseInt(el.dataset.counter, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = PREFERS_REDUCED ? 0 : 1800;
    const start    = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      const value = Math.floor(target * eased);
      el.textContent = value + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(tick);
  }
}

/* ----------------------------------------------------------
   FormHandler
   ---------------------------------------------------------- */
class FormHandler {
  constructor() {
    this.form    = document.getElementById('form');
    this.success = document.getElementById('formSuccess');
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => this.onSubmit(e));
    this.form.querySelectorAll('.field__input').forEach(input => {
      input.addEventListener('input', () => {
        const field = input.closest('.field');
        field?.classList.remove('is-error');
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = new FormData(this.form);
    let valid = true;

    const setError = (name, msg) => {
      const field = this.form.querySelector(`[name="${name}"]`)?.closest('.field');
      if (!field) return;
      field.classList.add('is-error');
      field.querySelector('.field__error').textContent = msg;
      valid = false;
    };

    if (!data.get('name') || data.get('name').trim().length < 2) setError('name', 'Min 2 characters');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.get('email') || '')) setError('email', 'Invalid email');
    if (!data.get('mission')) setError('mission', 'Select one');

    if (!valid) return;

    this.form.classList.add('is-hidden');
    this.success.classList.add('is-visible');
    this.success.setAttribute('aria-hidden', 'false');
  }
}

/* ----------------------------------------------------------
   NavScroll
   ---------------------------------------------------------- */
class NavScroll {
  init() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 50);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

/* ----------------------------------------------------------
   MobileMenu
   ---------------------------------------------------------- */
class MobileMenu {
  init() {
    const menu    = document.getElementById('mobileMenu');
    const burger  = document.getElementById('burger');
    const close   = document.getElementById('mobileClose');
    if (!menu || !burger) return;

    const open = () => {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    };
    const closeMenu = () => {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };

    burger.addEventListener('click', open);
    close?.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }
}

/* ----------------------------------------------------------
   TimelineController — подсветка точек + progress при скролле
   ---------------------------------------------------------- */
class TimelineController {
  init() {
    const section  = document.getElementById('timeline');
    const track    = section?.querySelector('.timeline__track');
    const progress = document.getElementById('timelineProgress');
    const points   = section?.querySelectorAll('.timeline__point');
    if (!track || !progress || !points?.length) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh   = window.innerHeight;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const t = Math.max(0, Math.min(1, passed / total));
      progress.style.width = `${t * 100}%`;

      const activeIdx = Math.floor(t * points.length);
      points.forEach((p, i) => p.classList.toggle('is-active', i <= activeIdx));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }
}

/* ----------------------------------------------------------
   TextScramble — hero title reveal
   ---------------------------------------------------------- */
class TextScramble {
  constructor(el) {
    this.el    = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#◊▲◆○';
    this.queue = [];
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length  = Math.max(oldText.length, newText.length);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to   = newText[i] || '';
      const start = Math.floor(Math.random() * 30);
      const end   = start + Math.floor(Math.random() * 30);
      this.queue.push({ from, to, start, end, char: '' });
    }
    this.frame = 0;
    this.update();
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      const q = this.queue[i];
      if (this.frame >= q.end) {
        output += q.to;
        complete++;
      } else if (this.frame >= q.start) {
        if (!q.char || Math.random() < 0.28) {
          q.char = this.chars[Math.floor(Math.random() * this.chars.length)];
        }
        output += `<span style="color:var(--color-nebula);opacity:0.7">${q.char}</span>`;
      } else {
        output += q.from;
      }
    }
    this.el.innerHTML = output;
    if (complete < this.queue.length) {
      this.frame++;
      requestAnimationFrame(() => this.update());
    }
  }
}

/* ----------------------------------------------------------
   Loader
   ---------------------------------------------------------- */
class Loader {
  hide() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add('is-hidden');
      this.triggerHero();
    }, 1200);
  }

  triggerHero() {
    const title = document.querySelector('[data-scramble]');
    if (title && !PREFERS_REDUCED) {
      const final = title.textContent;
      const scramble = new TextScramble(title);
      scramble.setText(final);
    }
  }
}

/* ----------------------------------------------------------
   App — orchestrates everything
   ---------------------------------------------------------- */
class App {
  constructor() {
    this.loader    = new Loader();
    this.nav       = new NavScroll();
    this.mobile    = new MobileMenu();
    this.cursor    = new CustomCursor();
    this.reveal    = new ScrollReveal();
    this.counter   = new CounterAnimator();
    this.form      = new FormHandler();
    this.timeline  = new TimelineController();
  }

  init() {
    // UI systems always
    this.nav.init();
    this.mobile.init();
    this.cursor.init();
    this.reveal.init();
    this.counter.init();
    this.form.init();
    this.timeline.init();

    // Magnetic buttons
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      new MagneticButton(el).init();
    });

    // 3D only if WebGL available
    if (WEBGL_OK) {
      const starCanvas = document.getElementById('starfield');
      if (starCanvas) {
        try { new StarField(starCanvas).init(); }
        catch (e) { console.warn('StarField failed:', e); this.showFallback(); }
      }

      document.querySelectorAll('.mission__canvas').forEach((c, i) => {
        try { new MissionCard(c, i).init(); }
        catch (e) { console.warn('MissionCard failed:', e); }
      });
    } else {
      this.showFallback();
    }

    // Loader sequence
    window.addEventListener('load', () => this.loader.hide());
  }

  showFallback() {
    const fallback = document.querySelector('.hero__fallback');
    if (fallback) fallback.style.opacity = '1';
    document.getElementById('starfield')?.style.setProperty('display', 'none');
  }
}

/* ---------- Boot ---------- */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App().init());
} else {
  new App().init();
}
