import { default as parameters } from "../meta/parameters.json" assert { type: "json" }
import { TeamGames } from "../src/nba/GameData.js"
import { RedditPost } from "../src/reddit/RedditPost.js"
import { IsPostTime, PostCron, PostTime } from "../src/reddit/PostTime.js"
import { Cron } from "croner";
import dotenv from 'dotenv'

(async () => {
    dotenv.config()
    const { teamName, timeZone } = parameters
    try {
        const teamGames = await TeamGames(teamName)
        for (const game of teamGames) {
            const gameTime = new Date(game.etm)
            const isPostTime = IsPostTime(gameTime)
            if (isPostTime) {
                console.log(`Games in queue... ${game.gcode}...`)
                const postTime = PostTime(gameTime)
                const cron = PostCron(postTime)
                // TO-DO: Research Cron's `fnParameters` & use to kick-off clean-up job & Post Game Thread submission
                return Cron(cron, { timezone: timeZone }, async () => {
                    const post = await RedditPost(game)
                    console.log(post)
                })
            } else console.log(`skipping ${game.gcode}`)
        }
    } catch (err) {
        console.error(err.message)
    }
})()