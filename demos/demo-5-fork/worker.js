process.on("message", (msg) => {
    if (msg === 'disconnect') {
        process.disconnect()
        return
    }

    console.log(`Worker message: ${msg}`)
    process.send("Pong")
})