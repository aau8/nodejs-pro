const getTimeValue = (timeValues, substring) => {
    return parseInt(timeValues.find(value => value.includes(substring)) || 0)
}

module.exports = getTimeValue