import { GameMediaInfo } from '../../../src/nba/GameMedia.js';
import { default as data } from './game.data.json' assert { type: 'json' };

// GameDayInfo()
describe('Game Day Data Testing', () => {
  test('Throws a type error', async () => {
    await expect(GameMediaInfo()).rejects.toThrow(TypeError);
  });
});
