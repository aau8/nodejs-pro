const { parentPort, workerData } = require("worker_threads");
const { compute } = require("./compute.js");

const start = performance.now();
const result = compute();
const end = performance.now();

parentPort.postMessage({
    result: result,
    start_time: start,
    end_time: end,
    duration: end - start,
    origin_time: performance.timeOrigin,
});
