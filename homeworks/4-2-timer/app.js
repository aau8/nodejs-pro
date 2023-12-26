const timeValues = [
    process.argv[2],
    process.argv[3],
    process.argv[4],
].filter(value => !!value)
const hours = parseInt(timeValues.find(value => value.includes('h')) || 0)
const minutes = parseInt(timeValues.find(value => value.includes('m')) || 0)
const seconds = parseInt(timeValues.find(value => value.includes('s')) || 0)
const secTotal = (hours * 60 * 60 + minutes * 60 + seconds)
let secTime = 0

function calcTime() {
    const remainSecTime = secTotal - secTime
    const remainHours = Math.trunc(remainSecTime / 60 / 60)
    const remainMinutes = Math.trunc((remainSecTime - (remainHours * 60 * 60)) / 60)
    const remainSeconds = Math.trunc(remainSecTime - ((remainHours * 60 + remainMinutes) * 60))

    console.log(`${remainHours}h ${remainMinutes}m ${remainSeconds}s`)

    if (secTime >= secTotal) {
        clearInterval(intervalId)
        console.log('Нужно позвонить!!!')
    }

    secTime++
}

const intervalId = setInterval(calcTime, 1000)
calcTime()