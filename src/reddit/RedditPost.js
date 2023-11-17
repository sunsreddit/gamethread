import { ConvertToTimeZone } from '../helpers/time.js';
import { GameDayInfo } from '../nba/GameDayInfo.js';
import { Body, SubmitPost, Title } from './SubmitPost.js';

/**
 * Creates and submits a Reddit post
 * @param {object} data - Game data object
 * @param {string} flairId - Sub-Reddit flair ID
 * @param {string} subreddit - Subreddit name
 */
export async function RedditPost(data, flairId, subReddit) {
  const mediaData = await GameDayInfo(data.bd);
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
  const matchup = `${away.name} (${away.record}) @ ${home.name} (${home.record})`;
  const time = ConvertToTimeZone(data.etm);
  const title = Title(matchup, time);
  const body = Body(home, away);
  console.log(
    `Body is:\n${body}\n
         Sub is: ${subReddit}\n
         Title is :${title}\n
         FlairId is: ${flairId}
        `
  );
  return await SubmitPost(subReddit, title, body, flairId);
}
