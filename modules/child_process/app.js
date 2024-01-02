/**
 * [x] stdin, stdout, stderr
 * [x] exec()
 * [x] spawn()
 * [x] fork()
 * [x] process.cwd()
 */

const { spawn, exec, execFile, fork, execSync } = require("child_process");
const { promisify } = require("util");
const fs = require("fs");

// const img = fs.readFileSync("./img.png")

// console.log(img)

// const readFile = promisify(fs.readFileSync)
// const stat = promisify(fs.stat)

// stat('.')
//     .then(res => {
//         console.log('res: ', res)
//     })

// console.log(readFile.toString())
// readFile("./img.png")
//     .then((value) => {
//         console.log(value)
//     })
//     .catch(err => {
//         console.log('err', err)
//     })

// const spawnInst = spawn("node script.js", { env: { PATH: "C:\\Users\\Mi\\bin;" } })

// spawnInst.on("message", (msg) => {
//     console.log(`App: ${msg}`)
// })

// const controller = new AbortController()
// const ex = exec('node script.js', { signal: controller.signal }, (err, stdout, stderr) => {
//     if (err) {
//         console.log(err)
//         // console.error("Name: ", err.name)
//         // console.error("code: ", err.code)
//         // console.error("message: ", err.message)
//         return
//     }

//     console.log("stdout: ", stdout)
//     console.log("stderr: ", stderr)
// })

// setTimeout(() => {
//     controller.abort('Timeout error')
// }, 1000)

// console.log(process.env.ComSpec)

// process.once("SIGTERM", shutd)

/**
 * ======================
 */

// const perfObs = new PerformanceObserver((list, observer) => {
//     for (const entry of list.getEntriesByType("measure")) {
//         console.log(entry.name, entry.duration)
//     }
// })

// perfObs.observe({ entryTypes: [ "measure" ] })

// performance.mark("execFileStart")
// execFile("node", ["script.js"], (error, stdout, stderr) => {
//     if (error) {
//         throw error;
//     }
//     console.log("stdout: ", stdout);
//     performance.measure("execFile", "execFileStart")
// });

// performance.mark("execStart")
// exec("node script.js", { env: { DEV_MODE: true } }, (error, stdout, stderr) => {
//     if (error) {
//         throw error;
//     }
//     console.log("stdout: ", stdout);
//     performance.measure("exec", "execStart")
// });

/**
 * ======================
 */

// const out = fs.openSync("./out.log", "a")
// const err = fs.openSync("./err.log", "a")

// console.log(out, err)

// const sp = spawn("node", [ "script.js" ], {
//     stdio: [ "pipe", out, "pipe" ]
// })

// // sp.stdout.on("data", (chunk) => {
// //     console.log('data: ', chunk.toString())
// // })

// sp.on("message", (msg) => {
//     console.log("msg: ", msg)
// })

// sp.on("exit", (code) => {
//     console.log("exit: ", code)
// })

/**
 * ================================
 */

// const outputFile = fs.openSync("./out.log", "a");
// // const childProcess = fork("script.js", {
// //     // timeout: 2000,
// //     stdio: ["inherit", outputFile, "inherit", "ipc"],
// // });

// const childProcess = spawn("node", [ 'script.js' ])

// childProcess.on("message", (msg) => {
//     console.log("msg app message: ", msg);

//     // if (msg === "disconnect") {
//     //     childProcess.disconnect();
//     //     return;
//     // }
//     if (childProcess.connected) {
//         console.log('childProcess.connected', childProcess.connected)
//         console.log(childProcess.send("hello from parent"));
//     }
// });

// // sp.stdout.on("data", (chunk) => {
// //     console.log("msg app data: ", chunk.toString())
// // })

// childProcess.on("error", (err) => {
//     if (err) {
//         // console.log(err.name, err.message);
//         console.log(err)
//     }
// });

// childProcess.on("disconnect", () => {
//     console.log("Child process is disconnect");
// });

// childProcess.on("exit", (code, signal) => {
//     console.log("exit: ", code, signal)
// })

// childProcess.on("close", (code, signal) => {
//     console.log('close: ', code, signal)
// })

// childProcess.stdin.end(() => {
//     console.log('stdin is ended')
// })

/**
 * ======================
 */

// const cpExec = exec("node script.js")
// const cpExecFile = execFile("node", [ "script.js" ])
// const cpSpawn = spawn("node", [ "script.js" ])
// const cpFork = fork("script.js")

// console.log("spawnfile cpExec: ", cpExec.spawnfile)
// console.log("spawnfile cpExecFile: ", cpExecFile.spawnfile)
// console.log("spawnfile cpSpawn: ", cpSpawn.spawnfile)
// console.log("spawnfile cpFork: ", cpFork.spawnfile)

/**
 * ======================
 */

// const inputFile = fs.openSync("./input.log", "w")
// const outputFile = fs.openSync("./out.log", "w")
// const childProcess = spawn("grep", [ "shell" ], {
//     stdio: [ "pipe", outputFile, "pipe" ]
// })

// childProcess.stdin.write("Hello, world!", (err) => {
//     if (err) {
//         console.error(err.name, err.message)
//     }

//     console.log('writed')
// })
// childProcess.stdin.end(() => {
//     console.log('ended')
// })

// // childProcess.stdout.on("data", (chunk) => {
// //     console.log("chunk: ", chunk)
// // })

// childProcess.on("message", (msg) => {
//     console.log("childProcess msg: ", msg)
// })

/**
 * ======================
 */

// const childProcess = exec("node script.js", (err, stdout, stderr) => {
//     if (err) {
//         console.error(err.name, err.code)
//         return
//     }

//     console.log("exec callback")
//     // console.log("stdout:", stdout)
//     // console.log("stderr:", stderr)
// })

// execSync("node app.js")

/**
 * =====================
 */

const cpExecFile = execFile(
    "node",
    (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log("ExecFile stdout:", stdout);
    }
);

cpExecFile.stdout.on("data", (chunk) => {
    console.log("ExecFile stdout data:", chunk)
})

