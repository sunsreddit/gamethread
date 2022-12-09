import { default as parameters } from "../meta/dev-parameters.json" assert { type: "json" }
import { LatestGame } from "../src/nba/LatestGame.js"
import { RedditPost } from "../src/reddit/RedditPost.js"
import dotenv from 'dotenv'

(async () => {
    dotenv.config()
    const { teamName } = parameters
    try {
        const latestGame = await LatestGame(teamName)
        await RedditPost(latestGame)
        return latestGame
    } catch (err) {
        console.error(err.message)
    }
})()