const { performance, PerformanceObserver } = require("perf_hooks")
const { fork } = require("child_process")
const calcNums = require("./calcNums")

const performanceObserver = new PerformanceObserver((list) => {
    console.log(list.getEntries().map(item => `${item.name} (${item.detail}): ${item.duration}`).join(";\n- "))
})

performanceObserver.observe({
    entryTypes: [ "measure" ]
})

const array = Array(300_000).fill(0).map((_, i) => i + 1)
const CORES = 4
const arrayPart = array.length / CORES
const subArrs = Array(CORES).fill(0).reduce((prev, _, curIndex) =>  [...prev, array.slice(curIndex * arrayPart, curIndex * arrayPart + arrayPart)], [])

const calcNumsInProcess = (array) => {
    return new Promise((resolve, reject) => {
        const childProcess = fork("./process.js")

        childProcess.on("message", (msg) => {
            resolve(msg)
        })
        childProcess.on("error", (err) => {
            reject(err)
        })

        childProcess.send(array)
    })
}

const main = () => {
    for (let i = 0; i < subArrs.length; i++) {
        performance.mark("start_calcNumsInProcess")
        calcNumsInProcess(subArrs[i])
            .then(numsLength => {
                performance.measure(`calcNumsInProcess-${i + 1}`, {
                    start: "start_calcNumsInProcess",
                    detail: numsLength
                })
            })
    }
}

performance.mark("start_calcNums");
const numsLength = calcNums(array)
performance.measure("calcNums", {
    start: "start_calcNums",
    detail: numsLength
});

main()