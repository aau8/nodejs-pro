/**
 * Пример приложения из оф. документации NodeJS - https://nodejs.org/en/learn/getting-started/introduction-to-nodejs#an-example-nodejs-application
 */

const http = require("node:http")

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((_, res) => {
    res.statusCode = 500
    res.setHeader("Content-Type", "text/plain")
    res.end("Hello, world!\n")
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})