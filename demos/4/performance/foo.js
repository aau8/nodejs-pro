const foo = () => {
    for(let i = 0; i < 1000000000; i++) {}

    return Math.round(Math.random() * 10)
}

module.exports = { foo }