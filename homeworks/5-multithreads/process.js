const calcNums = require("./calcNums");

process.on("message", (msg) => {
    if (Array.isArray(msg)) {
        const numsLength = calcNums(msg)
        process.send(numsLength)
        process.disconnect()
    }
})