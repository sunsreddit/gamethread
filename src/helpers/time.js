/**
 * Verifies if it is currently Daylight Savings Time
 * @param {*} date - A Date Object
 * @returns {Boolean}
 */
function IsDaylightSavings(date = new Date()) {
    const year = date.getFullYear()
    const dst_start = new Date(year, 2, 14)
    const dst_end = new Date(year, 10, 7)
    dst_start.setDate(14 - dst_start.getDay()) // adjust date to 2nd Sunday
    dst_end.setDate(7 - dst_end.getDay()) // adjust date to the 1st Sunday
    return (date >= dst_start && date < dst_end)
}

/**
 * Returns the difference in hours between two given dates
 * @param {Date} startDate - The current date
 * @param {Date} endDate - The game date
 * @returns {Boolean}
 */
function diffHours(startDate, endDate) {
    if (!(startDate instanceof Date || endDate instanceof Date)) throw new Error(`Parameters must be of type [Date]`)
    return Math.abs(Math.round(((endDate.getTime() - startDate.getTime())) / (1000 * 3600)))
}

/**
 * Checks the time and confirms if it's within the two-hour window to Submit a Game Thread Post
 * @param {*} gameTime - A string timestamp representing the time of when the game starts  
 * @param {*} postHoursPrior - An integer representing how many hours before the game starts (Default: 2 hours)
 * @returns {Boolean}
 */
export function IsPostTime(gameTime, postHoursPrior = 2) {
    if (!(typeof gameTime === 'string')) throw new Error(`Parameters must be of type [String]`)
    const diff = diffHours(new Date(), new Date(gameTime))
    return diff === (IsDaylightSavings() ? postHoursPrior + 1 : postHoursPrior) // Review this offset, possibly wrong
}

/**
 * Returns a cron schedule using a Date object
 * @param {Date} date - A Date Object
 * @returns {String} - Cron schedule
 */
export async function Date2Cron(date = new Date()) {
    const minute = date.getMinutes()
    const hour = date.getHours()
    const dayOfMonth = date.getDate()
    const month = date.getMonth() + 1
    const dayOfWeek = date.getDay()
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
}