// const { performance } = require("perf_hooks")
const { Worker } = require("worker_threads");
const { compute } = require("./compute.js");

function workerFunction() {
    return new Promise((resolve) => {
        const worker = new Worker("./worker.js");

        worker.on("message", (msg) => {
            resolve(msg);
        });
    });
}

function fooFunction() {
    const start = performance.now();
    const result = compute();
    const end = performance.now();

    return {
        result: result,
        start_time: start,
        end_time: end,
        duration: end - start,
        origin_time: performance.timeOrigin,
    };
}

async function main() {
    const workerResult = await workerFunction();
    const fooResult = fooFunction();

    console.log(workerResult.duration, fooResult.duration);
}

// main();



// function foo() {
//     const dateStart = Date.now()
//     const perfStart = performance.now()

//     console.log(dateStart, perfStart)

//     for(let i = 0; i < 100000000; i++) {}

//     return [
//         Date.now() - dateStart,
//         performance.now() - perfStart
//     ]
// }

// const arr = new Array(10).fill(0).map(el => {
//     const time = foo()

//     return [ ...time, time[0] - time[1] ]
// })

// console.log(arr)
