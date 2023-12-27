const { fork } = require("child_process");

const forkProcess = fork("./worker.js")

forkProcess.on("message", (msg) => {
    console.log(`Message: ${msg}`)
})

forkProcess.on("close", (code) => {
    console.log(`Close: ${code}`)
})

forkProcess.send("Ping")
forkProcess.send("disconnect")