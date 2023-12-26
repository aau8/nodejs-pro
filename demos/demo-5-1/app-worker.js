const { Worker } = require("worker_threads");

const compute = (array) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                array
            }
        })

        worker.on("message", (msg) => {
            console.log(worker.threadId)
            resolve(msg)
        })

        worker.on("error", (err) => {
            reject(err)
        })

        worker.on("online", () => {
            console.log('Worker is online')
        })

        worker.on("exit", () => {
            console.log("Worker exit")
        })

        worker.on("messageerror", (err) => {
            console.error('Message error', err)
        })
    })
}

const main = async () => {
    try{
        performance.mark("start")
        const result = await Promise.all([
            compute([10, 33, 24, 18]),
            compute([10, 33, 24, 18]),
            compute([10, 33, 24, 18]),
            compute([10, 33, 24, 18]),
        ])

        console.log(result)

        performance.mark("end")
        performance.measure("main", "start", "end")
        console.log(performance.getEntriesByName("main").pop())
    } catch(err) {
        console.error(err.message)
    }
}

const start = performance.now()

main()
setTimeout(() => {
    console.log("Timeout", performance.now() - start)
}, 1000)