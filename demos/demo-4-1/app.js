// const start = performance.now()
// const startDate = Date.now()

// setTimeout(() => {
//     console.log(Date.now() - startDate)
//     console.log(performance.now() - start)
//     console.log('ok')
// }, 1000)

// function log(arg) {
//     console.log(`Argument: ${arg}`)
// }

// setTimeout(log, 1000, 'Hello, world!')

/**
 * Таймер. Функция выполнится 1 раз спустя 1000 мс
 */
const timerId = setTimeout(() => {
    console.log("Timer")
    timerId.refresh()
}, 1000)

/**
 * Сбросить таймер
 */
// clearTimeout(timerId)

/**
 * Интервал. Функция будет выполнятся каждый раз спустя 1000 мс
 */
const intervalId = setInterval(() => {
    console.log('Interval')
}, 1000)

/**
 * Сбросить интервал
 */
clearInterval(intervalId)

console.log(timerId.hasRef())
timerId.unref()
console.log(timerId.hasRef())

setImmediate(() => {
    timerId.ref()
    console.log(timerId.hasRef())
})