import { default as parameters } from "../meta/parameters.json" assert { type: "json" }
import { GameData } from "../src/nba/GameData.js"
import { Media } from "../src/nba/Media.js"
import { Body, Post, Title } from "../src/reddit/submission.js"
import { Date2Cron, IsPostTime } from "../src/helpers/time.js"
import { CronJob } from "cron";
import dotenv from 'dotenv'

(async () => {
    dotenv.config()
    const { subreddit, teamName, flairId } = parameters
    try {
        const gameData = await GameData(teamName)
        const times = {
            htm: gameData.htm,
            vtm: gameData.vtm,
            etm: gameData.etm
        }
        const gameTime = (gameData.ac === teamCity) ? new Date(times.htm) : newData(times.vtm)
        const isTimeToPost = IsPostTime(times.etm)
        const md = await Media(gameData.bd)
        const away = {
            name: gameData.v.tn,
            record: gameData.v.re,
            city: gameData.v.tc,
            media: md.away
        }
        const home = {
            name: gameData.h.tn,
            record: gameData.h.re,
            city: gameData.h.tc,
            arena_name: gameData.ac,
            arena_city: gameData.an,
            arena_state: gameData.as,
            media: md.home
        }
        const cron = Date2Cron(new Date(gameTime))
            new CronJob(cron, async () => {
            const Sub = subreddit
            const Flair = flairId
            const matchup = `${away.name} (${away.record}) @ ${home.name} (${home.record})`
            const Title = Title(matchup, gameData.stt)
            const Body = Body(home, away)
            await Post(Sub, Title, Body, Flair)
        }, null, true, 'America/Phoenix')
        } catch (err) {
        console.error(err.message)
    }
})()