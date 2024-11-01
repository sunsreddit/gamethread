import 'dotenv/config';
import { CronJob } from 'cron';
import { GameThread } from '../src/modules/GameThread.mjs';
import { nextGameTimeCron } from '../src/services/latestGame.mjs';
const { default: config } = await import('../config/parameters.json', { assert: { type: 'json' }});
const { nba: { teamId }, cron: { timeZone } } = config[process.env._ENV_]

// Break handler
const handleExit = async () => {
  console.log('Exiting...');
  process.exit();
};

// Listen for the SIGINT signal (Ctrl+C)
process.on('SIGINT', handleExit);

// Initial Cron
let cronTime = await nextGameTimeCron(teamId, timeZone);
console.log(`Initializing Cron...\nInitial cronTime: ${cronTime}`);

// Scheduled CronJob
CronJob.from({
  cronTime,
  onTick: async function () {
    await GameThread(config);
    cronTime = await nextGameTimeCron(teamId, timeZone);
    console.log(`Cron iteration: ${new Date().toLocaleString('en-US', { timeZone })}`);
    console.log(`Updating cronTime to: ${cronTime}`);
  },
  runOnInit: false,
  start: process.env.NPM_CRON.toLowerCase() === 'on' ? true : false,
  timeZone,
});