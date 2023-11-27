import { encode } from 'url-encode-decode';

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
  const awayRadio = await _getMedia('away', 'radio');
  const homeRadio = await _getMedia('home', 'radio');
  const awayTV = await _getMedia('away', 'tv');
  const homeTV = await _getMedia('home', 'tv');
  const _defaultStreams = {
    ddg: 'https://duckduckgo.com/?q=%21ducky+%5C',
    nba: 'https://www.nba.com/watch/league-pass-stream',
  };
  return {
    away: {
      radio: {
        name: awayRadio.disp,
        url: awayRadio.url || `${_defaultStreams.ddg}${encode(awayRadio.disp)}`,
      },
      tv: {
        name: awayTV.disp,
        url: awayTV.url || _defaultStreams.nba,
      },
    },
    home: {
      radio: {
        name: homeRadio.disp,
        url: homeRadio.url || `${_defaultStreams.ddg}${encode(homeRadio.disp)}`,
      },
      tv: {
        name: homeTV.disp,
        url: homeTV.url || _defaultStreams.nba,
      },
    },
    misc: {
      livestream: 'https://gprivate.com/620jy',
    },
  };
}
