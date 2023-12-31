/**
 * Returns the latest NBA game data of the specified team name and date (optional)
 * @param {string} teamName Name of the basketball franchise (e.g. "Bulls")
 * @returns {object}
 */
export async function LatestGame(teamName) {
  if (typeof teamName !== 'string')
    throw new TypeError(
      `Parameter LatestGame(teamName) is not of type 'String'`
    );
  const _endpointUrl = 'https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2023/league/00_full_schedule_week.json';
  const _gameDate = new Date();
  const _month = _gameDate.toLocaleString('en-US', { month: 'long' });
  const _data = await fetch(_endpointUrl);
  const _games = (await _data.json()).lscd.find((mon) => mon.mscd.mon === _month);
  const _latestGame = _games.mscd.g.find(
    (_game) =>
      _gameDate.getDate() <= new Date(_game.etm).getDate() &&
      (_game.v.tn.toLowerCase() === teamName.toLowerCase() ||
        _game.h.tn.toLowerCase() === teamName.toLowerCase())
  );
  return _latestGame;
}