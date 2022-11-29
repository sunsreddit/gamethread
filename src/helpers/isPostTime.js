import { convertETtoMT } from "./convertETtoMT.js"

/**
 * Checks the time and confirms if it's within the two-hour window to Submit a Game Thread Post
 * @param {string} game 
 * @returns {boolean} 
 */
export async function isPostTime(time, timeZone = 'America/New_York') {
    try {

    } catch (err) {
        console.error(err.message)
    }

    const now = new Date().toLocaleString("en-US", {
        hour12: true,
        timeStyle: "short",
        timeZone: timeZone
    }).split(":")[0]
    const gameTime = (await convertETtoMT(time)).split(":")[0]
    return gameTime <= now
}
((async () => {
}))()
