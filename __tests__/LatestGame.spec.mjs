import { LatestGame } from '../../../src/nba/LatestGame.mjs';
import { default as api } from './api.data.json' assert { type: 'json' };
import { default as game } from './game.data.json' assert { type: 'json' };

// LatestGame()
describe('Lastest Game Testing', () => {
  test('Returns latest scheduled game', async () => {
    const apiUrl = 'https://dummywebsite.tld/api=12345&key=abcdefg'
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(api) })
    );
    const teamName = 'Bulls';
    const gameDate = new Date('2022-10-04');
    const result = await LatestGame(teamName, apiUrl, gameDate);
    expect(result).toEqual(game);
  });
  test('Throws a type error', async () => {
    await expect(LatestGame()).rejects.toThrow(TypeError);
  });
});
