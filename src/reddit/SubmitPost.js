import snoowrap from "snoowrap"

export function SubmitPost(sub, title, text, flairId) {
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
            flair_template_id: flairId ? flairId : ""
        })
        .sticky()
        .distinguish()
        .setSuggestedSort('new')
}

export const Title = (matchup, time) => { return `[GAME THREAD]: ${matchup} (${time})` }

const header = `|   |   |\n|:--|:--|`

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
    const ad = _arena(home)
    const md = _media(home.media, away.media)
    return `${header}\n${ad}\n${md}`
}