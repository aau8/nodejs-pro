"use strict";
const { PerformanceObserver } = require("node:perf_hooks");
const http = require("node:http");
const { foo } = require("./foo.js");

const obs = new PerformanceObserver((items) => {
    console.log(items.getEntries());
});

obs.observe({ entryTypes: ["http"] });

const PORT = 3000;

http.createServer((req, res) => {
    // foo()
    res.end("ok");
}).listen(PORT, () => {
    http.get(`http://127.0.0.1:${PORT}`);
});
