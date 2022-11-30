import { default as parameters } from "../../meta/parameters.json" assert { type: "json" }
const full_schedule = "https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2022/league/00_full_schedule_week.json"

/**
 * Retrieves NBA Game Data of the next scheduled game for the specified team name (e.g. "Suns")
 * More info here: https://github.com/mtthai/nba-api-client/blob/master/data/endpoints.json
 * @param {String} teamName - Name of an NBA team
 * @returns {Object}
 */
export async function GameData(teamName) {
    if ((typeof teamName !== 'string') || (teamName === undefined || null)) throw new Error(`'${teamName}' is not of type String.`)
    const date = {
        now: new Date(),
        month: new Date().toLocaleString("en-US", { month: "long" }),
    }
    const response = (await fetch(full_schedule)).json()
    const gameData = (await response)
    const team_games = (((gameData.lscd).filter((months) =>
        months.mscd.mon === date.month)[0]).mscd.g).filter((game) =>
            (game.v.tn).toLowerCase() === teamName.toLowerCase() ||
            game.h.tn.toLowerCase() === teamName.toLowerCase())
    return team_games.find((game) => date.now < new Date(game.etm))
}