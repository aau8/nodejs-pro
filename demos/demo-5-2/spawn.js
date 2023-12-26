const { spawn } = require('child_process');

const childProcess = spawn('git add .')

childProcess.stdout.on("data", (chunk) => {
    console.log(`Stdout: ${chunk}`)
})

childProcess.stderr.on("data", (chunk) => {
    console.log(`Stderr: ${chunk}`)
})

childProcess.stderr.on("end", () => {
    console.log(`Stderr end`)
})

childProcess.on("exit", (code) => {
    console.log(`Exit: ${code}`)
})

childProcess.on("error", err => {
    console.error(err.message)
})