# История Ксюши и Никиты

Глубокий, эмоциональный, интерактивный сайт-история о выборе, поддержке и доме.

## О проекте

Это не шаблонный романтический сайт. Это история о **выборе**, **поддержке**, **доме** и **пути двоих**.

### Главная эмоция
> "Меня выбрали. Меня знают. Со мной безопасно."

## Технологии

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS** (с design tokens)
- **GSAP** (анимации)
- **Canvas API** (система частиц - звёздное небо)

## Структура проекта

```
/
├── app/                    # Next.js страницы
│   ├── page.tsx            # Главная (/)
│   ├── story/page.tsx      # История (/story)
│   ├── us/page.tsx         # Астрология (/us)
│   ├── path/page.tsx       # Интерактивный путь (/path)
│   └── final/page.tsx      # Финал (/final)
│
├── components/
│   ├── ui/                 # Атомарные компоненты (Button, Text)
│   ├── layout/             # Layout компоненты (Section, Container)
│   ├── scenes/             # Сцены страниц (TimelineEvent, Constellation)
│   └── interactive/        # Интерактивные элементы (ParticleField, QuestionCard)
│
├── shared/
│   ├── config/             # Конфигурация (даты, вопросы)
│   └── animations/         # GSAP анимации
│
├── content/
│   └── text.ts             # Весь текстовый контент сайта
│
├── styles/
│   └── tokens.css          # Design tokens (CSS variables)
│
└── public/
    └── images/             # Фотографии
```

## Установка и запуск

### Предварительные требования
- Node.js 18+
- npm или yarn

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Сборка для продакшена
```bash
npm run build
npm run start
```

## Страницы

### `/` - Главная
- Звёздное небо (particle system)
- Построчное появление текста
- Hero-изображение с маской

### `/story` - История
- Таймлайн событий с фотографиями
- Scroll-based анимации
- Ключевые моменты отношений

### `/us` - Астрология
- Портреты Ксюши и Никиты
- Созвездия Тельца и Весов
- Дата выбора (23 декабря)

### `/path` - Интерактивный путь
- 5 интерактивных вопросов
- Мягкая обратная связь на ответы
- Прогресс-бар

### `/final` - Финал
- Финальное послание
- Интерактивная кнопка
- Замедленные звёзды

## Design Tokens

Все цвета, размеры и spacing определены через CSS variables в `styles/tokens.css`:

```css
--color-bg-primary: #0b0b12
--color-text-primary: #f5f5f7
--color-accent-rose: #f2a1b3
--text-display: clamp(2.5rem, 5vw, 4rem)
```

Используются через Tailwind классы:
```jsx
<div className="bg-bg-primary text-text-primary">
```

## Адаптивность

- **Mobile-first** подход
- Responsive typography через `clamp()`
- Touch targets ≥ 44px
- Тестировано на:
  - iPhone (375px, 414px)
  - Android (360px, 412px)
  - iPad (768px, 1024px)
  - Desktop (1440px, 1920px)

## Документация

Полная документация проекта находится в [CLAUDE.md](./CLAUDE.md):
- Философия и архитектура
- Design tokens и правила
- Интерактивные вопросы
- Checklist перед деплоем

## Критерии успеха

- ✅ Читается и ощущается как дом
- ✅ Адаптивно на всех устройствах
- ✅ Честно, без кринжа
- ✅ Визуально гармонично
- ✅ Интерактив полностью работает
- ✅ Долговечно — можно показать детям

## Деплой

Проект готов для деплоя на:
- [Vercel](https://vercel.com) (рекомендуется)
- [Netlify](https://netlify.com)
- Любой хостинг с поддержкой Next.js

```bash
# Для Vercel
vercel

# Для других платформ
npm run build
```

## Лицензия

Личный проект. Все права защищены.

---

**Создано с любовью для Ксюши** ❤️
# 14February
