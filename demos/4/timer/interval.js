const start = performance.now()
let i = 0

const intervalId = setInterval(() => {
    console.log(`interval ${++i}; ${performance.now() - start}`)

    if (i === 100) {
        clearInterval(intervalId)
        console.log(`FINISH: ${(performance.now() - start) / i}`)
    }
}, 2)