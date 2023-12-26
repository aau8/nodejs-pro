const { setTimeout: setTimeoutPromise } = require("node:timers/promises")

setTimeoutPromise(1000, 'foobar')
    .then(res => console.log(res))
    .catch(err => {
        if (err) {
            throw new Error(err)
        }
    })