import { game } from "../src/nba/game.js"
import { media } from "../src/nba/media.js"
import { title } from "../src/reddit/title.js"
import { body } from "../src/reddit/body.js"
import { post } from "../src/reddit/post.js"
import { convertETtoMT } from "../src/helpers/convertETtoMT.js"
import dotenv from 'dotenv'
import { default as parameters } from "../meta/parameters.json" assert { type: "json" }
import { CronJob } from "cron";
import { isPostTime } from "../src/helpers/isPostTime.js"

// new CronJob("* 0 * * * *", () => {}, null, true, 'America/New_York')
(async () => {
    dotenv.config()
    const { subreddit, team, flairId } = parameters
    try {
        const gd = await game(team)
        const md = await media(gd.bd)
        const gameTime = await convertETtoMT(gd.stt)
        const isTimeToPost = await isPostTime(gameTime, process.env.TZ)
        const away = {
            name: gd.v.tn,
            record: gd.v.re,
            city: gd.v.tc,
            media: md.away
        }
        const home = {
            name: gd.h.tn,
            record: gd.h.re,
            city: gd.h.tc,
            arena_name: gd.ac,
            arena_city: gd.an,
            arena_state: gd.as,
            media: md.home
        }
        const matchup = `${away.name} (${away.record}) @ ${home.name} (${home.record})`
        const Sub = subreddit
        const Flair = flairId
        const Title = title(matchup, gameTime)
        const Body = body(home, away)
        await post(Sub, Title, Body, Flair)
    } catch (err) {
        console.error(err.message)
    }
})()