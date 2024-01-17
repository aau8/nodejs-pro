const fs = require("fs")
const fsPromises = require("fs/promises")
const { Buffer } = require("buffer")
const path = require("path")

// const text = "./text.txt"
// const arrayBuffer = new ArrayBuffer(16)
// const buffer = Buffer.from(text)
// // const url = new URL("./text.txt", path.dirname(process.argv[1]))

// console.log(buffer, path.dirname(process.argv[1]))

// fsPromises.readFile(buffer, "utf8")
//     .then(res => {
//         console.log(res)
//     })

/**
 * ==========
 */
const isExists = async (path) => {
    try {
        await fsPromises.stat(path)
        return true
    } catch(e) {
        console.log(e)
        return false
    }
}

const main = async () => {
    const filePath = path.resolve("text.txt")

    if (await isExists(filePath)) {
        console.log('is exists')
    }
}

main()

/**
 * ==========
 */
// const main = async () => {
//     const fh = await fsPromises.open("./text.txt", "w+")
//     // const fd = fs.openSync("./text.txt", "as+")

//     // fs.appendFile(fd, "Hello, world!", {}, (err) => {
//     //     if (err) {
//     //         return console.error(err)
//     //     }

//     //     console.log('content is written')
//     // })

//     // const res = await fsPromises.writeFile(fh, "Hello, world!\n")
//     // .catch(err => {
//     //     console.log(err)
//     // })
//     // console.log(res)

//     const res = await fsPromises.stat("./text.txt")
//     console.log(res)
// }

// main()
/**
 * ==========
 */

/**
 * ==========
 */
// const text = new Array(1_000_00).fill("lorem ipsum").join(", ")
// const text2 = new Array(1_000).fill("lorem ipsum").join(", ")

// const write = async (id, text) => {
//     const fh = await fsPromises.open("./text.txt", 'a')
//     // const fd2 = await fsPromises.open("./text.txt", 'a')

//     // console.log(fd, fd2)

//     fsPromises.writeFile(fh, id + " " + text + "\n\nend\n\n")
//     .then(res => {
//         console.log(`${id} is writen`)
//     })
//     // fsPromises.writeFile(fd2, "2. Hello, world!\n")
// }

// write(1, text)
// write(2, text2)
/**
 * ==========
 */