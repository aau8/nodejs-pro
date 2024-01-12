const isNumber = require("./isNumber.js");
const addition = require("./addition.js");
const subtraction = require("./subtraction.js");
const multiply = require("./multiply.js");
const division = require("./division.js");

const [, , firstValue, secondValue, command] = process.argv;
const actions = { addition, subtraction, multiply, division };

function main() {
    if (!isNumber(firstValue) || !isNumber(secondValue)) {
        return console.error(
            "Один из первых двух аргументов не является числом!"
        );
    }

    const firstNumber = Number(firstValue);
    const secondNumber = Number(secondValue);

    if (!actions[command]) {
        return console.error("Такой команды не существует!");
    }

    Object.entries(actions).forEach(([commandName, actionFn]) => {
        if (command === commandName) {
            console.log(`Равно: ${actionFn(firstNumber, secondNumber)}`);
        }
    });
}

main();
