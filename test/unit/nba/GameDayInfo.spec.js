import { GameDayInfo } from '../../../src/nba/GameDayInfo.js';
import { default as data } from '../nba/game.data.json' assert { type: 'json' };

// GameDayInfo()
describe('Game Day Data Testing', () => {
  test('Throws a type error', async () => {
    await expect(GameDayInfo()).rejects.toThrow(TypeError);
  });
});
