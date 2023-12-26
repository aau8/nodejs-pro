const { exec } = require('child_process');

const childProcess = exec('git add .', ((error, stdout, stderr) => {
    if (error) {
        console.error(error.message)
    }

    console.log(`Stdout: \n${stdout}`)
    console.log(`Stderr: \n${stderr}`)
}))

childProcess.on("message", (msg) => {
    console.log(`Message: ${msg}`)
})

childProcess.on("exit", (code) => {
    console.log(`Exit: ${code}`)
})

childProcess.on("spawn", () => {
    console.log('Spawn')
})