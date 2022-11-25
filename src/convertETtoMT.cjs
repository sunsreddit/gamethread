const isDist = require("isdst").isDST

module.exports.convertETtoMT = (time) => {
    const isDst = isDist(new Date())
    let hour = ((time.split(" "))[0].split(":"))[0]
    let mins = ((time.split(" "))[0].split(":"))[1]
    switch (hour) {
        case "1":
            hour = isDst ? 10 : 11
            period = 'am'
            break
        case "2":
            hour = isDst ? 11 : 12
            per
            iod = mt_hour === 11 ? 'am' : 'pm'
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
    return `${hour}:${mins} ${period}`
}