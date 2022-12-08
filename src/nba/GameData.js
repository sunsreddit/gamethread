import { default as parameters } from "../../meta/parameters.json" assert { type: "json" }

/**
 * Retrieves NBA Game Data of the next scheduled game for the specified team name (e.g. "Suns")
 * More info here: https://github.com/mtthai/nba-api-client/blob/master/data/endpoints.json
 * @param {String} teamName - Name of an NBA team
 * @returns {Object}
 */
export async function GameData(teamName) {
    if (typeof teamName !== "string") throw new Error(`Parameter GameData(teamName) is not of type 'String'`) 
    const teamGames = await TeamGames(teamName) 
    return teamGames.find((game) => Date.now() < new Date(game.etm))
}

/**
 * Retrieves all NBA Game Data for the specified team name (e.g. "Suns")
 * @param {String} teamName - Name of an NBA team
 * @returns {Object}
 */
export async function TeamGames(teamName) {
    if (typeof teamName !== "string") throw new Error(`Parameter TeamGames(teamName) is not of type 'String'`) 
    const month = new Date().toLocaleString("en-US", { month: "long" })
    const response = await fetch(parameters.api.nba)
    const gameData = await response.json()
    return (((gameData.lscd).filter((months) =>
        months.mscd.mon === month)[0]).mscd.g).filter((game) =>
            (game.v.tn).toLowerCase() === teamName.toLowerCase() ||
            game.h.tn.toLowerCase() === teamName.toLowerCase())
}