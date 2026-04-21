# 🌌 Practice-4: Cosmos Archive

**Концепт:** Иммерсивный лендинг-архив космических миссий. Четвёртый проект курса — первый с 3D-графикой на Three.js.

---

## Запуск

Открыть `index.html` в любом современном браузере (Chrome, Firefox, Safari, Edge). Никакой сборки не требуется — чистый vanilla-stack + CDN.

---

## Дизайн

| Параметр | Значение |
|----------|----------|
| Тема | Deep space, "научный романтизм" |
| Палитра | `#050716` (void), `#6B5CFF` (nebula), `#FF4D8F` (plasma), `#E8EAF0` (starlight) |
| Шрифты | Space Grotesk (основной), JetBrains Mono (цифры/тех-данные) |
| Стиль | Острые углы, свечение вместо теней, film grain |
| Библиотеки | Three.js r128, GSAP 3.12.5 |

---

## Секции

1. **Hero** — 3D starfield с параллаксом от мыши + Text Scramble на заголовке
2. **Missions** — 6 карточек миссий, в каждой 3D-превью (Icosahedron, Torus, etc.)
3. **Timeline** — горизонтальная шкала 1957–2150, scroll-driven подсветка
4. **Records** — 4 счётчика статистики с анимацией чисел
5. **Launch Control** — форма с валидацией и success-state
6. **Footer** — 4 колонки, координаты, подпись

---

## Ключевые JS-классы

| Класс | Назначение |
|-------|-----------|
| `StarField` | 3D-поле из ~2200 звёзд (800 на mobile) |
| `MissionCard` | 3D-модель зонда в каждой карточке + освещение |
| `CustomCursor` | Курсор-прицел с lerp-следованием |
| `MagneticButton` | GSAP-магнитные CTA |
| `ScrollReveal` | IntersectionObserver + staggered delay |
| `CounterAnimator` | RAF-анимация чисел с ease-out-quart |
| `FormHandler` | Валидация (name, email, select) + success |
| `NavScroll` | Glassmorphism навигации при скролле |
| `MobileMenu` | Fullscreen overlay с burger |
| `TimelineController` | Scroll-driven подсветка точек |
| `TextScramble` | Дешифровка hero-заголовка |
| `Loader` | Page loader, триггерит hero после скрытия |

Итого: **11 классов** (в practice-3 было 5 — продолжение линии).

---

## Что использовано из прошлых проектов

- **Из practice-3:** custom cursor, magnetic buttons, scroll-reveal, text scramble, film grain, page loader, glassmorphism nav
- **Из practice-2:** ООП-подход к Canvas (StarField, MissionCard)
- **Из practice-1:** IntersectionObserver, валидация формы

## Что нового

- **Three.js** — полноценная 3D-сцена
- **WebGL fallback** — радиальный градиент если 3D недоступно
- **Timeline с scroll-driven progress**
- **Counter animation через RAF + easing**

---

## Производительность

- Mobile-оптимизация: количество звёзд снижено с 2200 до 800
- `prefers-reduced-motion` отключает parallax, scramble, magnetic buttons
- `pointer: coarse` скрывает custom cursor на touch-устройствах
- Three.js загружается с CDN (r128, минификат)

---

## Изученные концепции

- Three.js основы: Scene, Camera, Renderer, Mesh, Light
- BufferGeometry + PointsMaterial для частиц
- AdditiveBlending для свечения звёзд
- EdgesGeometry + LineSegments для wireframe-эффекта
- Кросс-классовая архитектура (11 независимых модулей)
- Scroll-driven анимации без scroll-triggered библиотек
- Graceful degradation (WebGL fallback, reduced-motion, touch-detection)
