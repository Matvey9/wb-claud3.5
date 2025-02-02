### **1. Описание задачи**

Разработать веб-приложение "Online Education Whiteboard" — интерактивный инструмент для создания и редактирования цифрового пространства для обучения. В этой итерации приложение предназначено **только для одного пользователя** 

---

### **2. Функциональные требования**

#### **2.1. Холст (Canvas)**

1. **Бесконечный холст (Infinity Canvas):**  
    Реализовать рабочую зону с неограниченными размерами.
    
2. **Перемещение по холсту (Pan Canvas):**
-  Возможность перемещаться по холсту с помощью:
	- Зажатой клавиши `Space`.
	- Правой кнопки мыши.
	
3. **Масштабирование (Zoom In/Out):**
- Плавное масштабирование через:
    - Колесо мыши.
    - Жесты на сенсорных устройствах.
    - Кнопки `+` и `-` (с отображением текущего масштаба в процентах).

---

#### **2.2. Интерактивные инструменты**

1. **Выделение (Select):**
    
    - Позволяет выбирать отдельные элементы или группы элементов на холсте.
    - Перемещение выделенных элементов по холсту.
    - Удаление выделенных элементов нажатием клавиши `Delete`.
2. **Карандаш (Pen):**
    
    - Позволяет свободно рисовать произвольные линии на холсте.
    - Реализовать возможность настройки параметров:
        - Цвет линии.
        - Толщина линии.
3. **Ластик (Eraser):**
    
    - Удаляет нарисованные линии или объекты с холста.
    - Два режима работы:
        - **Точечный ластик:** удаление части нарисованной линии.
        - **Удаление объектов:** полное удаление элементов.
4. **Текст (Text Tool):**
    
    - Добавление текстовых блоков на холст.
    - Реализовать настройки для текста:
        - Шрифт.
        - Размер.
        - Цвет.
5. **Фигуры (Shapes):**
    
    - Добавление базовых геометрических фигур:
        - Прямоугольник.
        - Круг.
        - Линия.
        - Стрелка.
    - Возможность настройки:
        - Цвет обводки.
        - Цвет заливки.
6. **Маркер (Highlighter):**
    
    - Позволяет рисовать полупрозрачными линиями для выделения определённых областей на холсте.
    - Реализовать возможность выбора цвета.
7. **Отмена / Повтор (Undo / Redo):**
    
    - Отмена последнего действия.
    - Повтор отменённого действия.
8. **Загрузка изображений:**
    
    - Возможность загружать изображения форматов PNG и JPEG на холст.
    - Возможность перемещать и изменять размеры загруженных изображений.

---

#### **2.3. Сохранение данных**

2. **Сохранение проекта:**
    
    - Сохранение текущего состояния доски в локальном хранилище браузера (LocalStorage).

---

### **3. Пользовательский интерфейс (UI/UX)**

1. **Холст (рабочая зона):**
    - Основная область для работы с инструментами и элементами.
2. **Панель инструментов:**
    - Расположена горизонтально или вертикально (по центру слева).
	- Включает инструменты: Pen, Eraser, Text, Shapes, Input Image и др.
1. **Настройки инструментов:**
    - Меню для изменения параметров выбранного инструмента (цвет, толщина линии, размер текста и т.д.).
2. **Кнопки управления холстом:**
	- Кнопки `+` и `-` для масштабирования (в правом нижнем углу).
	- Между кнопками отображается текущий масштаб в процентах.

---

### **4. Технические требования**

1. **Производительность:**
    
    - Приложение должно работать без лагов и зависаний при выполнении всех действий (рисование, масштабирование, добавление изображений).
2. **Кроссплатформенность:**
    
    - Поддержка браузеров: Chrome, Firefox, Safari, Edge.
    - Адаптивная верстка для десктопов и планшетов.
3. **Технический стек:**
    
    - **Frontend:**
        - TypeScript.
        - React
        - Konva.js
        -  Zustand
    - **Хранилище:**
        - LocalStorage для сохранения данных на стороне пользователя.

---

### **5. Нефункциональные требования**

3. **Оптимизация:**
    
    - Поддержка плавной анимации при перемещении по холсту и масштабировании.

### **6. Требования к качеству кода**

#### **6.1. Общие принципы:**
- **React Best Practices:**
    - Используй функциональные компоненты и хуки.
    - Оптимизируй рендеринг с `React.memo`, `useMemo`, `useCallback`.
    - Избегай анти-паттернов.
- **DRY:**
    - Избегай дублирования кода.
- **KISS:**
    - Пиши простой и понятный код.
- **SOLID:**
    - Компоненты выполняют одну задачу (SRP).
    - Код легко расширяется (OCP).
    - Управляй зависимостями через провайдеры или интерфейсы (DIP).

#### **6.2. Состояние:**
- Используй Zustand для управления глобальным состоянием.
- Строго типизируй Zustand-хранилища и их действия.
- Подключай DevTools к Zustand-хранилищам для удобства отладки.

#### **6.3. TypeScript:**
Обеспечь строгую типизацию всех сущностей.

#### **6.4. Архитектура:**

- Используй Feature-Based архитектуру:
    - Группируй файлы по функциональным областям.

#### **6.5. Стиль:**

- Используй `CSS Modules` для стилизации.

---

### **7. Логирование и отладка**

1. **Логирование действий:**
    
    - Логируй ключевые действия пользователя (создание объектов, масштабирование, перемещение и т.д.).
    - Используй `console.group` для удобной группировки логов во время разработки.
2. **Динамическое отключение логов:**
    
    - Реализуй возможность включения/отключения логов через переменные окружения (например, `NODE_ENV`).

---

### **8. Безопасность и стабильность**

1. **Обработка ошибок:**
    - Обеспечь корректное отображение сообщений об ошибках (например, при загрузке неподдерживаемого формата изображения).
    
2. **Тестирование данных:**
    - Проверяй корректность импортируемых файлов (например, JSON) перед загрузкой их в проект.

---
### **9. Документация**

1. **Базовая документация:**
    - Структура проекта:
        - Описание директорий (`src/assets`, `src/hooks`, `src/store` и т.д.).
    - Принципы архитектуры:
        - Использование Feature-Based подхода.
        - Разделение глобального состояния на модули.
    - Описание функциональных областей:
        - Основные инструменты (Pen, Eraser, Shapes и т.д.).
        - Сохранение и восстановление проекта.

---

### **10. Возможности масштабирования**

1. **Модульность:**
    
    - Подготовь архитектуру для добавления новых инструментов или функций.
    - Разделяй логику и интерфейсы для упрощённой разработки новых функциональных модулей.
2. **Коллаборация:**
    
    - Заложи основу для последующей реализации многопользовательской работы (например, через WebSockets).
3. **Интеграция с облачными сервисами:**
    
    - Подготовь проект к интеграции с облачными хранилищами для сохранения досок (например, Google Drive или AWS S3).
4. **Платформы:**

    - Возможность адаптации приложения для мобильных устройств в будущем (например, через PWA или React Native).
  