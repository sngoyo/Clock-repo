
import dayjs from "dayjs";

export function FormatTime(time) {
    const nowdayjs = dayjs().format();
    const userdayjs = dayjs(time);

    return {
        minutes: getRemainingMinutes(nowdayjs, userdayjs),
        seconds: getRemainingSeconds(nowdayjs, userdayjs)
    };
}

function getRemainingSeconds(nowdayjs, userdayjs) {
    let remainingSeconds = userdayjs.diff(nowdayjs, 'seconds') % 60;
    return Math.abs(remainingSeconds);

}

function getRemainingMinutes(nowdayjs, userdayjs) {
    let remainingMinutes = userdayjs.diff(nowdayjs, 'minutes') % 60;
    console.log(remainingMinutes)
    return Math.abs(remainingMinutes);
}