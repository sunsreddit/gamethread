import moment from 'moment-timezone';

/**
 * Returns a human-readable hour format of the starting game time
 * @param {*} gameTime 
 * @param {*} timeZone 
 * @returns Human-readable game time
 */
export function convertTimeToReadable(gameTime, timeZone) {
  return moment
    .tz(gameTime, 'America/New_York')
    .tz(timeZone, false)
    .format('hh:mm A z');
}

/**
 * Returns a cron schedule using a Date object
 * @param {string} [date] - A Date string
 * @returns {string} - Cron schedule
 */
export function dateToCron(date) {
  const minute = date.getMinutes(),
    hour = date.getHours(),
    dayOfMonth = date.getDate(),
    month = date.getMonth() + 1,
    dayOfWeek = date.getDay();
  return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

/**
 * Returns the epoch date of [N] minutes prior to start of game
 * @param {Date} date Date instance to offset (add/subtract) minutes
 * @param {number} amount Number of minutes to offset
 * @returns {Date} Off-set game day epoch date
 */
export function submitTime(gameTime, offset) {
  return moment(gameTime).subtract(offset, 'minutes').toDate();
}

/**
 * Returns the pertinent game day information about the specified team
 * @param {object} teamData Team data object returned by NBA API
 * @param {object} media Media data object parsed return by internal API
 * @returns Latest NBA team game day information 
 */
export function getTeamInfo(teamData, media) {
  return {
    name: teamData.tn,
    record: teamData.re,
    city: teamData.tc,
    media,
  };
}

/**
 * Returns a game day media table row
 * @param {string} label - Label of the subsequent media
 * @param {object} media - Hyperlink name & url information
 * @returns Formatted table row
 */
export function createMediaRow(label, emoji, media) {
  const spacer = ' ';
  if (typeof media === 'string') return `| ${label} | ${spacer} | ${emoji} | ${media} |`;
  return `| ${label} | ${spacer} | ${emoji} | [${media.name}](${media.url}) |`;
}