const fs = require("fs")
const start = performance.now()

function readFile() {
    fs.readFile("./data.txt", () => {

        while(performance.now() - start < 2000) {
        }

        console.log('File readed')
    })
}

// readFile()


Promise.resolve().then(() => {
    while(performance.now() - start < 2000) {
    }
})

setTimeout(() => {
    console.log('timer 1', performance.now() - start)
}, 1000)