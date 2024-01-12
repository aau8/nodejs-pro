function division(firstNumber, secondNumber) {
    if (secondNumber === 0) {
        throw new Error("Второе число не может быть равно 0 при действии division")
    }
    return firstNumber / secondNumber
}

module.exports = division