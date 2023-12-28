const factorial = require("./factorial.js")

const compute = (array) => {
    const arr = []
    for(let i = 0; i < 100000000; i++) {
        arr.push(i * i)
    }
    return array.map(el => factorial(el))
}

const main = () => {
    performance.mark("start")
    const result = [
        compute([10, 33, 24, 18]),
        compute([10, 33, 24, 18]),
        compute([10, 33, 24, 18]),
        compute([10, 33, 24, 18]),
    ]

    console.log(result)

    performance.mark("end")
    performance.measure("main", "start", "end")
    console.log(performance.getEntriesByName("main").pop())
}

const start = performance.now()

main()
setTimeout(() => {
    console.log("Timeout", performance.now() - start)
}, 1000)