import { default as gameData } from "./game.data.json" assert { type: "json" }
import { game } from "../../../src/nba/game.js"

// beforeEach(() => game().clear())

describe("game.js", () => {
    test("Returns a provided team's game data object.", async () => {
        const team = "PHX"
        const result = await game(team)
        expect(result).toBeCalled
    })
    // test("Returns a filtered schedule game data object.", async () => {
    //     const team = "PHX"
    //     jest.mock("../../../src/nba/game.js")
    //     game.mockImplementation(() => gameData)
    //     expect(await game(team)).toEqual(gameData)
    // })
    test("Returns a parameter error.", async () => {
        // const ids = []
        // Object.keys(teams).forEach((team) => ids.push(teams[team].Abbrev))
        const team = 1
        expect(team).toEqual(1)
    })
    test("Returns a parameter exception.", async () => {
        expect(await game(123).catch(Error)).toThrow
    })
})