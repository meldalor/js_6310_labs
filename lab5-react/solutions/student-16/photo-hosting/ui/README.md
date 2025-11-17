# Photo Gallery UI Library

Библиотека React компонентов для создания адаптивных галерей изображений.

## Описание

Библиотека содержит два основных компонента:

1. **PhotoCard** - карточка фотографии с информацией об изображении
2. **Gallery** - адаптивная галерея для отображения коллекции фотокарточек

## Установка

```bash
npm install @photo-gallery/ui-library
```

## Использование

```tsx
import { Gallery, PhotoCard } from '@photo-gallery/ui-library'
import '@photo-gallery/ui-library/style.css'

function App() {
  return (
    <Gallery>
      <PhotoCard
        title="Название фотографии"
        description="Описание фотографии"
        author="Автор"
        uploadDate="2025-01-15"
        imageUrl="https://example.com/image.jpg"
      />
    </Gallery>
  )
}
```

## Компоненты

### Gallery

Адаптивная сетка для отображения фотокарточек. Автоматически подстраивается под размер экрана:

- Мобильные устройства (< 640px): 1 колонка
- Планшеты (640px - 1024px): 2 колонки
- Десктопы (1024px - 1440px): 3 колонки
- Большие экраны (> 1440px): 4 колонки

**Props:**

- `children: React.ReactNode` - дочерние элементы (обычно PhotoCard компоненты)
- `className?: string` - дополнительный CSS класс

### PhotoCard

Карточка фотографии с информацией.

**Props:**

- `title: string` - название фотографии
- `description: string` - описание фотографии
- `author: string` - автор фотографии
- `uploadDate: string` - дата загрузки
- `imageUrl?: string` - URL изображения (опционально)
- `className?: string` - дополнительный CSS класс

## Разработка

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

### Сборка

```bash
npm run build
```

### Линтинг

```bash
npm run lint
npm run lint:fix
```

### Тестирование

```bash
npm run test
npm run test:coverage
```

## Технологии

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.1.7
- Jest 30.2.0
- Testing Library

## Покрытие тестами

Все компоненты имеют покрытие тестами более 90%:

- PhotoCard: 100%
- Gallery: 100%

## Лицензия

MIT
