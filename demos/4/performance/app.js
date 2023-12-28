/**
 * [x] clearMarks()
 * [x] clearMeasures()
 * [x] getEntries()
 * [x] getEntriesByName()
 * [x] getEntriesByType()
 * [x] mark()
 * [x] measure()
 * [x] now()
 * [x] timeOrigin
 * [x] timerify()
 * [x] new PerformanceObserver()
 * [x] performanceObserver.observe()
 */

const { performance, PerformanceNodeTiming, PerformanceObserver } = require("perf_hooks");
const { foo } = require("./foo.js")

const po = new PerformanceObserver()

po.observe()

// const po = new PerformanceObserver((list, observer) => {
//     console.log(list.getEntriesByType())

//     console.log(performance.clearMarks("start timeout"))
//     performance.clearMeasures()
//     // observer.disconnect()
// })

// po.observe({
//     entryTypes: [ "measure", "function", "mark" ],
// })

const foo2 = performance.timerify(foo)

// performance.mark("start")
// foo2()
// performance.measure("foo2", "start")


// performance.mark("start timeout")
// setTimeout(() => {
//     foo2()
//     performance.measure("timeout", "start timeout")
//     console.log('end')
// }, 1000)


const startNode = performance.timeOrigin

console.log(startNode)

setTimeout(() => {
    console.log(startNode === performance.timeOrigin)
}, 1000)