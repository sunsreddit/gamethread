import { dateToCron } from './_helpers.mjs';
/**
 * Returns the latest NBA game information of the specified team's identification number
 * @param {string} teamId ID of the basketball franchise
 * @param {Date} [ offsetDate=new Date()] Offset to a date at which the search should begin
 * @returns {object} Latest game day information from NBA API endpoint(s)
 */
export async function latestGameInfo(teamId, offsetDate) {
  const _endpointUrl = 'https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2023/league/00_full_schedule_week.json';
  const _gameDate = offsetDate ? offsetDate : new Date();
  const _month = _gameDate.toLocaleString('en-US', { month: 'long' });
  const _data = await fetch(_endpointUrl);
  const _games = (await _data.json()).lscd.find((mon) => mon.mscd.mon === _month);
  const _latestGame = _games.mscd.g.find(
    (_game) =>
      _gameDate.getDate() <= new Date(_game.etm).getDate() &&
      (_game.v.tid === teamId ||
        _game.h.tid === teamId)
  );
  return _latestGame;
}

/**
 * Returns a string cron schedule of the next scheduled game 
 * @param {*} teamId ID of the basketball franchise
 * @param {*} timeZone Time zone locale
 * @returns {string} Cron schedule
 */
export async function nextGameTimeCron(teamId, timeZone) {
  timeZone ? timeZone : 'America/New_York';
  // Adds 16 hours to current time ensuring next game time is selected
  const date = new Date(+new Date() + 60000*960); 
  const latest = await latestGameInfo(teamId, date);
  const latestGameTime = new Date(new Date(latest.etm).toLocaleString('en-US', timeZone));
  return dateToCron(latestGameTime);
}