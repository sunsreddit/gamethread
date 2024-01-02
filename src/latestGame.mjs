/**
 * Returns the latest NBA game information of the specified team's identification number
 * @param {string} teamId ID of the basketball franchise
 * @returns {object} Latest game day information from NBA API endpoint(s)
 */
export async function latestGameInfo(teamId) {
  const _endpointUrl = 'https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2023/league/00_full_schedule_week.json';
  const _gameDate = new Date();
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