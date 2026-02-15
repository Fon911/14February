# Проект: История Ксюши и Никиты

## 🎯 Философия проекта

Это не "романтический шаблон", а глубокая эмоциональная история о **выборе, поддержке, доме и пути двоих**.

### Главная эмоция пользователя
> "Меня выбрали. Меня знают. Со мной безопасно."

### Настроение
Тихо, тепло, спокойно, глубоко. Без пафоса.

---

## 🏗 Архитектура

```
/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout с Inter font
│   ├── globals.css         # Глобальные стили
│   ├── page.tsx            # Главная (/)
│   ├── story/page.tsx      # История (/story)
│   ├── us/page.tsx         # Астрология (/us)
│   ├── path/page.tsx       # Интерактивный путь (/path)
│   └── final/page.tsx      # Финал (/final)
│
├── components/
│   ├── ui/                 # Атомы (Button, Text)
│   ├── layout/             # Section, Container
│   ├── scenes/             # Сцены страниц
│   └── interactive/        # Интерактивные элементы
│
├── features/
│   ├── story-timeline/     # Таймлайн истории
│   ├── astrology/          # Астрология и созвездия
│   └── interactive-path/   # Интерактивные вопросы
│
├── shared/
│   ├── config/             # Даты, тексты, вопросы
│   ├── animations/         # GSAP timelines
│   ├── hooks/              # React hooks
│   └── lib/                # Утилиты
│
├── styles/
│   └── tokens.css          # Design tokens (CSS variables)
│
├── content/
│   └── text.ts             # Весь текст сайта
│
└── public/
    └── images/             # Фотографии
```

---

## 🎨 Design Tokens

Все цвета, размеры и spacing определены в `styles/tokens.css` через CSS variables.

### Цвета
```css
--color-bg-primary: #0b0b12      /* Основной фон */
--color-bg-secondary: #141421    /* Вторичный фон */
--color-text-primary: #f5f5f7    /* Основной текст */
--color-text-muted: #b3b3c2      /* Приглушённый текст */
--color-accent-rose: #f2a1b3     /* Акцентный розовый */
--color-accent-soft: #f7cbd6     /* Мягкий розовый */
```

### Использование в Tailwind
```tsx
<div className="bg-bg-primary text-text-primary">
<h1 className="text-display text-accent-rose">
```

### ❌ ЗАПРЕЩЕНО
- Hex/RGB цвета напрямую в компонентах
- Inline styles с цветами
- Хардкод размеров шрифтов

---

## 📄 Страницы

### `/` — Главная
- Звёздное небо (particle system)
- Мягкий розовый свет
- Текст построчно:
  ```
  Иногда жизнь просто идёт
  А иногда ты встречаешь человека
  и начинаешь идти по-другому
  ```
- Фото: `hero-us.jpg` (фон/маска, opacity ~0.3–0.5)

### `/story` — История
Скролл-таймлайн с анимациями GSAP:
- **Лето 2024** — начало общения
- **26 число** — первая прогулка (`walk-01.jpg`)
- **7 декабря** — поддержка после травмы (`support-home.jpg`)
- **23 декабря** — начало отношений
- **Новый год** вместе (`new-year.jpg`)
- **Счастливое лето** (`summer.jpg`)
- **Детали и близость** (`details-hands.jpg`)
- **Кризис** → осознанный выбор

### `/us` — Астрология и портреты
- **Никита** — Телец (25.04)
- **Ксюша** — Весы (13.10)
- Созвездия Тельца и Весов
- При дате **23.12** — созвездия сходятся, линия света
- Портреты: `nikita-portrait.jpg`, `ksusha-portrait.jpg`
- Текст: **"В этот день они выбрали друг друга"**

### `/path` — Интерактивный путь
Вопросы с вариантами ответов (интерактив):

1. **Какая игра для него — история?**
   - ✅ Ведьмак 3
   - Dota 2
   - Cyberpunk 2077

2. **В какой игре он провёл больше всего часов?**
   - ✅ Dota 2
   - Ведьмак 3
   - Другое

3. **Что для него дом?**
   - Место
   - Люди
   - ✅ Место, где ждут и поддержат

4. **С чем у него ассоциируешься ты?**
   - Котёнок · Кролик · ✅ Такса
   - Бегемот · Панда · Медвежонок
   - Львица · Тигрица · Пума

5. **Когда ему было особенно трудно, кто был рядом?**
   - Он справился сам
   - Друзья
   - ✅ Ты

**Правильный ответ:** тёплый свет, мягкие частицы, подтверждающий текст
**Неправильный ответ:** мягкое перенаправление без оценки

### `/final` — Финал
- Тишина, замедление звёзд
- Музыка тише
- Текст:
  ```
  Люблю тебя, Ксюша.
  Спасибо тебе за чудесную жизнь
  ```
- Кнопка: **"Я всегда выбираю тебя"**
- Фото: `hero-us.jpg` (финальный фон)

---

## 🖼 Фотографии

Все фотографии в `/public/images/`:

| Файл | Страница | Назначение |
|------|----------|------------|
| `hero-us.jpg` | `/`, `/final` | Фон/маска для главной и финала (opacity ~0.3–0.5) |
| `ksusha-portrait.jpg` | `/us` | Портрет Ксюши |
| `nikita-portrait.jpg` | `/us` | Портрет Никиты |
| `walk-01.jpg` | `/story` | Первая прогулка |
| `support-home.jpg` | `/story` | Поддержка после травмы |
| `summer.jpg` | `/story` | Счастливое лето |
| `new-year.jpg` | `/story` | Новый год вместе |
| `details-hands.jpg` | `/story` | Детали рук и близость |

**Правила:**
- Lazy loading через `next/image`
- Маски, прозрачность, фильтры допустимы
- Mobile-first размеры
- Не ломать визуальный баланс

---

## 🎬 Анимации (GSAP)

### Правила
- GSAP код **ТОЛЬКО** в `shared/animations/`
- Каждая сцена — отдельный timeline
- Не использовать анимации ради анимаций
- На mobile — упрощённые анимации

### Пример структуры
```ts
// shared/animations/hero.ts
import gsap from 'gsap'

export const createHeroTimeline = (element: HTMLElement) => {
  const tl = gsap.timeline()
  tl.from(element, { opacity: 0, y: 20, duration: 1 })
  return tl
}
```

### ❌ ЗАПРЕЩЕНО
- GSAP в JSX
- Inline стили с анимациями
- Хардкод значений (использовать CSS variables)

---

## 📱 Адаптивность (CRITICAL)

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Требования
- **Mobile-first** подход
- Типографика через `clamp()` или Tailwind
- Кнопки ≥ 44px на mobile (touch targets)
- Анимации упрощаются на mobile
- No `fixed heights`, no `overflow-x`

### Тестирование
- iPhone (375px, 414px)
- Android (360px, 412px)
- iPad (768px, 1024px)
- Desktop (1440px, 1920px)

---

## 🔒 Запреты

### ❌ СТРОГО ЗАПРЕЩЕНО
1. Inline styles с цветами или размерами
2. Хардкод hex/rgb цветов в компонентах
3. GSAP в JSX
4. Шаблонные сердечки, розы, стрелочки
5. "Романтические" шрифты (Comic Sans, скрипты)
6. Фиксированные высоты без `min-height`
7. Overflow-x на любом уровне
8. Пропуск lazy loading для изображений
9. Игнорирование touch targets на mobile
10. Анимации без учёта `prefers-reduced-motion`

---

## 📅 Ключевые даты

```ts
// shared/config/dates.ts
export const KEY_DATES = {
  FIRST_MEETING: '2024-07-26',      // Первая прогулка
  INJURY_SUPPORT: '2024-12-07',     // Поддержка после травмы
  RELATIONSHIP_START: '2024-12-23', // Начало отношений
  NEW_YEAR: '2025-01-01',           // Новый год вместе
}

export const ZODIAC = {
  NIKITA: { sign: 'Телец', date: '2000-04-25' },
  KSUSHA: { sign: 'Весы', date: '2000-10-13' },
}
```

---

## 🎮 Интерактивные вопросы

```ts
// shared/config/questions.ts
export const QUESTIONS = [
  {
    id: 1,
    text: 'Какая игра для него — история?',
    options: [
      { text: 'Ведьмак 3', correct: true },
      { text: 'Dota 2', correct: false },
      { text: 'Cyberpunk 2077', correct: false },
    ],
  },
  {
    id: 2,
    text: 'В какой игре он провёл больше всего часов?',
    options: [
      { text: 'Dota 2', correct: true },
      { text: 'Ведьмак 3', correct: false },
      { text: 'Другое', correct: false },
    ],
  },
  {
    id: 3,
    text: 'Что для него дом?',
    options: [
      { text: 'Место', correct: false },
      { text: 'Люди', correct: false },
      { text: 'Место, где ждут и поддержат', correct: true },
    ],
  },
  {
    id: 4,
    text: 'С чем у него ассоциируешься ты?',
    options: [
      { text: 'Котёнок · Кролик · Такса', correct: true },
      { text: 'Бегемот · Панда · Медвежонок', correct: false },
      { text: 'Львица · Тигрица · Пума', correct: false },
    ],
  },
  {
    id: 5,
    text: 'Когда ему было особенно трудно, кто был рядом?',
    options: [
      { text: 'Он справился сам', correct: false },
      { text: 'Друзья', correct: false },
      { text: 'Ты', correct: true },
    ],
  },
]
```

---

## ✅ Checklist перед деплоем

### Контент
- [ ] Все фотографии в `/public/images/`
- [ ] Все тексты в `content/text.ts`
- [ ] Даты в `shared/config/dates.ts`
- [ ] Вопросы в `shared/config/questions.ts`

### Стили
- [ ] Design tokens используются везде
- [ ] Нет inline styles с цветами
- [ ] Нет хардкод hex/rgb
- [ ] Все шрифты через Tailwind классы

### Анимации
- [ ] GSAP только в `shared/animations/`
- [ ] Нет GSAP в JSX
- [ ] `prefers-reduced-motion` учтён

### Адаптивность
- [ ] Mobile-first подход
- [ ] Протестировано на iPhone
- [ ] Протестировано на Android
- [ ] Протестировано на iPad
- [ ] Протестировано на Desktop 1440px+
- [ ] Touch targets ≥ 44px
- [ ] No overflow-x
- [ ] Lazy loading для всех изображений

### Интерактив
- [ ] Все вопросы работают
- [ ] Правильные ответы отображают свет
- [ ] Неправильные — мягкое перенаправление
- [ ] Навигация между страницами плавная

### Производительность
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Next.js Image оптимизация
- [ ] GSAP lazy load где возможно

---

## 🚀 Команды

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Lint
npm run lint
```

---

## 📝 Критерии успеха

1. **Читается** и ощущается как дом
2. **Адаптивно** на всех устройствах
3. **Честно**, без кринжа
4. **Визуально гармонично**
5. **Интерактив полностью работает**
6. **Долговечно** — можно показать детям

---

**Последнее обновление:** 2026-02-03
**Версия:** 1.0.0
