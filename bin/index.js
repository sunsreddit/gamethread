import { default as parameters } from "../meta/parameters.json" assert { type: "json" }
import { GameData } from "../src/nba/GameData.js"
import { Media } from "../src/nba/Media.js"
import { Body, Post, Title } from "../src/reddit/submission.js"
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
        const gameTime = (gameData.tn === teamName) ? new Date(times.htm) : new Date(times.vtm)
        // const isTimeToPost = IsPostTime(times.etm)
        const mediaData = await Media(gameData.bd)
        const away = {
            name: gameData.v.tn,
            record: gameData.v.re,
            city: gameData.v.tc,
            media: mediaData.away
        }
        const home = {
            name: gameData.h.tn,
            record: gameData.h.re,
            city: gameData.h.tc,
            arena_name: gameData.an,
            arena_city: gameData.ac,
            arena_state: gameData.as,
            media: mediaData.home
        }
        const sub = subreddit
        const flair = flairId
        const matchup = `${away.name} (${away.record}) @ ${home.name} (${home.record})`
        const title = Title(matchup, gameData.stt)
        const body = await Body(home, away)
        await Post(sub, title, body, flair)
    } catch (err) {
        console.error(err.message)
    }
})()