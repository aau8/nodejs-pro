const EventEmitter = require("events")
const isNumber = require("./isNumber.js")
const addition = require("./addition.js")
const subtraction = require("./subtraction.js")
const multiply = require("./multiply.js")
const division = require("./division.js")

function main() {
    const event = new EventEmitter()

    let firstNumber = process.argv[2]
    let secondNumber = process.argv[3]
    const command = process.argv[4]

    if (!isNumber(firstNumber, 1) || !isNumber(secondNumber, 2)) {
        return false
    }

    firstNumber = Number(firstNumber)
    secondNumber = Number(secondNumber)

    event.on('add', () => {
        console.log(`Сумма равна: ${addition(firstNumber, secondNumber)}`)
    })
    event.on('subtraction', () => {
        console.log(`Разность равна: ${subtraction(firstNumber, secondNumber)}`)
    })
    event.on('multiply', () => {
        console.log(`Умножение равно: ${multiply(firstNumber, secondNumber)}`)
    })
    event.on('division', () => {
        console.log(`Деление равно: ${division(firstNumber, secondNumber)}`)
    })

    switch (command) {
        case 'add':
            event.emit('add')
            break;
        case 'subtraction':
            event.emit('subtraction')
            break;
        case 'multiply':
            event.emit('multiply')
            break;
        case 'division':
            event.emit('division')
            break;
        default:
            console.log("Неизвестная команда")
            break;
    }

    event.removeAllListeners("add")
    event.removeAllListeners("subtraction")
    event.removeAllListeners("multiply")
    event.removeAllListeners("division")
}

main()