import { default as parameters } from "../../meta/parameters.json" assert { type: "json" }

/**
 * Returns the latest NBA game data of the specified team name and date (optional)
 * @param {string} teamName Name of the basketball franchise (e.g. "Bulls")
 * @param {Date} [gameDate] Time closest to the next upcoming game 
 * @returns {object}
 */
export async function LatestGame(teamName, gameDate = new Date()) {
    if (typeof teamName !== "string") throw new TypeError(`Parameter LatestGame(teamName) is not of type 'String'`)
    const month = gameDate.toLocaleString("en-US", { month: "long" })
    const data = await fetch(parameters.api.nba)
    const games = (await data.json()).lscd.find((mon) => mon.mscd.mon === month)
    const latestGame = games.mscd.g.find((game) =>
    ((gameDate.getDate() <= (new Date(game.etm)).getDate()) &&
        (game.v.tn.toLowerCase() === teamName.toLowerCase() ||
            game.h.tn.toLowerCase() === teamName.toLowerCase()))
    )
    return latestGame
}