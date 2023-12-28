const { performance } = require("perf_hooks");
const { foo } = require("./foo.js")

performance.mark("start")
foo()
performance.mark("end")

performance.measure("foo")

console.log(performance.getEntriesByName("foo"))