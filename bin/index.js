import { default as parameters } from '../config/parameters.json' assert { type: 'json' };
import { LatestGame } from '../src/nba/LatestGame.js';
import { GameThread } from '../src/reddit/GameThread.js';
import { DateToCron, SubmitTime } from '../src/reddit/Submission.js';
import { scheduleJob } from 'node-schedule';
import 'dotenv/config';

(async () => {
  const {
    nba: { endpoint },
    reddit: { flairId, subreddit, teamName },
  } = parameters;
  try {
    const latestGame = await LatestGame(teamName, endpoint);
    const submitTime = SubmitTime(latestGame.etm, 60);
    const cron = DateToCron(submitTime);

    // Schedule the job
    // scheduleJob(cron, async () => {
      try {
        await GameThread(latestGame, flairId, subreddit);
      } catch (err) {
        console.error(err.message);
      }
    // });
  } catch (err) {
    console.error(err.message);
  }
})();
