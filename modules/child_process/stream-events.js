const { exec } = require("child_process")

const childProcess = exec("node script.js", (err, stdout, stderr) => {
    if (err) {
        console.error(err.name, err.code)
        return
    }

    console.log("exec callback")
    // console.log("stdout:", stdout)
    // console.log("stderr:", stderr)
})

// childProcess
childProcess.on("exit", (code) => {
    console.log('childProcess exit:', code)
})

childProcess.on("close", (code) => {
    console.log('childProcess close:', code)
})


/**
 * Stdout
 */

// Событие генерируется когда пользователю становятся доступны выводимые данные.
// В случае с stdout, событие срабатывает каждый раз, когда в терминале выводится сообщение
childProcess.stdout.on("data", (chunk) => {
    console.log("parent process:", chunk)
})

// Событие генерируется, когда доступны данные для чтения
childProcess.stdout.on("readable", () => {
    const data = childProcess.stdout.read()
    console.log('stdout readable:', data)
})

// Событие генерируется, когда в терминале больше нет данных для вывода
childProcess.stdout.on("end", () => {
    console.log('stdout end')
})

// Событие генерируется при закрытии потока
childProcess.stdout.on("close", () => {
    console.log('stdout close')
})

// Событие генерируется, когда на стриме возникает какая-либо критическая ошибка. err вернет объект Error.
childProcess.stdout.on("error", (err) => {
    console.log("stdout err:", err)
})

// Событие генерируется при вызове метода .pause() и когда свойство readableFlowing не равен false
childProcess.stdout.on("pause", () => {
    console.log("stdout pause")
})

// Событие генерируется при вызове метода .resume() и когда свойство readableFlowing не равен true
childProcess.stdout.on("resume", () => {
    console.log("stdout resume")
})

// Stderr
childProcess.stderr.on("data", (chunk) => {
    console.log("parent stder:", chunk)
})