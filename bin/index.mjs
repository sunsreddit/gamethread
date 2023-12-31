import { default as parameters } from '../config/parameters.json' assert { type: 'json' };
import { LatestGame } from '../src/nba/LatestGame.mjs';
import { GameThread } from '../src/reddit/GameThread.mjs';
import esMain from 'es-main';
import 'dotenv/config';

export async function Thread() { 
  const { reddit: { flairId, subreddit, teamName } } = parameters;
  const latestGame = await LatestGame(teamName);
  await GameThread(latestGame, flairId, subreddit); 
}

if (esMain(import.meta)) await Thread();