const notifier = require("node-notifier");

const args = [
    process.argv[2],
    process.argv[3],
    process.argv[4],
    process.argv[5],
].filter(value => !!value)

const message = args.find(arg => arg.includes("task="))?.replace("task=", "") || "Таймер завершен!"
const hours = parseInt(args.find(arg => arg.includes('h')) || 0)
const minutes = parseInt(args.find(arg => arg.includes('m')) || 0)
const seconds = parseInt(args.find(arg => arg.includes('s')) || 0)
const secTotal = (hours * 60 * 60 + minutes * 60 + seconds)
let secTime = 0

function calcTime() {
    if (secTime >= secTotal) {
        clearInterval(intervalId)
        console.log(message)
        notifier.notify({
            title: "Таймер завершен!",
            message: message,
        }, (err, res, meta) => {
            if (err) {
                console.error(err)
                return
            }
            console.log("res", res)
            console.log("meta", meta)
        })
    }

    secTime++
}

const intervalId = setInterval(calcTime, 1000)
calcTime()