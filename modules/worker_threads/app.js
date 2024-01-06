/**
 * [x] worker.getEnvironmentData()
 * [x] worker.setEnvironmentData()
 * [x] worker.isMainThread
 * [x] worker.parentPort
 * [x] worker.threadId
 * [x] worker.workerData
 * [x] class BroadcastChannel
 * [ ] class MessagePort
 */

const { Worker, isMainThread, workerData, parentPort, MessageChannel, resourceLimits, SHARE_ENV, threadId, markAsUntransferable, getEnvironmentData, setEnvironmentData,  } = require("worker_threads");
const fsPromise = require("fs/promises");
const assert = require("assert");

const channel = new BroadcastChannel("name")

// setEnvironmentData()

const getFileHandle = async () => {
    return fsPromise.open("./output.txt", "a+")
        .catch(err => {
            console.error("Err:", err)
        })
}

class Person {
    constructor() {
        this.name = "Artyom"
        this.old = 23
    }

    setName(value) {
        this.name = value
    }
}

async function main() {
    if (isMainThread) {
        console.log('main thread:', workerData)
        setEnvironmentData("name", "Artyom")
        process.env.DEV_MODE = true
        console.log("env parent:", process.env.DEV_MODE)
        const worker = new Worker(__filename, {
            resourceLimits: undefined,
            env: SHARE_ENV,
        })

        worker.on("message", (msg) => {
            console.log("Parent msg:", msg)
            // worker.postMessage("Hello from parent")
        })

        worker.on("messageerror", err => {
            console.log("messageerror:", err)
        })

        setTimeout(() => {
            process.env.DEV_MODE = false
            worker.postMessage("DEV_MODE")
        }, 2000)

        // const fileHandle = await getFileHandle()
        // const person = new Person()

        // person.setName("Nikita")

        // console.log("person:", person.name)

        // worker.postMessage({
        //     type: "person",
        //     data: person
        // }, [
        //     // fileHandle
        // ])

        // worker.postMessage({
        //     type: "file",
        //     data: fileHandle
        // }, [
        //     fileHandle
        // ])

        // const data = await fileHandle.readFile()

        // console.log("data:", data.toString())
    }
    else {
        // console.log("env environment data:", getEnvironmentData("name"))
        parentPort.postMessage("Hello from worker")
        // console.log("env worker:", process.env.DEV_MODE)

        parentPort.on("message", (msg) => {
            console.log("Worker msg:", msg)

            if (msg.type === "file") {
                const fileHandle = msg.data
                fileHandle.writeFile("Hello, world!\n")
            }
            else if (msg.type === "person") {
                const person = msg.data
                console.log("person from worker:", person.name)
            }
            else if (msg === "DEV_MODE") {
                console.log("env worker:", process.env.DEV_MODE)
                parentPort.close()
            }
            else {
                parentPort.close()
            }
        })
    }
}

main()