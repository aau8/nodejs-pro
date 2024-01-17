const { performance } = require("perf_hooks")
const { fork } = require("child_process")
const os = require("os")

const calcNumsInProcesses = async (array) => {
    const CORES = os.availableParallelism()
    const arrayPart = array.length / CORES
    const subArrs = Array(CORES).fill(0).reduce((prev, _, curIndex) =>  [...prev, array.slice(curIndex * arrayPart, curIndex * arrayPart + arrayPart)], [])

    performance.mark("start_calcNumsInProcesses")
    await Promise.all(subArrs.map(subArr => {
        return new Promise((resolve, reject) => {
            const childProcess = fork("./process.js")

            childProcess.on("message", (msg) => {
                resolve(msg)
            })
            childProcess.on("error", (err) => {
                reject(err)
            })

            childProcess.send(subArr)
        })
    }))
    performance.measure("calcNumsInProcesses", "start_calcNumsInProcesses")
}

module.exports = calcNumsInProcesses