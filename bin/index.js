import { game } from "../src/nba/game.js"
import { title } from "../src/reddit/title.js"
import { body } from "../src/reddit/body.js"
import { post } from "../src/reddit/post.js"
import { convertETtoMT } from "../src/helpers/convertETtoMT.cjs"
import dotenv from 'dotenv'
import { default as parameters } from "../meta/parameters.json" assert { type: "json" }

(async () => {
    dotenv.config()
    const { subreddit, team, flairId } = parameters
    try {
        const gd = await game(team)
        const time = gd.stt
        const away = {
            name: gd.v.tn,
            record: gd.v.re,
            city: gd.v.tc
        }
        const home = {
            name: gd.h.tn,
            record: gd.h.re,
            city: gd.h.tc,
            arena_name: gd.ac,
            arena_city: gd.an,
            arena_state: gd.as
        }
        const matchup = `${away.name} (${away.record}) @ ${home.name} (${home.record})`
        const Sub = subreddit
        const Flair = flairId
        const mt_time = convertETtoMT(time)
        const Title = title(matchup, mt_time)
        const Body = body(home, away)
        await post(Sub, Title, Body, Flair)
    } catch (err) {
        console.error(err.message)
    }
})()