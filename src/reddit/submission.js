import snoowrap from "snoowrap"

export async function Post(sub, title, text, flairId) {
    return new snoowrap({
        userAgent: process.env.USER_AGENT,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }).getSubreddit(sub).submitSelfpost({
        text,
        title
    })
        .selectFlair({
            flair_template_id: flair ? flair : ""
        })
        .sticky()
        .distinguish()
        .setSuggestedSort('new')
}

export const Title = (matchup, time) => {
    return `[GAME THREAD]: ${matchup} (${time})`
}

const hScore = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    total() {
        return this[1] + this[2] + this[3] + this[4]
    }
}
const aScore = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    total() {
        return this[1] + this[2] + this[3] + this[4]
    }
}

const _boxScore = (home, away) => {
    return `
|            |1st         |2nd         |3rd         |4th         |Final            |
|:--         |:--         |:--         |:--         |:--         |:--              |
|${home.name}|${hScore[1]}|${hScore[2]}|${hScore[3]}|${hScore[4]}|${hScore.total()}|
|${away.name}|${aScore[1]}|${aScore[2]}|${aScore[3]}|${aScore[4]}|${aScore.total()}|
`
}

function _arena(home) {
    return `|**Arena**|${home.arena_city}, ${home.arena_state} - ${home.arena_name}|`
}

function _media(home, away) {
    return `|**TV (Home)**|[${home.tv.name}](${home.tv.url})|
|**TV (Away)**|[${away.tv.name}](${away.tv.url})|
|**Radio (Home)**|[${home.radio.name}](${home.radio.url})|
|**Radio (Away)**|[${away.radio.name}](${away.radio.url})|
|**Radio (Pirate)**|[Yarrr](https://gprivate.com/620jy)|`
}

export function Body(home, away) {
    // const _score = _boxScore(home, away)
    const ad = _arena(home)
    const md = _media(home.media, away.media)
    return `|   |   |
|:--|:--|
${ad}
${md}`
}