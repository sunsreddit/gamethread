import { IsDaylightSavings, SubtractMinutes } from "../helpers/time.js"
import { Date2Cron } from "../helpers/time.js"

/**
 * Determines if it is time to post a game thread
 * @param {Date} gameTime 
 * @returns {boolean}
 */
export function IsPostTime(gameTime) {
    if (!(gameTime instanceof Date)) throw new TypeError(`IsPostTime: Parameter is not of type 'Date'`)
    const postTime = PostTime(gameTime)
    return new Date().getTime() <= postTime.getTime()
}

/**
 * Returns a cron string of the scheduled post time
 * @param {Date} gameTime 
 * @returns {string}
 */
 export function PostCron(gameTime) {
    if (!(gameTime instanceof Date)) throw new console.error(`PostCron: Parameter is not of type 'Date'`);
    const cronTime = PostTime(gameTime)
    return Date2Cron(cronTime)
}

/**
 * Returns the epoch date of two hours prior to start of game
 * @param {Date} gameTime 
 * @returns {Date}
 */
export function PostTime(gameTime) {
    if (!(gameTime instanceof Date)) throw new TypeError(`PostTime: Parameter is not of type 'Date'`);
    // Offset to 2 or 3 hrs., Daylight Savings permitted
    const postOffset = IsDaylightSavings(gameTime) ? 180 : 120
    return SubtractMinutes(gameTime, postOffset)
}