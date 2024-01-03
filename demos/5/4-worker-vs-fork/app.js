const { Worker } = require("worker_threads");
const { fork } = require("child_process");
const fs = require("fs");

const videoFile = fs.readFileSync("./video.mp4");

const workerFunction = (array) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./worker.js", {
            workerData: {
                array,
                videoFile,
            },
        });

        worker.postMessage("videoFile", [
            videoFile.buffer
        ])

        worker.on("message", (msg) => {
            resolve(msg);
        });

        worker.on("error", (err) => {
            reject(err);
        });
    });
};

const forkFunction = (array) => {
    return new Promise((resolve, reject) => {
        const forkProcess = fork("./fork.js");

        forkProcess.on("message", (msg) => {
            resolve(msg);
        });

        forkProcess.on("error", (err) => {
            reject(err);
        });

        // forkProcess.on("disconnect", () => {
        // })

        forkProcess.send({ array, videoFile });
    });
};

const main = async () => {
    try {
        performance.mark("startWorker");
        await workerFunction([12, 24, 32, 44]).then((res) => {
            console.log(`workerFunction: ${res}`);
        });
        performance.measure("worker", "startWorker");

        // performance.mark("startFork");
        // await forkFunction([12, 24, 32, 44]).then((res) => {
        //     console.log(`forkFunction: ${res}`);
        // });
        // performance.measure("fork", "startFork");


        const perfWorker = performance.getEntriesByName("worker").pop();
        // const forkWorker = performance.getEntriesByName("fork").pop();

        console.log(perfWorker.name, perfWorker.duration);
        // console.log(forkWorker.name, forkWorker.duration);
    } catch (err) {
        console.error("Error: ", err.message);
    }
};

main();
