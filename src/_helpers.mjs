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

/**
 * Returns a human-readable hour format of the starting game time
 * @param {string | Date} gameTime - The game time (string or Date object).
 * @param {string} timeZone - The target time zone.
 * @returns {string} Human-readable game time.
 */
export function convertTimeToReadable(gameTime, timeZone) {
  const date = typeof gameTime === 'string' ? new Date(gameTime) : gameTime;
  
  // Adjust to the target time zone
  const targetTime = new Date(date.toLocaleString('en-US', { timeZone }));

  // Format the time
  const hours = targetTime.getHours();
  const minutes = targetTime.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Pad minutes with leading zero if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Assemble the formatted time
  return `${formattedHours}:${formattedMinutes} ${period} ${timeZone}`;
}

/**
 * Converts a date to a cron expression.
 * @param {Date} date - The date to convert.
 * @returns {string} The cron expression.
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