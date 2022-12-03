import { default as parameters } from "../meta/parameters.json" assert { type: "json" }
import { Date2Cron, IsDaylightSavings, SubtractMinutes } from "../src/helpers/time.js"
import { TeamGames } from "../src/nba/GameData.js"
import { RedditPost } from "../src/reddit/RedditPost.js"
import { Cron } from "croner";
import dotenv from 'dotenv'

(async () => {
    dotenv.config()
    const { teamName, timeZone } = parameters
    try {
        const teamGames = await TeamGames(teamName)
        for (const game of teamGames) {
            const gameTime = new Date(game.etm)
            const postOffset = IsDaylightSavings(gameTime) ? 180 : 120
            const postTime = SubtractMinutes(gameTime, postOffset)
            if (Date.now() <= postTime) {
                console.log(`Games in queue... ${game.gcode}...`)
                // const cron = Date2Cron(postTime)
                /* TO-DO: 
                    Review Cron fnParameters and research how to 
                     use to kick-off clean-up & Post Game Thread 
                */
                // Cron(cron, { timezone: timeZone }, async () => { 
                    const post = await RedditPost(game)
                    return post 
                // })
            } else console.log(`skipping ${game.gcode}`)
        }
    } catch (err) {
        console.error(err.message)
    }
})()