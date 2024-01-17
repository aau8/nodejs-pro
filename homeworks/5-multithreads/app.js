const { PerformanceObserver } = require("perf_hooks")
const calcNums = require("./calcNums.js")
const calcNumsInProcesses = require("./calcNumsInProcesses.js")

const performanceObserver = new PerformanceObserver((list) => {
    console.log(list.getEntries().map(item => `${item.name}: ${item.duration}`).join(";\n- "))
})

performanceObserver.observe({
    entryTypes: [ "measure" ]
})

const ELEM_COUNT = 300_000
const array = Array(ELEM_COUNT).fill(0).map((_, i) => i + 1)

calcNums(array)
calcNumsInProcesses(array)