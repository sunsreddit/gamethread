import { default as parameters } from "../../meta/dev-parameters.json" assert { type: "json" }
import MediaData from "../nba/GameDayInfo.js"
import { Body, SubmitPost, Title } from "./SubmitPost.js"

export async function RedditPost(data) {
    const { flairId, subreddit } = parameters
    const mediaData = await MediaData(data.bd)
    const away = {
        name: data.v.tn,
        record: data.v.re,
        city: data.v.tc,
        media: mediaData.away
    }
    const home = {
        name: data.h.tn,
        record: data.h.re,
        city: data.h.tc,
        arena_name: data.an,
        arena_city: data.ac,
        arena_state: data.as,
        media: mediaData.home
    }
    const matchup = `${away.name} (${away.record}) @ ${home.name} (${home.record})`
    const title = Title(matchup, data.stt)
    const body = Body(home, away)
    console.log(
        `Body is:\n${body}\n
         Sub is: ${subreddit}\n
         Title is :${title}\n
         FlairId is: ${flairId}
        `
    )
    return await SubmitPost(subreddit, title, body, flairId)
}