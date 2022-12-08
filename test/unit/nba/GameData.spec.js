import { GameData, TeamGames } from "../../../src/nba/GameData.js"
import { default as nbaGameData } from "./api.data.json" assert { type: "json" }
import { default as teamGameData } from "./game.data.json" assert { type: "json" }

// GameData()
describe("Game Data Testing", () => {
    test("Throws an invalid parameters error", () => {
        expect(async () => {
            await GameData(1)
        }).toThrowError
    })
})

// TeamGames()
describe("Team Game Data Testing", () => {

    test("Mock fetch", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({size: 1})
            })
        )
        const teamName = "Bulls"
        const result = await TeamGames(teamName)
        expect(result).toEqual(1)

    })

    test("Throws an invalid parameters error", () => {
        expect(async () => {
            await TeamGames(1)
        }).toThrowError
    })
})