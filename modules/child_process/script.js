const { clear } = require("console")
const fs = require("fs")
// console.log(process.env.PATH)

// process.send("good")

fs.readFile("./img.png", (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    // for(let i = 0; i < 1_000_000_000; i++) {}
    // console.log("Hello, world!")

    console.error("Случайная ошибка")
    let i = 0
    const intervalId = setInterval(() => {
        console.log(`Message: ${++i}`)

        if (i >= 5) {
            clearInterval(intervalId)
        }
    }, 200)

    // console.log("DEV_MODE:", process.env.DEV_MODE)
    // process.send("message from process 1")
    // process.send("message from process 2")

    // setTimeout(() => {
    //     console.log('timeout')
    //     process.disconnect()
    // }, 2000)
})

// process.stdin.on("data", (data) => {
//     process.send('data: ', data.toString())
// })

// process.on("message", (msg) => {
//     console.log("msg script: ", msg)
// })

// process.on("disconnect", () => {
//     console.log("Child process is disconnect from parent")
// })

// setTimeout(() => {
//     // process.send("child process disconnecting")
//     // process.disconnect()
//     console.log('timeout')
// }, 20000)

// const handleSignal = () => {
//     console.log("SIGNAL!!!")
// }

// process.on("SIGTERM", (signal) => {
//     console.log('process SIGTERM')
//     // process.send(signal)
// })

// process.on("SIGTERM", handleSignal)
// process.on("SIGINT", handleSignal)