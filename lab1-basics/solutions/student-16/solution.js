// ===== ЗАДАНИЕ 1: Базовые операции =====
function simpleTask() {
    // 1.1 Объявите переменные разных типов (не менее 5)
    // 1.2 Выведите типы всех переменных
    let n = 5_000_000;
    let big_n = 5_000_000n;
    let str = "Hello";
    let isTrue = true;
    let obj = { key: "value" };

    console.log(typeof n);
    console.log(typeof big_n);
    console.log(typeof str);
    console.log(typeof isTrue);
    console.log(typeof obj);
}

// ===== ЗАДАНИЕ 2: Функции =====
function getReviewerNumber(number, lab) {
    // 2.1 Функция определяющая номер ревьюера для вашей группы по вашему номеру и номеру лабораторной работы
    if (typeof number !== 'number' || typeof lab !== 'number') {
        return "Оба аргумента должны быть числами";
    }
    if (number <= 0 || lab <= 0) {
        return "Аргументы должны быть положительными";
    }
    if (number > 23) {
        return "В нашей группе 23 человека";
    }
    return (number + lab - 1) % 23 + 1;
}

function getVariant(number, variants) {
    // 2.2 Функция определяющая номер варианта, исходя из количества вариантов
    if (typeof number !== 'number' || typeof variants !== 'number') {
        return "Оба аргумента должны быть числами";
    }
    if (number <= 0 || variants <= 0) {
        return "Аргументы должны быть положительными";
    }
    return (number-1) % variants + 1;
}

function calculate(a, b, operation) {
    // 2.3 Напишите функцию калькулятор, калькулятор обрабатывает следующие операции: +, -, *, /
    if (typeof a !== "number" || typeof b !== "number") {
        return "Каждый аргумент должен быть числом";
    }
    switch (operation) {
        case "+":
            return a+b;
        case "-":
            return a-b;
        case "*":
            return a*b;
        case "/":
            if (b === 0) {
                return "Я запрещаю вам делить на нуль!";
            }
            return a/b;
        default:
            return "Пока калькулятор не поддерживает эту операцию";
    }
}

function calculateArea(figure, ...params) {
    // 2.4 Напишите функцию для определения площади фигур 'circle', 'rectangle', 'triangle'
    // Используйте switch.
    switch (figure) {
        case "circle":
            if (params.length !== 1) {
                break;
            }
            if (typeof params[0] !== 'number' || params[0] < 0) {
                break;
            }
            return Math.PI * params[0]**2;
        case "rectangle":
            if (params.length !== 2) {
                break;
            }
            if (typeof params[0] !== 'number' || typeof params[1] !== 'number') {
                break;
            }
            if (params[0] < 0 || params[1] < 0) {
                break;
            }
            return params[0]*params[1];
        case "triangle":
            if (params.length !== 2) {
                break;
            }
            if (typeof params[0] !== 'number' || typeof params[1] !== 'number') {
                break;
            }
            if (params[0] < 0 || params[1] < 0) {
                break;
            }
            return 0.5 * params[0] * params[1]; // основание * высота
        default:
            return "Площадь такой фигуры считать пока не умеем";
    }
    return "некорректные входные данные";
}

// 2.5 Стрелочные функции
const reverseString = (str) => {
    // Функция возвращает перевернутую строку
    return typeof(str) == "string" ? [...str].reverse().join("") : "Аргумент должен быть строкой";
};

const getRandomNumber = (min, max) => {
    if (typeof min !== 'number' || typeof max !== 'number') {
        return "Аргументы должны быть числами";
    }
    if (min > max) {
        return "Минимальное значение не может быть больше максимального";
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ===== ЗАДАНИЕ 3: Объекты =====
const book = {
    // 3.1 Создайте объект "книга" с полями для хранения заголовка, автора,
    // года выпуска, количества страниц, и доступности
    // объект должен иметь два метода getInfo возвращает одной строкой информацию о названии книги, авторе, годе выпуска, количестве страниц
    // метод toggleAvailability - который меняет значение доступности и возвращает его
    title: "Мы",
    author: "Евгений Замятин",
    year: 1988,
    pages: 272,
    isAvailable: true,

    getInfo: function() { 
        return `Название: ${this.title}, Автор: ${this.author}, Год: ${this.year}, Страницы: ${this.pages}`;
    },

    toggleAvailability: function() { 
        this.isAvailable = !this.isAvailable;
        return this.isAvailable;
    }
};

const student = {
    // 3.2 Реализуйте методы объекта "студент" 
    name: "Анна Петрова",
    age: 20,
    course: 2,
    grades: {
        math: 90,
        programming: 95,
        history: 85
    },
    
    // Метод для расчета среднего балла
    getAverageGrade() {
        // Ваш код здесь
        const grades = Object.values(this.grades);
        const sum = grades.reduce((acc, grade) => acc + grade, 0);
        return grades.length > 0 ? sum / grades.length : 0;
    },
    
    // Метод для добавления новой оценки
    addGrade(subject, grade) {
        this.grades[subject] = grade;
    }
};

// ===== ЗАДАНИЕ 4: Массивы =====
function processArrays() {
    const numbers = [12, 45, 23, 67, 34, 89, 56, 91, 27, 14];
    const words = ["JavaScript", "программирование", "массив", "функция", "объект"];
    const users = [
        { id: 1, name: "Анна", age: 25, isActive: true },
        { id: 2, name: "Борис", age: 30, isActive: false },
        { id: 3, name: "Виктория", age: 22, isActive: true },
        { id: 4, name: "Григорий", age: 35, isActive: true },
        { id: 5, name: "Дарья", age: 28, isActive: false }
    ];
    
    // 1. Используйте forEach для вывода всех чисел больше 50
    let result_1 = "";
    numbers.forEach(element => element > 50 && (result_1 += element + " "));
    console.log(`Числа больше 50: ${result_1.trim()}`);

    // 2. Используйте map для создания массива квадратов чисел
    const squares = numbers.map(elem => elem**2);
    console.log(squares);

    // 3. Используйте filter для получения активных пользователей
    const activeUsers = users.filter(user => user.isActive === true);
    console.log(activeUsers);
    
    // 4. Используйте find для поиска пользователя с именем "Виктория"
    const victoria = users.find(user => user.name === 'Виктория'); 
    console.log(victoria);
    
    // 5. Используйте reduce для подсчета суммы всех чисел
    const sum = numbers.reduce((res, elem) => res + elem, 0);
    console.log(sum);
    
    // 6. Используйте sort для сортировки пользователей по возрасту (по убыванию)
    const sortedByAge = [...users].sort((a, b) => b.age - a.age);
    console.log(sortedByAge);

    // 7. Используйте метод для проверки, все ли пользователи старше 18 лет
    const allAdults = users.every(user => user.age > 18);
    console.log(allAdults);

    // 8. Создайте цепочку методов: 
    //    - отфильтровать активных пользователей
    //    - преобразовать в массив имен
    //    - отсортировать по алфавиту
    const activeUserNames = users.filter(user => user.isActive === true).map(user => user.name).sort();
    console.log(activeUserNames);
}

// ===== ЗАДАНИЕ 5: Менеджер задач =====
const taskManager = {
    nextId: 4,
    tasks: [
        { id: 1, title: "Изучить JavaScript", completed: false, priority: "high" },
        { id: 2, title: "Сделать лабораторную работу", completed: true, priority: "high" },
        { id: 3, title: "Прочитать книгу", completed: false, priority: "medium" }
    ],
    
    addTask(title, priority = "medium") {
        // 5.1 Добавление задачи
        if (typeof title !== 'string') {
            return "Название задачи должно быть строкой";
        }
        if (title.trim() === '') {
            return "Название задачи не может быть пустым";
        }
        if (typeof priority !== 'string') {
            return "Приоритет должен быть строкой";
        }
        
        const newTask = {
            id: this.nextId++,
            title: title.trim(),
            completed: false,
            priority
        };
        this.tasks.push(newTask);
        return newTask;
    },
    
    completeTask(taskId) {
        // 5.2 Отметка выполнения
        if (typeof taskId !== 'number') {
            return "ID задачи должен быть числом";
        }
        
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = true;
            return task;
        }
        return "Задача с таким ID не найдена";
    },

    // Удаление задачи
    deleteTask(taskId) {
        // 5.3 Удаление задачи
        if (typeof taskId !== 'number') {
            return "ID задачи должен быть числом";
        }
        
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        
        if (this.tasks.length < initialLength) {
            return true; // успешно удалено
        }
        return "Задача с таким ID не найдена";
    },

    // Получение списка задач по статусу
    getTasksByStatus(completed) {
        // 5.4 Получение задач по статусу
        if (typeof completed !== 'boolean') {
            return "Параметр completed должен быть булевым значением";
        }
        
        return this.tasks.filter(task => task.completed === completed);
    },
    
    getStats() {
        /* 5.5 Статистика возвращает объект:        
        total,
        completed,
        pending,
        completionRate
        */
        const total = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed);
        const completed = completedTasks.length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100 * 100) / 100 : 0;

        return {
            total,
            completed,
            pending,
            completionRate
        };
    }
};

// ===== ЗАДАНИЕ 6: Регулярные выражения =====

/*
Дополнительные материалы:
https://regex101.com/ - интерактивный тестер regex
MDN Regular Expressions - https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_expressions
Learn Regex - https://github.com/ziishaned/learn-regex - учебник по regex
 
Задание (по вариантам):
1. Изучите функции с регулярными выражениями по своему варианту
На защите вы должны суметь объяснить структуру регулярного выражения.
2. Напишите тесты, покрывающие все различные варианты. Обратите внимание тесты должны обеспечивать полное покрытие, но не быть дублирующимися.
3. Если предложенное регулярное выражение некорректно, вы можете исправить его.

Вычисление своего варианта:
Номер варианта = Ваш номер % Общее количество вариантов
 */

/**
 * Вариант 4: Валидация даты в формате DD.MM.YYYY
 * Правила:
 * - День: 01-31
 * - Месяц: 01-12
 * - Год: 1900-2099
 */
function validateDate(date) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
    return dateRegex.test(date);
}

// Бонус: выполните все остальные варианты. Выполнение бонуса не учитывается в итоговой оценке.


// ===== ТЕСТИРОВАНИЕ =====
function runTests() {
    console.log("=== ТЕСТИРОВАНИЕ ===");
    
    // Тест 1: getReviewerNumber
    console.assert(getReviewerNumber(5, 1) === 6, "Тест получения ревьюера провален");
    console.assert(getReviewerNumber(1, 1) === 2, "Тест getReviewerNumber(1, 1) провален");
    console.assert(getReviewerNumber(23, 1) === 1, "Тест getReviewerNumber(23, 1) провален");
    console.assert(getReviewerNumber("строка", 1) === "Оба аргумента должны быть числами", "Тест типов провален");
    console.assert(getReviewerNumber(24, 1) === "В нашей группе 23 человека", "Тест границ провален");
    
    // Тест 2: getVariant
    console.assert(getVariant(1, 10) === 1, "Тест getVariant(1, 10) провален");
    console.assert(getVariant(11, 10) === 1, "Тест getVariant(11, 10) провален");
    console.assert(getVariant(5, 3) === 2, "Тест getVariant(5, 3) провален");
    
    // Тест 3: calculate
    console.assert(calculate(10, 5, '+') === 15, "Тест калькулятора провален");
    console.assert(calculate(10, 5, '-') === 5, "Тест вычитания провален");
    console.assert(calculate(10, 5, '*') === 50, "Тест умножения провален");
    console.assert(calculate(10, 5, '/') === 2, "Тест деления провален");
    console.assert(calculate(10, 0, '/') === "Я запрещаю вам делить на нуль!", "Тест деления на ноль провален");
    console.assert(calculate('10', 5, '+') === "Каждый аргумент должен быть числом", "Тест проверки типов провален");
    console.assert(calculate(10, '5', '+') === "Каждый аргумент должен быть числом", "Тест проверки типов провален");
    console.assert(calculate(10, 5, '%') === "Пока калькулятор не поддерживает эту операцию", "Тест неподдерживаемой операции провален");

    console.assert(calculate(Number.MAX_VALUE, 1, '+') === Number.MAX_VALUE+1, "Тест калькулятора 2.3 провален (переполнение при сложении)");
    console.assert(calculate(Number.MAX_VALUE, Number.MAX_VALUE, '+') === Infinity, "Тест калькулятора 2.3 провален (переполнение при сложении двух больших чисел)");
    console.assert(calculate(Number.MAX_VALUE, 2, '-') === Number.MAX_VALUE - 2, "Тест калькулятора 2.3 провален (вычитание из максимального значения)");
    console.assert(calculate(Number.MAX_VALUE, 1, '*') === Number.MAX_VALUE, "Тест калькулятора 2.3 провален (переполнение при умножении)");
    console.assert(calculate(1, Number.MAX_VALUE, '*') === Number.MAX_VALUE, "Тест калькулятора 2.3 провален (переполнение при умножении с максимальным значением)");
    console.assert(calculate(Number.MAX_VALUE, 10, "*") === Infinity, "Тест калькулятора провален (умножение максимального числа на 10)");
    console.assert(calculate(Number.MAX_VALUE, 2, '/') === Number.MAX_VALUE / 2, "Тест калькулятора 2.3 провален (деление максимального значения)");
    
    // Тест 4: calculateArea
    console.assert(Math.abs(calculateArea('circle', 5) - 78.539816) < 0.0001, "Тест площади круга провален");
    console.assert(calculateArea('rectangle', 4, 5) === 20, "Тест площади прямоугольника провален");
    console.assert(calculateArea('triangle', 3, 4) === 6, "Тест площади треугольника провален");
    console.assert(calculateArea('square') === "Площадь такой фигуры считать пока не умеем", "Тест неизвестной фигуры провален");
    console.assert(calculateArea('circle') === "некорректные входные данные", "Тест параметров круга провален");
    console.assert(calculateArea("circle", -5) === "некорректные входные данные", "Тест отрицательного радиуса провален");

    
    // Тест 5: reverseString
    console.assert(reverseString('hello') === 'olleh', "Тест reverseString провален");
    console.assert(reverseString('') === '', "Тест reverseString с пустой строкой провален");
    console.assert(reverseString(123) === "Аргумент должен быть строкой", "Тест reverseString с числом провален");
    
    // Тест 6: getRandomNumber
    const randomNum1 = getRandomNumber(1, 10);
    const randomNum2 = getRandomNumber(5, 5);
    console.assert(randomNum1 >= 1 && randomNum1 <= 10, "Тест getRandomNumber провален");
    console.assert(randomNum2 === 5, "Тест getRandomNumber с одинаковыми границами провален");
    
    // Тест 7: book объект
    console.assert(book.getInfo().includes(book.title) && book.getInfo().includes(book.author), "Тест book.getInfo провален");
    const originalAvailability = book.isAvailable;
    const newAvailability = book.toggleAvailability();
    console.assert(newAvailability !== originalAvailability, "Тест book.toggleAvailability провален");
    book.toggleAvailability(); // возвращаем обратно
    
    // Тест 8: student объект
    const avgGrade = student.getAverageGrade();
    console.assert(Math.abs(avgGrade - 90) < 0.1, "Тест student.getAverageGrade провален");
    student.addGrade("physics", 88);
    console.assert(student.grades.physics === 88, "Тест student.addGrade провален");
    const newAvgGrade = student.getAverageGrade();
    console.assert(newAvgGrade !== avgGrade, "Тест пересчета среднего балла провален");

    // Тест 10: processArrays
    processArrays();
    
    // Тест 11: taskManager
    const initialTasksCount = taskManager.tasks.length;
    const newTask = taskManager.addTask("Тестовая задача", "low");
    console.assert(taskManager.tasks.length === initialTasksCount + 1, "Тест addTask провален");
    console.assert(newTask.title === "Тестовая задача" && newTask.priority === "low" && !newTask.completed, "Тест свойств новой задачи провален");
    
    const completed = taskManager.completeTask(newTask.id);
    console.assert(completed && taskManager.tasks.find(t => t.id === newTask.id).completed, "Тест completeTask провален");
    
    const completedTasks = taskManager.getTasksByStatus(true);
    console.assert(completedTasks.every(task => task.completed), "Тест getTasksByStatus(true) провален");
    
    const pendingTasks = taskManager.getTasksByStatus(false);
    console.assert(pendingTasks.every(task => !task.completed), "Тест getTasksByStatus(false) провален");
    
    const stats = taskManager.getStats();
    console.assert(stats.total === taskManager.tasks.length && stats.completed === completedTasks.length && stats.pending === pendingTasks.length, "Тест getStats провален");
    
    const deleted = taskManager.deleteTask(newTask.id);
    console.assert(deleted && taskManager.tasks.length === initialTasksCount, "Тест deleteTask провален");
    
    // Тест 12: Регулярные выражения - Date
    console.assert(validateDate('01.01.2000'), "Тест validateDate с валидной датой провален");
    console.assert(validateDate('31.12.2099'), "Тест validateDate с граничной датой провален");
    console.assert(!validateDate('32.01.2000'), "Тест validateDate с неправильным днем провален");
    console.assert(!validateDate('01.13.2000'), "Тест validateDate с неправильным месяцем провален");
    console.assert(!validateDate('01.01.1899'), "Тест validateDate с годом вне диапазона провален");
    console.assert(!validateDate('1.1.2000'), "Тест validateDate без ведущих нулей провален");
    console.assert(!validateDate(''), "Тест validateDate с пустой строкой провален");
    console.assert(!validateDate('привет мир'), "Тест validateDate с невалидными данными провален");
    
    console.log("Все тесты пройдены! ✅");
}

// Запуск тестов
runTests();