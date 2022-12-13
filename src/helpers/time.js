/**
 * Returns a cron schedule using a Date object
 * @param {Date} [date] - A Date Object
 * @returns {string} - Cron schedule
 */
export function Date2Cron(date = new Date()) {
  if (!(date instanceof Date)) throw new TypeError(`Date2Cron: Parameter is not of type 'Date'`)
  const minute = date.getMinutes(),
    hour = date.getHours(),
    dayOfMonth = date.getDate(),
    month = date.getMonth() + 1,
    dayOfWeek = date.getDay()
  return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
}

/**
 * Verifies if it is currently Daylight Savings Time
 * @param {*} [date] - A Date Object
 * @returns {Boolean}
 */
export function IsDaylightSavings(date = new Date()) {
  const year = date.getFullYear()
  const dst_start = new Date(year, 2, 14)
  const dst_end = new Date(year, 10, 7)
  dst_start.setDate(14 - dst_start.getDay()) // adjust date to 2nd Sunday
  dst_end.setDate(7 - dst_end.getDay()) // adjust date to the 1st Sunday
  return (date >= dst_start && date < dst_end)
}

/**
 * Subtracts specified time period in minutes from given `date` instance.
 * 
 * @param {Date} date Date instance to subtract minutes
 * @param {number} amount Number of minutes to subtract 
 */
export function SubtractMinutes(date, amount) {
  if (!(date instanceof Date)) throw new TypeError(`SubtractMinutes: Parameter is not of type 'Date'`)
  const newDate = new Date(date);
  return new Date(newDate.setMinutes(newDate.getMinutes() - amount))
}