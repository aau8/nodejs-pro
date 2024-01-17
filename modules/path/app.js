const path = require("path")

// console.log(os.homedir(), path.sep)

const url = {
    windows: [
        "C:\\Users\\Mi\\Desktop\\nodejs-pro\\modules\\os",
        "C:Users\\Mi\\Desktop\\nodejs-pro\\modules\\os",
    ],
    posix: [
        "C:/Users/Mi/Desktop/nodejs-pro/demos/3/3-events",
    ]
}

// console.log(path.relative(".", "data/file2/2"))
// console.log(path.resolve('/foo', '/bar', 'baz'))
console.log(path.toNamespacedPath(url.windows[1])) 