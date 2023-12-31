/**
 * Returns game day media information
 * @param {Object} gameInfo - Game day information object
 * @returns {Object}
 */
export async function GameMediaInfo(gameInfo) {
  if (typeof gameInfo !== 'object')
    throw new TypeError(`GameDayInfo: Parameter is not of type 'Object'`);
  
  async function _getMedia(scope, type) {
    return gameInfo.b.filter(
      (obj) => obj.scope === scope && obj.type === type
    )[0];
  }

  const _defaultStreams = {
    ddg: 'https://duckduckgo.com/?q=%21ducky+%5C',
    nba: 'https://www.nba.com/watch/league-pass-stream',
  };
  
  const radioInfo = (team) => {
    const radio = _getMedia(team, 'radio');
    return {
      name: radio?.disp || 'N/A',
      url: radio?.url || encodeURIComponent(_defaultStreams.ddg + radio?.disp || '')
    };
  };

  const tvInfo = (team) => {
    const tv = _getMedia(team, 'tv');
    return {
      name: tv?.disp || 'NBA League Pass',
      url: tv?.url ||(tv?.disp ? encodeURIComponent(_defaultStreams.ddg + tv.disp) : _defaultStreams.nba),
    };
  };

  return {
    away: {
      radio: radioInfo('away'),
      tv: tvInfo('away'),
    },
    home: {
      radio: radioInfo('home'),
      tv: tvInfo('home'),
    },
    misc: {
      livestream: 'https://gprivate.com/620jy',
    },
  };
}