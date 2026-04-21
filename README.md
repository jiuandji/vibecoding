# 📚 Vibe-Coding — Документация проекта

> Учебный проект по веб-разработке с AI-ассистентом. Создание лендингов от базового до продвинутого уровня.

---

## 📁 Структура проекта

```
vaibcoding/
├── practice-1/          🌸 Barista Loco — кофейня
│   ├── index.html       (355 строк)
│   ├── style.css        (1001 строка)
│   ├── script.js        (252 строки)
│   ├── sakura-cafe.png  (hero-изображение)
│   └── gallery/         (6 изображений)
│
├── practice-2/          🍕 Pizza Fuoco — пиццерия
│   ├── index.html       (204 строки)
│   ├── style.css        (622 строки)
│   ├── script.js        (105 строк)
│   ├── pizza-title.png  (hero-изображение)
│   └── gallery/         (6 изображений)
│
├── practice-3/          ⌚ Chronos Luxe — часовой бренд
│   ├── index.html       (288 строк)
│   ├── style.css        (1238 строк)
│   ├── script.js        (331 строка)
│   ├── watch-hero.png   (hero-изображение)
│   └── gallery/         (3 изображения)
│
├── practice-4/          🌌 Cosmos Archive — космический архив (Three.js)
│   ├── index.html       (412 строк)
│   ├── style.css        (900 строк)
│   ├── script.js        (628 строк)
│   └── gallery/
│
├── иследование/         📂 аналитика по уже написанному коду
│
├── идея/                💡 планы будущих проектов (practice-4+)
│
├── ТЗ/                  📋 техническое задание на practice-4
│
├── дизайн/              🎨 требования к дизайну practice-4
│
└── задачник/            📓 отчёт + список задач для реализации
```

**Итого:** 4,391 строк кода · 15 сгенерированных изображений · 3 полных лендинга

---

## 🌸 Practice-1: Barista Loco

**Концепт:** Лендинг кофейни в Мадриде с японской эстетикой цветущей сакуры.

### Дизайн
| Параметр | Значение |
|----------|----------|
| Тема | Светлая, тёплая |
| Палитра | Кремовый (`#FFF8F0`), сакура (`#FFB7C5`), коричневый (`#5C3D2E`) |
| Шрифты | Playfair Display (заголовки), Inter (текст) |
| Стиль | Rounded corners, мягкие тени, нежные цвета |

### Секции
1. **Hero** — split-layout: изображение + текст + контакты
2. **Меню** — 3-колоночная сетка (Кофе / Десерты / Напитки) с ценами
3. **Галерея** — карусель с 6 фото, стрелки, точки, свайп
4. **О нас** — текст + статистика (5+ лет, 15 сортов)
5. **Бронирование** — форма (имя, телефон, дата, время, гости)
6. **Отзывы** — 3 карточки с аватарами
7. **Футер** — 4 колонки

### Ключевые JS-фичи
- **Canvas-анимация лепестков сакуры** — физика падения, вращение, разные цвета
- **Карусель галереи** — с автоплеем, свайпом, dots-навигацией
- **Форма бронирования** — валидация, success-состояние
- **Плавающая CTA-кнопка** — появляется при скролле
- **IntersectionObserver** — анимация появления карточек

### Изученные концепции
- `position: fixed` + `backdrop-filter` для навигации
- CSS Grid (3-колоночные сетки)
- Canvas 2D API (рисование, анимация)
- Responsive design (`@media`)
- CSS-анимации (`@keyframes fadeInUp`)

---

## 🍕 Practice-2: Pizza Fuoco

**Концепт:** Лендинг пиццерии с огненной тематикой и тёмным дизайном.

### Дизайн
| Параметр | Значение |
|----------|----------|
| Тема | Тёмная |
| Палитра | Тёмно-коричневый (`#1A0F0A`), оранжевый (`#E07A5F`), золотой (`#F2CC8F`) |
| Шрифты | Playfair Display (заголовки), Inter (текст) |
| Стиль | Rounded, тёплые тени, огненные акценты |

### Секции
1. **Hero** — центрированный, floating title image, 3 CTA-кнопки (столик / с собой / доставка)
2. **Меню** — 3 карточки (Классика / Фирменные / Напитки) с описаниями
3. **Контакты** — 4 карточки-иконки
4. **Галерея праздников** — 6 фото с hover overlay
5. **Часы работы** — таблица с выделением пятницы-субботы
6. **Футер** — бренд + копирайт

### Ключевые JS-фичи
- **Canvas-анимация огоньков (Embers)** — класс Ember с физикой поднимающихся частиц
- **Scroll-анимации** — IntersectionObserver с staggered delay
- **Мобильное меню** — динамическое создание стилей через JS

### Изученные концепции
- Тёмный дизайн (dark UI)
- CSS градиенты (`radial-gradient`, `linear-gradient`)
- ООП в JS (класс `Ember`)
- Grid-layout для меню с 3 строками (название, описание, цена)
- `aspect-ratio` для квадратных галерейных изображений

---

## ⌚ Practice-3: Chronos Luxe

**Концепт:** Премиальный лендинг для бренда элитных швейцарских часов. Иммерсивный UX.

### Дизайн
| Параметр | Значение |
|----------|----------|
| Тема | OLED-чёрная, ультра-тёмная |
| Палитра | Чёрный (`#0a0a0a`), золотой (`#c5a059`), приглушённый текст (`#8a8578`) |
| Шрифты | Cormorant Garamond (заголовки), Inter (текст) |
| Стиль | Острые углы, минимализм, swiss luxury |
| Библиотека | GSAP 3.12.5 |

### Секции
1. **Page Loader** — пульсирующий логотип
2. **Hero** — Text Scramble заголовок + hero-image часов + золотое свечение
3. **Collection** — 3 карточки часов (Elegance / Abyss Diver / Skeleton Tourbillon) с ценами
4. **Craft** — 2-колоночный layout, статистика (412 часов / 347 компонентов / 0.01mm)
5. **Heritage** — цитата основателя + timeline (1987—2026)
6. **Inquiry** — форма заявки (Full Name, Email, Collection, Message)
7. **Footer** — 4 колонки (Brand, Explore, Visit, Contact) + соцсети

### Ключевые JS-фичи
- **Text Scramble** (класс) — дешифровка символов при загрузке + при ховере
- **Magnetic Buttons** (GSAP) — кнопки следуют за курсором с `elastic.out`
- **Custom Cursor** — золотой следящий круг с разными состояниями (hover, click)
- **Page Loader** — таймер + триггер hero-анимации
- **Scroll Reveal** — IntersectionObserver + CSS transitions
- **Nav Scroll** — glassmorphism при прокрутке
- **Mobile Menu** — fullscreen overlay
- **Form Handler** — submit → success state

### Изученные концепции
- GSAP (анимационная библиотека, timeline, easing)
- Custom cursor (requestAnimationFrame, lerp)
- Text manipulation (innerHTML, spans per character)
- CSS `mix-blend-mode: difference`
- `clamp()` для fluid typography
- CSS-переменные для easing (`--ease-out-expo`)
- Film grain overlay (SVG feTurbulence)
- `::selection` стилизация

---

## 🌌 Practice-4: Cosmos Archive

**Концепт:** Иммерсивный архив космических миссий с 3D-starfield и моделями зондов. Переход от 2D-Canvas к Three.js.

### Дизайн
| Параметр | Значение |
|----------|----------|
| Тема | Deep space, "научный романтизм" |
| Палитра | `#050716` (void), `#6B5CFF` (nebula), `#FF4D8F` (plasma), `#E8EAF0` (starlight) |
| Шрифты | Space Grotesk (основной), JetBrains Mono (цифры) |
| Стиль | Острые углы, свечение вместо теней, film grain |
| Библиотеки | Three.js r128 + GSAP 3.12.5 |

### Секции
1. **Hero** — 3D-starfield с параллаксом от мыши + Text Scramble
2. **Missions** — 6 карточек с 3D-моделями зондов (Icosahedron/Torus/etc.)
3. **Timeline** — горизонтальная шкала 1957–2150, scroll-driven подсветка
4. **Records** — 4 счётчика статистики с анимацией
5. **Launch Control** — форма с валидацией и success-state
6. **Footer** — 4 колонки, координаты, подпись

### Ключевые JS-фичи
- **Three.js StarField** — 2200 частиц с AdditiveBlending (800 на mobile)
- **11 JS-классов** — продолжение линии (practice-3 было 5)
- **WebGL fallback** — радиальный градиент при отсутствии 3D
- **Scroll-driven timeline** — подсветка точек + прогресс
- **3D wireframe** поверх MeshStandardMaterial в карточках миссий

### Изученные концепции
- Three.js: Scene, Camera, Renderer, BufferGeometry, Points, Meshes, Lights
- AdditiveBlending для свечения частиц
- EdgesGeometry для wireframe-overlay
- Процедурное размещение частиц в сфере (spherical coords)
- Graceful degradation для WebGL

---

## 📊 Прогрессия сложности

```
Practice-1 (1608)       Practice-2 (931)        Practice-3 (1857)       Practice-4 (1940)
────────────────         ────────────────         ────────────────         ────────────────
Светлая тема             Тёмная тема              OLED Luxury              Deep Space
Canvas лепестки          Canvas огоньки           GSAP анимации            Three.js 3D
Карусель (touch)         Простой скролл           Text Scramble            + starfield
Форма бронирования       Hover overlays           Magnetic Buttons         + scroll timeline
Vanilla CSS              Vanilla CSS              CSS + GSAP               CSS + GSAP + Three.js
Базовый JS               ООП (Ember class)        ООП (5 классов)          ООП (11 классов)
```

### Изученные технологии (General)

| Категория | Технологии |
|-----------|-----------|
| HTML | Семантические теги, SEO (meta, title), формы, accessibility |
| CSS | Grid, Flexbox, CSS Variables, @keyframes, Media Queries, Glassmorphism, Gradients, `clamp()` |
| JavaScript | DOM API, Canvas 2D, WebGL (Three.js), IntersectionObserver, Event Listeners, Classes/OOP, requestAnimationFrame |
| Библиотеки | GSAP 3.12, Three.js r128 |
| Шрифты | Google Fonts (Playfair Display, Inter, Cormorant Garamond, Space Grotesk, JetBrains Mono) |
| Ассеты | AI-генерированные изображения (15 штук) |
| Паттерны | Mobile-first, Progressive Enhancement, BEM-like naming, Graceful Degradation |

---

## 🛠 Рабочий процесс

1. **Планирование** — определение концепта, палитры, секций
2. **Дизайн-система** — CSS-переменные, шрифты, базовые стили
3. **Структура** — семантический HTML всех секций
4. **Стилизация** — полный CSS с адаптивностью
5. **Интерактивность** — JavaScript-логика и анимации
6. **Ассеты** — AI-генерация изображений
7. **Полишинг** — тестирование в браузере, исправление багов

---

## 🎯 Следующие шаги

- [ ] Деплой на GitHub Pages / Vercel
- [x] ~~Practice-4 (SPA / Dashboard / новая тема)~~ → реализован как Cosmos Archive (Three.js)
- [ ] Сборка портфолио-сайта со всеми проектами
- [ ] Practice-5: SPA / Dashboard с фреймворком
