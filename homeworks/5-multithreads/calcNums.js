const { performance } = require("perf_hooks");

module.exports = (array) => {
    const nums = [];
    for (let i = 0; i < array.length; i++) {
        const num = array[i];

        if (num % 3 === 0) {
            nums.push(num);
        }
    }

    return nums.length;
};
