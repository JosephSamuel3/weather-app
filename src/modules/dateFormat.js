
function getDayOfWeek(dateString) {
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "America/New_York" // force EST/EDT
    });
}

function dateFromEpoch(datetimeEpoch) {
    const epoch = datetimeEpoch;
    const date = new Date(epoch * 1000);

    // Format as Wk-MM-DD
    const formatted = date.toLocaleDateString("en-US", {
        weekday: "long", // Mon, Tue, ...
        month: "long",   // Jan, Feb, ...
        day: "numeric",    // 1, 2, ...
    });
    return formatted;
}


export { getDayOfWeek, dateFromEpoch};