const path = require("path")

// console.log(os.homedir(), path.sep)

const url = {
    windows: [
        "C:\\Users\\Mi\\Desktop\\nodejs-pro\\modules\\os\\script.js",
        "C:Users\\Mi\\Desktop\\nodejs-pro\\modules\\os",
    ],
    posix: [
        "C:/Users/Mi/Desktop/nodejs-pro/demos/3/3-events",
    ]
}

// console.log(path.relative(".", "data/file2/2"))
// console.log(path.resolve('/foo', '/bar', 'baz'))
// console.log(path.join(url.windows[1], "/nodejs", "./path", "script.js"))
// console.log(path.normalize("C:\\\\nodejs//path"))
// console.log(path.relative("./nodejs/src/images", "nodejs/scripts/script.js"))
console.log(path.sep)
