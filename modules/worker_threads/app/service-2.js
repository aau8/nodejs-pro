const DB = require("./DataBase.js")

module.exports = () => {
    console.log('run service-2')

    const port = DB.getPort()

    port.on("message", (data) => {

        if (data.action === "addProduct") {
            console.log(`product name: ${data.data.name}-${data.data.id}`)
        }

        if (data.action === "addUser") {
            const { products, users } = data.data
            // console.log("data:", data.data)
            console.log(`products: ${products.length}; users: ${users.length}`)
        }
    })
}