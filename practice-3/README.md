# ⌚ Chronos Luxe — Practice 3

Премиальный лендинг для бренда элитных швейцарских часов. Иммерсивный UX с GSAP-анимациями.

## Превью

OLED-чёрная тема · Золотые акценты · GSAP · Text Scramble · Magnetic Buttons

## Стек

- HTML5 (семантическая разметка)
- CSS3 (Grid, Flexbox, CSS Variables, custom easing, glassmorphism)
- JavaScript (OOP — 5 классов, GSAP 3.12.5)
- Google Fonts: Cormorant Garamond + Inter

## Секции

1. ⏳ Page Loader — пульсирующий логотип
2. 🎬 Hero — Text Scramble + hero-image + золотое свечение
3. 🕐 Collection — 3 часов (Elegance / Abyss Diver / Skeleton Tourbillon)
4. ⚙️ Craft — мастерство + статистика (412h / 347 / 0.01mm)
5. 📜 Heritage — цитата + timeline (1987—2026)
6. 📝 Inquiry — форма заявки
7. 📍 Footer — 4 колонки + соцсети

## Фишки

- **Text Scramble** — дешифровка символов (on load + hover)
- **Magnetic Buttons** — кнопки следуют за курсором (GSAP elastic)
- **Custom Cursor** — золотой круг с hover/click состояниями
- **Page Loader** — анимация при загрузке
- **Scroll Reveal** — плавное появление элементов
- **Glassmorphism Nav** — blur при прокрутке
- **Film Grain** — SVG feTurbulence overlay
- **Mobile Menu** — fullscreen overlay

## JS-классы

| Класс | Назначение |
|-------|-----------|
| `TextScramble` | Эффект дешифровки текста |
| `CustomCursor` | Следящий курсор с lerp |
| `MagneticButtons` | GSAP-притяжение кнопок |
| `ScrollReveal` | IntersectionObserver reveal |
| `PageLoader` | Загрузчик + триггер анимации |

## Запуск

Открыть `index.html` в браузере.
