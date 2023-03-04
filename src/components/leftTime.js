import React from "react";
import dayjs from "dayjs";

export function FormatTime(time) {
    //  console.log(formatedMinutes)
    const nowdayjs = dayjs().format();
    const userdayjs = dayjs(time);

    return {
        minutes: getRemainingMinutes(nowdayjs, userdayjs),
        seconds: getRemainingSeconds(nowdayjs, userdayjs)
    };
}


function getRemainingSeconds(nowdayjs, userdayjs) {
    let remainingSeconds = userdayjs.diff(nowdayjs, 'seconds') % 60;
    // let formatedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return remainingSeconds;

}


function getRemainingMinutes(nowdayjs, userdayjs) {
    let remainingMinutes = userdayjs.diff(nowdayjs, 'minutes') % 60;
    //let formatedMinutes = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;
    return remainingMinutes;

}