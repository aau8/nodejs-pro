const getRemainTime = require("./getRemainTime.js");
const getTimeValue = require("./getTimeValue.js");

const timeValues = [process.argv[2], process.argv[3], process.argv[4]].filter(
    (value) => !!value
);

const hours = getTimeValue(timeValues, "h");
const minutes = getTimeValue(timeValues, "m");
const seconds = getTimeValue(timeValues, "s");
const totalTimeSec = hours * 60 * 60 + minutes * 60 + seconds;

function startTimer() {
    let elapsedTimeSec = 1; // с учетом вызова функции calcTime спустя 1000ms после запуска setInterval

    function calcTime() {
        const { hours, minutes, seconds } = getRemainTime(
            totalTimeSec,
            elapsedTimeSec
        );

        console.log(`${hours}h ${minutes}m ${seconds}s`);

        if (elapsedTimeSec >= totalTimeSec) {
            clearInterval(intervalId);
            console.log("Нужно позвонить!!!");
        }

        elapsedTimeSec++;
    }

    console.log("Таймер запущен!")
    const intervalId = setInterval(calcTime, 1000);

    process.on("SIGINT", () => {
        clearInterval(intervalId)
        console.log("Таймер отменен!")
    })
}

startTimer();
