import { GameMediaInfo } from '../../../src/nba/GameMedia.mjs';

// GameDayInfo()
describe('Game Day Data Testing', () => {
  test('Throws a type error', async () => {
    await expect(GameMediaInfo()).rejects.toThrow(TypeError);
  });
});
