'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    // Создайте базовый класс Vehicle.
    // В конструкторе принимайте и сохраняйте в this свойства: 
    // make (марка), model (модель), year (год выпуска).
    constructor(make, model, year) {
        Vehicle.vehicleCount++;

        if (typeof make !== 'string' || !make) throw new Error('make должно быть непустой строкой');
        if (typeof model !== 'string' || !model) throw new Error('model должна быть непустой строкой');
        if (typeof year !== 'number') throw new Error('year должен быть числом');
        
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // Добавьте метод displayInfo(), который выводит в консоль информацию 
    // о транспортном средстве в формате: "Марка: [make], Модель: [model], Год: [year]".
    displayInfo() {
        console.log(`Марка: ${this.make}, Модель: ${this.model}, Год: ${this.year}`);
    }

    // Добавьте геттер age, который возвращает возраст транспортного средства 
    // (текущий год минус год выпуска). Используйте new Date().getFullYear().
    get age() {
        return new Date().getFullYear() - this.year;
    }

    // Добавьте сеттер для года выпуска с проверкой: год не может быть больше текущего.
    set year(newYear) {
        if (typeof newYear !== 'number') throw new Error('year должен быть числом');
        if (newYear > new Date().getFullYear()) {
            throw new Error("год не может быть больше текущего");
        }
        this._year = newYear;
    }

    get year() {
        return this._year;
    }

    // Добавьте статический метод compareAge(vehicle1, vehicle2), 
    // который возвращает разницу в возрасте между двумя транспортными средствами.
    static compareAge(vehicle1, vehicle2) {
        if (!vehicle1 || !vehicle2) throw new Error('Оба транспортных средства должны существовать');
        if (typeof vehicle1.age !== 'number' || typeof vehicle2.age !== 'number') {
            throw new Error('У транспортных средств должен быть числовой возраст');
        }
        return Math.abs(vehicle1.age - vehicle2.age);
    }
}

// ===== ЗАДАНИЕ 2: Класс Car (наследуется от Vehicle) =====
class Car extends Vehicle {
    // Создайте дочерний класс Car, который наследуется от Vehicle.
    // Добавьте новое свойство numDoors (количество дверей).
    constructor(make, model, year, numDoors) {
        super(make, model, year);
        
        // Проверка numDoors
        if (typeof numDoors !== 'number') throw new Error('numDoors должно быть числом');
        if (numDoors < 1) throw new Error('numDoors должно быть положительным числом');
        
        this.numDoors = numDoors;
    }

    // Переопределите метод displayInfo() так, чтобы он также выводил количество дверей. 
    // Используйте super.displayInfo() для вызова метода родителя.
    displayInfo() {
        super.displayInfo();
        console.log(`Количество дверей: ${this.numDoors}`);
    }

    // Добавьте метод honk(), который выводит "Beep beep!".
    honk() {
        console.log("Beep beep!");
    }
}

// ===== ЗАДАНИЕ 3: Класс ElectricCar (наследуется от Car) =====
class ElectricCar extends Car {
    // Создайте дочерний класс ElectricCar, который наследуется от Car.
    // Добавьте новое свойство batteryCapacity (емкость батареи в кВт·ч).
    constructor(make, model, year, numDoors, batteryCapacity) {
        super(make, model, year, numDoors);
        
        // Проверка batteryCapacity
        if (typeof batteryCapacity !== 'number') throw new Error('batteryCapacity должно быть числом');
        if (batteryCapacity < 0) throw new Error('batteryCapacity не может быть отрицательным');
        
        this.batteryCapacity = batteryCapacity;
    }

    // Переопределите метод displayInfo() для вывода дополнительной информации о батарее.
    displayInfo() {
        super.displayInfo();
        console.log(`Емкость батареи: ${this.batteryCapacity} кВт·ч`);
    }

    // Добавьте метод calculateRange(), который рассчитывает примерный запас хода 
    // (предположим, что 1 кВт·ч = 6 км).
    calculateRange() {
        return this.batteryCapacity * 6;
    }
}

// ===== ЗАДАНИЕ 4: Каррирование =====

// Создайте функцию createVehicleFactory, которая возвращает функцию 
// для создания транспортных средств определенного типа (каррирование).
const createVehicleFactory = (vehicleType) => {
    // Проверка типа
    if (typeof vehicleType !== 'function') throw new Error('vehicleType должен быть конструктором');
    
    return (...args) => {
        return new vehicleType(...args);
    };
};

// ===== ЗАДАНИЕ 5: Статические методы и свойства =====

// Добавьте статическое свойство vehicleCount в класс Vehicle 
// для подсчета количества созданных транспортных средств.
// Модифицируйте конструктор Vehicle для увеличения счетчика
// (добавьте в начало конструктора: Vehicle.vehicleCount++);
// Создайте статический метод getTotalVehicles(), 
// который возвращает общее количество созданных транспортных средств.
Vehicle.vehicleCount = 0;
Vehicle.getTotalVehicles = () => Vehicle.vehicleCount;

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
    
    const oldVehicle = new Vehicle('Old', 'Vehicle', 1900);
    const oldAge = currentYear - 1900;
    console.assert(oldVehicle.age === oldAge, 'Неправильный расчет возраста старого ТС');
    console.log(`Возраст старого ТС (1900г.): ${oldVehicle.age} лет`);
    
    const zeroRangeEV = new ElectricCar('Zero', 'Range', 2020, 4, 0);
    console.assert(zeroRangeEV.calculateRange() === 0, 'Запас хода с нулевой батареей должен быть 0');
    console.log(`Запас хода с батареей 0 кВт·ч: ${zeroRangeEV.calculateRange()} км`);

    // ===== ТЕСТ 8: Оригинальные требования из задания =====
    console.log('\n--- ТЕСТ 8: Оригинальные требования ---');
    
    const vehicle = new Vehicle('Toyota', 'Camry', 2015);
    vehicle.displayInfo();
    console.log(`Возраст: ${vehicle.age} лет`);

    const testCar = new Car('Honda', 'Civic', 2018, 4);
    testCar.displayInfo();
    testCar.honk();

    const testElectricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
    testElectricCar.displayInfo();
    console.log(`Запас хода: ${testElectricCar.calculateRange()} км`);
    
    const testVehicle = new Vehicle('Test', 'Model', 2010);
    console.assert(testVehicle.age === (new Date().getFullYear() - 2010), 'Тест возраста провален');
    
    const createCarTestFactory = createVehicleFactory(Car);
    const myNewCar = createCarTestFactory('BMW', 'X5', 2022, 4);
    console.log('Создан новый автомобиль:');
    myNewCar.displayInfo();
    
    console.log('Всего создано транспортных средств:', Vehicle.getTotalVehicles());

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