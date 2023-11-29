/**
 * Returns the latest NBA game data of the specified team name and date (optional)
 * @param {string} teamName Name of the basketball franchise (e.g. "Bulls")
 * @param {string} endpointUrl URL to fetch API data
 * @param {Date} [gameDate] Time closest to the next upcoming game
 * @returns {object}
 */
export async function LatestGame(teamName, endpointUrl, gameDate = new Date()) {
  if (typeof teamName !== 'string')
    throw new TypeError(
      `Parameter LatestGame(teamName) is not of type 'String'`
    );
  const month = gameDate.toLocaleString('en-US', { month: 'long' });
  const data = await fetch(endpointUrl);
  const games = (await data.json()).lscd.find((mon) => mon.mscd.mon === month);
  const latestGame = games.mscd.g.find(
    (game) =>
      gameDate.getDate() <= new Date(game.etm).getDate() &&
      (game.v.tn.toLowerCase() === teamName.toLowerCase() ||
        game.h.tn.toLowerCase() === teamName.toLowerCase())
  );
  return latestGame;
}
