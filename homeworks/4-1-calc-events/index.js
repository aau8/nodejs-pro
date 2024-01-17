const EventEmitter = require("events");
const isNumber = require("./isNumber.js");
const addition = require("./addition.js");
const subtraction = require("./subtraction.js");
const multiply = require("./multiply.js");
const division = require("./division.js");

const event = new EventEmitter();
const [, , firstNumberValue, secondNumberValue, command] = process.argv;
const actions = { addition, subtraction, multiply, division }

Object.entries(actions).map(([actionName, actionFn]) => {
    event.on(actionName, (firstNumber, secondNumber) => {
        event.emit("result", actionFn(firstNumber, secondNumber));
    });
})

event.on("result", (result) => {
    console.log(`Результат: ${result}`);
});

function calculate(firstValue, secondValue, command) {
    if (!isNumber(firstValue, 1) || !isNumber(secondValue, 2)) {
        return false;
    }

    const firstNumber = Number(firstValue);
    const secondNumber = Number(secondValue);

    if (!Object.keys(actions).some(action => action === command)) {
        return console.log("Неизвестная команда");
    }

    event.emit(command, firstNumber, secondNumber);
}

calculate(firstNumberValue, secondNumberValue, command);