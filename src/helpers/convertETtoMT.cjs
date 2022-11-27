function _isDST(date){
    const year = date.getFullYear();
    const dst_start = new Date(year, 2, 14);
    const dst_end = new Date(year, 10, 7);
    dst_start.setDate(14 - dst_start.getDay()); // adjust date to 2nd Sunday
    dst_end.setDate(7 - dst_end.getDay()); // adjust date to the 1st Sunday
    return (date >= dst_start && date < dst_end);
}
module.exports.convertETtoMT = (time) => {
    const isDst = _isDST(new Date())
    let hour = ((time.split(" "))[0].split(":"))[0]
    let mins = ((time.split(" "))[0].split(":"))[1]
    let period
    switch (hour) {
        case "1":
            hour = isDst ? 10 : 11
            period = 'am'
            break
        case "2":
            hour = isDst ? 11 : 12
            period = mt_hour === 11 ? 'am' : 'pm'
            break
        case "3":
            hour = isDst ? 12 : 1
            period = 'pm'
            break
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        default:
            hour = isDst ? hour - 3 : hour - 2
            period = 'pm'
            break
    }
    switch (mins) {
        case undefined: 
        default:
            mins = '00'
            break
    }
    return `${hour}:${mins} ${period} MT`
}