const DB = require("./DataBase.js")
const service1 = require("./service-1.js")
const service2 = require("./service-2.js")

const main = () => {
    service1()
    service2()

    setInterval(() => {
        DB.addProduct("Молоко", 60)
    }, 2000)
}

main()