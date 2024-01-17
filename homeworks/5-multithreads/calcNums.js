const { performance } = require("perf_hooks");

module.exports = (array) => {
    performance.mark("start_calcNums");

    const nums = [];
    for (let i = 0; i < array.length; i++) {
        const num = array[i];

        if (num % 3 === 0) {
            nums.push(num);
        }
    }
    performance.measure("calcNums", "start_calcNums");

    return nums.length;
};
