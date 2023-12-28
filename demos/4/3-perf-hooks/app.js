const perfHooks = require("perf_hooks")

test = perfHooks.performance.timerify(test)

const performanceObserver = new perfHooks.PerformanceObserver((list, observer) => {
    console.log(list.getEntries())
    const entry = list.getEntriesByName("slow").pop()
    console.log(`${entry.name}: ${entry.duration}`)
    observer.disconnect()
})
performanceObserver.observe({ entryTypes: [ "measure", "function" ] })

function test() {
    const arr = []
    for(let i = 0; i < 10000000; i++) {
        arr.push(i*i)
    }
}

function slow() {
    performance.mark("start")
    const arr = []
    for(let i = 0; i < 10000000; i++) {
        arr.push(i*i)
    }
    performance.mark("end")
    performance.measure("slow", "start", "end")
    // console.log(performance.getEntriesByName("slow"))
}

test()
slow()