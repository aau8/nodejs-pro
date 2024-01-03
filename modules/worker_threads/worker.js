const { Worker, isMainThread, parentPort } = require("worker_threads");

console.log("worker:", parentPort)
parentPort.postMessage("Hello from worker")

parentPort.on("message", (msg) => {
    console.log("Worker msg:", msg)
    parentPort.close()
})