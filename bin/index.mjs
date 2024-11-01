import esMain from 'es-main';
import { GameThread } from '../src/modules/GameThread.mjs';
const { default: config } = await import('../config/parameters.json', { assert: { type: 'json' }});
if (esMain(import.meta)) await GameThread(config);