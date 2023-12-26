const fs = require("fs")
const start = performance.now()

process.nextTick(() => {
    console.log("nextTick")
})

setImmediate(() => {
    console.log('immediate')
})

setTimeout(() => {
    console.log('timer', performance.now() - start)
}, 0)

// fs.readFile(__filename, () => {
//     setTimeout(() => {
//         console.log('timer', performance.now() - start)
//     }, 0)
//     process.nextTick(() => {
//         console.log("nextTick")
//     })
//     setImmediate(() => {
//         while(performance.now() - start < 1000) {}
//         console.log('immediate')
//     })
// })

console.log('before')
while(performance.now() - start < 1000) {}
console.log('after')
