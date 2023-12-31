const subprocess = require("node:child_process").fork("./server-child-process.js");

// Open up the server object and send the handle.
const server = require("node:net").createServer();
server.on("connection", (socket) => {
    socket.end("handled by parent");
});
server.listen(1337, () => {
    subprocess.send("server", server);
});
