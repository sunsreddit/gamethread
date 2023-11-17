import { default as parameters } from '../meta/parameters.json' assert { type: 'json' };
import { LatestGame } from '../src/nba/LatestGame.js';
import { RedditPost } from '../src/reddit/RedditPost.js';
import dotenv from 'dotenv';

(async () => {
  dotenv.config();
  const {
    api: { nba },
    flairId,
    subreddit,
    teamName,
  } = parameters;
  try {
    const latestGame = await LatestGame(teamName, nba);
    await RedditPost(latestGame, flairId, subreddit);
    return latestGame;
  } catch (err) {
    console.error(err.message);
  }
})();
