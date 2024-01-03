const { parentPort, workerData } = require("worker_threads");
const { compute } = require("./factorial.js")

parentPort.postMessage(compute(workerData))

parentPort.on("message", (msg) => {
    console.log("msg:", msg)
    parentPort.close()
})