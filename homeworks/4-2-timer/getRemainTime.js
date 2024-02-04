const getRemainTime = (totalTimeSec, elapsedTimeSec) => {
    const remainSecTime = totalTimeSec - elapsedTimeSec;

    const hours = Math.trunc(remainSecTime / 60 / 60);
    const minutes = Math.trunc((remainSecTime - hours * 60 * 60) / 60);
    const seconds = Math.trunc(remainSecTime - (hours * 60 + minutes) * 60);

    return { hours, minutes, seconds };
};

module.exports = getRemainTime;
