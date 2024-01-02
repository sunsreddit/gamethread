
import { CronJob } from 'cron';
import { GameThread } from './index.mjs';
import { nextGameTimeCron } from '../src/latestGame.mjs';
const { default: { cron: { timeZone }, nba: { teamId }}} = await import('../config/parameters.json', { assert: { type: 'json' }});


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
    // await GameThread();
    cronTime = await nextGameTimeCron(teamId, timeZone);
    console.log(`Cron iteration: ${new Date().toLocaleString('en-US', { timeZone })}`);
    console.log(`Updating cronTime to: ${cronTime}`);
  },
  runOnInit: false,
  start: process.env.NPM_CRON.toLowerCase() === 'on' ? true : false,
  timeZone,
});