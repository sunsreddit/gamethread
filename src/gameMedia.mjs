/**
 * Returns game day media information
 * @param {Object} gameInfo - Game day information object
 * @returns {Object} Game day media information
 */
export async function gameMediaInfo(gameInfo) {
  if (typeof gameInfo !== 'object')
    throw new TypeError(`GameDayInfo: Parameter is not of type 'Object'`);
  
  // Gets scope and type based media 
  function _getMedia(scope, type) {
    return gameInfo.b.find((obj) => obj.scope === scope && obj.type === type);
  }
  
  // Default media URLs
  const _defaultMediaUrls = {
    ddg: 'https://duckduckgo.com/?q=%5C+',
    nba: 'https://www.nba.com/watch/league-pass-stream',
  };
  
  // Radio media info 
  const radioInfo = (team) => {
    const radio = _getMedia(team, 'radio');
    return {
      name: radio?.disp || 'N/A',
      url: radio?.url || _defaultMediaUrls.ddg + encodeURIComponent((radio?.disp) || '')
    };
  };

  // Television media info
  const tvInfo = (team) => {
    const tv = _getMedia(team, 'tv');
    return {
      name: tv?.disp || 'NBA League Pass',
      url: tv?.url || (tv?.disp ? _defaultMediaUrls.ddg + encodeURIComponent(tv.disp) : '') || '' 
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
    natl: {
      radio: radioInfo('natl')
    },
    other: {
      livestream: {
        name: 'LMGTFY',
        url: 'https://gprivate.com/620jy'
      }
    },
  };
}
