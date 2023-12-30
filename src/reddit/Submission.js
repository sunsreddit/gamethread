import moment from 'moment-timezone';
import snoowrap from 'snoowrap';

export function ConvertTimeZoneToTitleFriendly(gameTime, timeZone) {
  return moment.tz(gameTime,'America/New_York').tz(timeZone,false).format('hh:mm A z');
}

/**
 * Returns a cron schedule using a Date object
 * @param {string} [date] - A Date string
 * @returns {string} - Cron schedule
 */
export function DateToCron(date) {
  const minute = date.getMinutes(),
    hour = date.getHours(),
    dayOfMonth = date.getDate(),
    month = date.getMonth() + 1,
    dayOfWeek = date.getDay();
  return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

export function SubmitPost(subReddit, title, body, flairId) {
  return new snoowrap({
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  })
    .getSubreddit(subReddit)
    .submitSelfpost({
      text: body,
      title,
    })
    .selectFlair({
      flair_template_id: flairId ? flairId : '',
    })
    .sticky()
    .distinguish()
    .setSuggestedSort('new');
}

/**
 * Returns the epoch date of [N] minutes prior to start of game
 * @param {Date} date Date instance to offset (add/subtract) minutes
 * @param {number} amount Number of minutes to offset
 * @returns {Date}
 */
export function SubmitTime(gameTime, offset) {
  return moment(gameTime).subtract(offset, 'minutes').toDate();
}