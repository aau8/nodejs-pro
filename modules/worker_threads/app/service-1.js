const DB = require("./DataBase.js")

module.exports = () => {
    console.log('run service-1')

    const port = DB.getPort()

    port.on("message", (data) => {

        if (data.action === "addProduct") {
            const product = data.data
            // console.log('product:', product)

            DB.addUser("Artem", 23)
        }
    })
}