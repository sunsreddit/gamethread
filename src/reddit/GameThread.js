import { GameMediaInfo } from '../nba/GameMedia.js';
import { ConvertTimeZoneToTitleFriendly, SubmitPost } from './Submission.js';

/**
 * Creates and submits a Reddit post
 * @param {object} data - Game data object
 * @param {string} flairId - Sub-Reddit flair ID
 * @param {string} subreddit - Subreddit name
 */
export async function GameThread(data, flairId, subReddit) {
  const mediaData = await GameMediaInfo(data.bd);
  const away = {
    name: data.v.tn,
    record: data.v.re,
    city: data.v.tc,
    media: mediaData.away,
  };
  const home = {
    name: data.h.tn,
    record: data.h.re,
    city: data.h.tc,
    arena_name: data.an,
    arena_city: data.ac,
    arena_state: data.as,
    media: mediaData.home,
  };
  const header = `|   |   |\n|:--|:--|`;
  const matchup = `${away.name} (${away.record}) @ ${home.name} (${home.record})`;
  const time = ConvertTimeZoneToTitleFriendly(data.etm, process.env.TZ);
  const title = `[GAME THREAD]: ${matchup} (${time})`;
  const arenaInfo = `|**Arena**|${home.arena_city}, ${home.arena_state} - ${home.arena_name}|`;
  const tvHome = `|**TV (Home)**|[${home.media.tv.name}](${home.media.tv.url})|`;
  const tvAway = `|**TV (Away)**|[${away.media.tv.name}](${away.media.tv.url})|`;
  const radioHome = `|**Radio (Home)**|[${home.media.radio.name}](${home.media.radio.url})|`;
  const radioAway = `|**Radio (Away)**|[${away.media.radio.name}](${away.media.radio.url})|`;
  const pirateIt = `|**Radio (Pirate)**|[Yarrr](https://gprivate.com/620jy)|`;
  const body = `${header}\n${arenaInfo}\n${tvHome}\n${tvAway}\n${radioHome}\n${radioAway}\n${pirateIt}`;
  console.log(
    `Body is:\n${body}\n
         Sub is: ${subReddit}\n
         Title is :${title}\n
         FlairId is: ${flairId}
        `
  );
  return await SubmitPost(subReddit, title, body, flairId);
}
