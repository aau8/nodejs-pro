const isNumber = require("./isNumber.js")
const addition = require("./addition.js")
const subtraction = require("./subtraction.js")
const multiply = require("./multiply.js")
const division = require("./division.js")

let firstNumber = process.argv[2]
let secondNumber = process.argv[3]
const command = process.argv[4]

function main() {
    if (!isNumber(firstNumber, 1) || !isNumber(secondNumber, 2)) {
        return false
    }

    firstNumber = Number(firstNumber)
    secondNumber = Number(secondNumber)

    if (command === 'add') {
        console.log(`Сумма равна: ${addition(firstNumber, secondNumber)}`)
    }
    else if (command === 'subtraction') {
        console.log(`Разность равна: ${subtraction(firstNumber, secondNumber)}`)
    }
    else if (command === 'multiply') {
        console.log(`Умножение равно: ${multiply(firstNumber, secondNumber)}`)
    }
    else if (command === 'division') {
        console.log(`Деление равно: ${division(firstNumber, secondNumber)}`)
    }
    else {
        console.log("Неизвестная команда")
    }
}

main()