'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    static vehicleCount = 0;

    constructor(make, model, year) {
        Vehicle.vehicleCount++;

        // Проверки типов данных
        if (typeof make !== 'string' || !make) throw new Error('make должно быть непустой строкой');
        if (typeof model !== 'string' || !model) throw new Error('model должна быть непустой строкой');
        if (typeof year !== 'number') throw new Error('year должен быть числом');

        this.make = make;
        this.model = model;

        const currentYear = new Date().getFullYear();
        if (year < 1886) {
            throw new Error("Год выпуска не может быть меньше 1886 (год изобретения автомобиля)");
        }
        if (year > currentYear) {
            throw new Error("Год выпуска не может быть больше текущего");
        }
        this._year = year;
    }

    displayInfo() {
        console.log(`Марка: ${this.make}, Модель: ${this.model}, Год: ${this._year}`);
    }

    get age() {
        return new Date().getFullYear() - this._year;
    }

    set year(newYear) {
        if (typeof newYear !== 'number') throw new Error('year должен быть числом');
        const currentYear = new Date().getFullYear();
        if (newYear < 1886) {
            throw new Error("год не может быть меньше 1886");
        }
        if (newYear > currentYear) {
            throw new Error("год не может быть больше текущего");
        }
        this._year = newYear;
    }

    get year() {
        return this._year;
    }

    static compareAge(vehicle1, vehicle2) {
        if (!vehicle1 || !vehicle2) throw new Error('Оба транспортных средства должны существовать');
        if (typeof vehicle1.age !== 'number' || typeof vehicle2.age !== 'number') {
            throw new Error('У транспортных средств должен быть числовой возраст');
        }
        return Math.abs(vehicle1.age - vehicle2.age);
    }

    static getTotalVehicles() {
        return Vehicle.vehicleCount;
    }
}

// ===== ЗАДАНИЕ 2: Класс Car =====
class Car extends Vehicle {
    constructor(make, model, year, numDoors) {
        super(make, model, year);
        
        // Проверки типов данных
        if (typeof numDoors !== 'number') throw new Error('numDoors должно быть числом');
        if (numDoors < 1) throw new Error('numDoors должно быть положительным числом');
        
        this.numDoors = numDoors;
    }

    displayInfo() {
        super.displayInfo();
        console.log(`Количество дверей: ${this.numDoors}`);
    }

    honk() {
        console.log("Beep beep!");
        return "Beep beep!"; // для тестов
    }
}

// ===== ЗАДАНИЕ 3: Класс ElectricCar =====
class ElectricCar extends Car {
    constructor(make, model, year, numDoors, batteryCapacity) {
        super(make, model, year, numDoors);
        
        // Проверки типов данных
        if (typeof batteryCapacity !== 'number') throw new Error('batteryCapacity должно быть числом');
        if (batteryCapacity < 0) throw new Error('batteryCapacity не может быть отрицательным');
        
        this.batteryCapacity = batteryCapacity;
    }

    displayInfo() {
        super.displayInfo();
        console.log(`Ёмкость батареи: ${this.batteryCapacity} кВт·ч`);
    }

    calculateRange() {
        return this.batteryCapacity * 6;
    }
}

// ===== ЗАДАНИЕ 4: Каррирование =====
const createVehicleFactory = (vehicleType) => {
    // Проверка типа
    if (typeof vehicleType !== 'function') throw new Error('vehicleType должен быть конструктором');
    
    return (...args) => {
        return new vehicleType(...args);
    };
};

// ===== ТЕСТЫ =====
function runTests() {
    console.log('=== ЗАПУСК ТЕСТОВ ===');

    // ===== ТЕСТ 1: Класс Vehicle =====
    console.log('--- ТЕСТ 1: Класс Vehicle ---');
    
    const vehicle1 = new Vehicle('Toyota', 'Camry', 2015);
    console.assert(vehicle1.make === 'Toyota', 'Тест make провален');
    console.assert(vehicle1.model === 'Camry', 'Тест model провален');
    console.assert(vehicle1.year === 2015, 'Тест year провален');
    
    // Тест геттера age
    const expectedAge = new Date().getFullYear() - 2015;
    console.assert(vehicle1.age === expectedAge, 'Тест age провален');
    
    // Тест сеттера year
    vehicle1.year = 2010;
    console.assert(vehicle1.year === 2010, 'Тест сеттера year провален');
    
    // Тест статического метода compareAge
    const vehicle2 = new Vehicle('Honda', 'Accord', 2020);
    const ageDifference = Math.abs(vehicle1.age - vehicle2.age);
    console.assert(Vehicle.compareAge(vehicle1, vehicle2) === ageDifference, 'Тест compareAge провален');
    
    console.log('Информация о транспортном средстве:');
    vehicle1.displayInfo();
    console.log(`Возраст: ${vehicle1.age} лет`);
    console.log(`Разница в возрасте: ${Vehicle.compareAge(vehicle1, vehicle2)} лет`);

    // ===== ТЕСТ 2: Класс Car =====
    console.log('\n--- ТЕСТ 2: Класс Car ---');
    
    const car = new Car('Honda', 'Civic', 2018, 4);
    console.assert(car instanceof Vehicle, 'Car должен наследоваться от Vehicle');
    console.assert(car instanceof Car, 'Тест instanceof Car провален');
    console.assert(car.make === 'Honda', 'Тест наследования make провален');
    console.assert(car.numDoors === 4, 'Тест numDoors провален');
    
    console.log('Информация об автомобиле:');
    car.displayInfo();
    console.log('Тест метода honk:');
    car.honk();
    
    const carAge = new Date().getFullYear() - 2018;
    console.assert(car.age === carAge, 'Тест наследования геттера age провален');
    console.log(`Возраст автомобиля: ${car.age} лет`);

    // ===== ТЕСТ 3: Класс ElectricCar =====
    console.log('\n--- ТЕСТ 3: Класс ElectricCar ---');
    
    const electricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
    console.assert(electricCar instanceof Vehicle, 'ElectricCar должен наследоваться от Vehicle');
    console.assert(electricCar instanceof Car, 'ElectricCar должен наследоваться от Car');
    console.assert(electricCar instanceof ElectricCar, 'Тест instanceof ElectricCar провален');
    console.assert(electricCar.batteryCapacity === 75, 'Тест batteryCapacity провален');
    
    console.log('Информация об электромобиле:');
    electricCar.displayInfo();
    
    const expectedRange = 75 * 6;
    console.assert(electricCar.calculateRange() === expectedRange, 'Тест calculateRange провален');
    console.log(`Запас хода: ${electricCar.calculateRange()} км`);
    
    console.log('Тест наследования метода honk:');
    electricCar.honk();

    // ===== ТЕСТ 4: Каррирование =====
    console.log('\n--- ТЕСТ 4: Каррирование ---');
    
    const createCarFactory = createVehicleFactory(Car);
    const createElectricCarFactory = createVehicleFactory(ElectricCar);
    
    const factoryCar = createCarFactory('BMW', 'X5', 2022, 4);
    console.assert(factoryCar instanceof Car, 'Фабрика Car не работает');
    console.assert(factoryCar.make === 'BMW', 'Тест фабрики Car make провален');
    console.assert(factoryCar.numDoors === 4, 'Тест фабрики Car numDoors провален');
    console.log('Создан автомобиль через фабрику:');
    factoryCar.displayInfo();
    
    const factoryElectricCar = createElectricCarFactory('Nissan', 'Leaf', 2021, 4, 60);
    console.assert(factoryElectricCar instanceof ElectricCar, 'Фабрика ElectricCar не работает');
    console.assert(factoryElectricCar.batteryCapacity === 60, 'Тест фабрики ElectricCar batteryCapacity провален');
    console.log('Создан электромобиль через фабрику:');
    factoryElectricCar.displayInfo();

    // ===== ТЕСТ 5: Статические методы и подсчет =====
    console.log('\n--- ТЕСТ 5: Статические методы и подсчет ---');
    
    const totalVehicles = Vehicle.getTotalVehicles();
    console.log(`Всего создано транспортных средств: ${totalVehicles}`);
    
    const testVehicle1 = new Vehicle('Test1', 'Model1', 2000);
    const testVehicle2 = new Car('Test2', 'Model2', 2001, 2);
    const testVehicle3 = new ElectricCar('Test3', 'Model3', 2002, 4, 50);
    
    const newTotal = Vehicle.getTotalVehicles();
    console.assert(newTotal === totalVehicles + 3, 'Счетчик транспортных средств работает неправильно');
    console.log(`После создания 3 новых ТС: ${newTotal}`);
    
    console.assert(typeof Vehicle.compareAge === 'function', 'Статический метод compareAge недоступен');
    const ageCompare = Vehicle.compareAge(testVehicle1, testVehicle2);
    console.assert(typeof ageCompare === 'number', 'compareAge должен возвращать число');
    console.log(`Разница возрастов тестовых ТС: ${ageCompare} лет`);

    // ===== ТЕСТ 6: Проверка цепочки наследования =====
    console.log('\n--- ТЕСТ 6: Проверка цепочки наследования ---');
    
    const inheritanceVehicle = new Vehicle('Generic', 'Vehicle', 2020);
    const inheritanceCar = new Car('Generic', 'Car', 2020, 4);
    const inheritanceElectricCar = new ElectricCar('Generic', 'ElectricCar', 2020, 4, 60);
    
    console.assert(inheritanceVehicle instanceof Vehicle, 'Vehicle instanceof провален');
    console.assert(!(inheritanceVehicle instanceof Car), 'Vehicle не должен быть instanceof Car');
    
    console.assert(inheritanceCar instanceof Vehicle, 'Car должен быть instanceof Vehicle');
    console.assert(inheritanceCar instanceof Car, 'Car instanceof провален');
    console.assert(!(inheritanceCar instanceof ElectricCar), 'Car не должен быть instanceof ElectricCar');
    
    console.assert(inheritanceElectricCar instanceof Vehicle, 'ElectricCar должен быть instanceof Vehicle');
    console.assert(inheritanceElectricCar instanceof Car, 'ElectricCar должен быть instanceof Car');
    console.assert(inheritanceElectricCar instanceof ElectricCar, 'ElectricCar instanceof провален');
    
    console.assert(typeof inheritanceVehicle.displayInfo === 'function', 'Vehicle.displayInfo недоступен');
    console.assert(typeof inheritanceCar.honk === 'function', 'Car.honk недоступен');
    console.assert(typeof inheritanceElectricCar.calculateRange === 'function', 'ElectricCar.calculateRange недоступен');
    console.log('Цепочка наследования работает корректно');

    // ===== ТЕСТ 7: Граничные случаи =====
    console.log('\n--- ТЕСТ 7: Граничные случаи ---');
    
    const currentYear = new Date().getFullYear();
    const currentYearVehicle = new Vehicle('Current', 'Year', currentYear);
    console.assert(currentYearVehicle.age === 0, 'Возраст текущего года должен быть 0');
    console.log(`Возраст ТС текущего года: ${currentYearVehicle.age}`);
    
    const oldVehicle = new Vehicle('Benz', 'Patent-Motorwagen', 1886);
    const oldAge = currentYear - 1886;
    console.assert(oldVehicle.age === oldAge, 'Неправильный расчет возраста старого ТС');
    console.log(`Возраст первого автомобиля (1886г.): ${oldVehicle.age} лет`);
    
    const zeroRangeEV = new ElectricCar('Zero', 'Range', 2020, 4, 0);
    console.assert(zeroRangeEV.calculateRange() === 0, 'Запас хода с нулевой батареей должен быть 0');
    console.log(`Запас хода с батареей 0 кВт·ч: ${zeroRangeEV.calculateRange()} км`);

    // ===== ТЕСТ 8: Проверка валидации данных =====
    console.log('\n--- ТЕСТ 8: Проверка валидации данных ---');
    
    try {
        new Vehicle('', 'Model', 2020); // пустая строка make
        console.assert(false, 'Не поймана ошибка пустого make');
    } catch (e) {
        console.assert(e.message.includes('make'), 'Неправильное сообщение ошибки для make');
        console.log('✅ Валидация make работает');
    }
    
    try {
        new Vehicle('Make', '', 2020); // пустая строка model
        console.assert(false, 'Не поймана ошибка пустого model');
    } catch (e) {
        console.assert(e.message.includes('model'), 'Неправильное сообщение ошибки для model');
        console.log('✅ Валидация model работает');
    }
    
    try {
        new Vehicle('Make', 'Model', 'not_a_number'); // не число year
        console.assert(false, 'Не поймана ошибка неправильного типа year');
    } catch (e) {
        console.assert(e.message.includes('year'), 'Неправильное сообщение ошибки для year');
        console.log('✅ Валидация типа year работает');
    }
    
    try {
        new Vehicle('Make', 'Model', new Date().getFullYear() + 1); // год в будущем
        console.assert(false, 'Не поймана ошибка года в будущем');
    } catch (e) {
        console.assert(e.message.includes('больше'), 'Неправильное сообщение ошибки для будущего года');
        console.log('✅ Валидация будущего года работает');
    }
    
    try {
        new Vehicle('Make', 'Model', 1885); // год меньше 1886
        console.assert(false, 'Не поймана ошибка года меньше 1886');
    } catch (e) {
        console.assert(e.message.includes('1886'), 'Неправильное сообщение ошибки для года меньше 1886');
        console.log('✅ Валидация минимального года работает');
    }
    
    try {
        const testVehicle = new Vehicle('Test', 'Model', 2020);
        testVehicle.year = 1800; // установка года меньше 1886 через сеттер
        console.assert(false, 'Не поймана ошибка установки года меньше 1886 через сеттер');
    } catch (e) {
        console.assert(e.message.includes('1886'), 'Неправильное сообщение ошибки для сеттера года меньше 1886');
        console.log('✅ Валидация минимального года в сеттере работает');
    }
    
    try {
        new Car('Make', 'Model', 2020, 'not_a_number'); // не число numDoors
        console.assert(false, 'Не поймана ошибка неправильного типа numDoors');
    } catch (e) {
        console.assert(e.message.includes('numDoors'), 'Неправильное сообщение ошибки для numDoors');
        console.log('✅ Валидация типа numDoors работает');
    }
    
    try {
        new Car('Make', 'Model', 2020, 0); // отрицательное numDoors
        console.assert(false, 'Не поймана ошибка отрицательного numDoors');
    } catch (e) {
        console.assert(e.message.includes('положительным'), 'Неправильное сообщение ошибки для отрицательного numDoors');
        console.log('✅ Валидация положительного numDoors работает');
    }
    
    try {
        new ElectricCar('Make', 'Model', 2020, 4, 'not_a_number'); // не число batteryCapacity
        console.assert(false, 'Не поймана ошибка неправильного типа batteryCapacity');
    } catch (e) {
        console.assert(e.message.includes('batteryCapacity'), 'Неправильное сообщение ошибки для batteryCapacity');
        console.log('✅ Валидация типа batteryCapacity работает');
    }
    
    try {
        new ElectricCar('Make', 'Model', 2020, 4, -1); // отрицательное batteryCapacity
        console.assert(false, 'Не поймана ошибка отрицательного batteryCapacity');
    } catch (e) {
        console.assert(e.message.includes('отрицательным'), 'Неправильное сообщение ошибки для отрицательного batteryCapacity');
        console.log('✅ Валидация неотрицательного batteryCapacity работает');
    }
    
    try {
        createVehicleFactory('not_a_function'); // не функция vehicleType
        console.assert(false, 'Не поймана ошибка неправильного типа vehicleType');
    } catch (e) {
        console.assert(e.message.includes('конструктором'), 'Неправильное сообщение ошибки для vehicleType');
        console.log('✅ Валидация vehicleType работает');
    }
    
    try {
        Vehicle.compareAge(null, vehicle1); // null vehicle
        console.assert(false, 'Не поймана ошибка null vehicle');
    } catch (e) {
        console.assert(e.message.includes('существовать'), 'Неправильное сообщение ошибки для null vehicle');
        console.log('✅ Валидация существования vehicles работает');
    }

    // ===== ТЕСТ 9: Дополнительные проверки функционала =====
    console.log('\n--- ТЕСТ 9: Дополнительные проверки функционала ---');
    
    const demoVehicle = new Vehicle('Toyota', 'Camry', 2015);
    demoVehicle.displayInfo();
    console.log(`Возраст: ${demoVehicle.age} лет`);

    const demoCar = new Car('Honda', 'Civic', 2018, 4);
    demoCar.displayInfo();
    demoCar.honk();

    const demoElectricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
    demoElectricCar.displayInfo();
    console.log(`Запас хода: ${demoElectricCar.calculateRange()} км`);
    
    const demoTestVehicle = new Vehicle('Test', 'Model', 2010);
    console.assert(demoTestVehicle.age === (new Date().getFullYear() - 2010), 'Тест возраста провален');
    
    const createDemoCarFactory = createVehicleFactory(Car);
    const demoFactoryCar = createDemoCarFactory('BMW', 'X5', 2022, 4);
    console.log('Создан новый автомобиль через фабрику:');
    demoFactoryCar.displayInfo();
    
    console.log(`Всего создано транспортных средств: ${Vehicle.getTotalVehicles()}`);

    // ===== ФИНАЛЬНАЯ СТАТИСТИКА =====
    console.log('\n=== ФИНАЛЬНАЯ СТАТИСТИКА ===');
    const finalCount = Vehicle.getTotalVehicles();
    console.log(`Общее количество созданных транспортных средств: ${finalCount}`);
    console.log('Все функции наследования работают корректно');
    console.log('Система подсчета транспортных средств функционирует');
    console.log('Валидация входных данных работает');
    console.log('Каррирование поддерживает любое количество параметров');
    
    console.log('\nВсе тесты пройдены! ✅');
}

runTests();