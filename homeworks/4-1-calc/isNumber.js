function isNumber(value, argvCount) {
    if (Number(value) != value) {
        console.log(`Аргумент ${argvCount} не является числом`)
        return false
    }
    return true
}

module.exports = isNumber