const EventEmitter = require("events");
const isNumber = require("./isNumber.js");
const addition = require("./addition.js");
const subtraction = require("./subtraction.js");
const multiply = require("./multiply.js");
const division = require("./division.js");

function main() {
    const event = new EventEmitter();

    let firstNumber = process.argv[2];
    let secondNumber = process.argv[3];
    const command = process.argv[4];

    if (!isNumber(firstNumber, 1) || !isNumber(secondNumber, 2)) {
        return false;
    }

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    event.on("addition", (f, s) => {
        event.emit("result", addition(f, s));
    });
    event.on("subtraction", (f, s) => {
        event.emit("result", subtraction(f, s));
    });
    event.on("multiply", (f, s) => {
        event.emit("result", multiply(f, s));
    });
    event.on("division", (f, s) => {
        event.emit("result", division(f, s));
    });
    event.on("result", (result) => {
        console.log(`Результат: ${result}`);
    });

    if (
        command === "addition" ||
        command === "subtraction" ||
        command === "multiply" ||
        command === "division"
    ) {
        event.emit(command, firstNumber, secondNumber);
    } else {
        console.log("Неизвестная команда");
    }
}

main();
