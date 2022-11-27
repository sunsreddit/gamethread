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

function _arena(arena_city, arena_name) {
    return `|**Arena**|${arena_city} ${arena_name}|`
}

function _media(home, away) {
    return `|**TV (Home)**|[${home.tv.name}](${home.tv.url})|
|**TV (Away)**|[${away.tv.name}](${away.tv.url})|
|**Radio (Home)**|[${home.radio.name}](${home.radio.url})|
|**Radio (Away)**|[${away.radio.name}](${away.radio.url})|
|**Radio (Pirate)**|[Yarrr](https://gprivate.com/620jy)|`
}

export function body(home, away) {
    // const _score = _boxScore(home, away)
    const ad = _arena(home.arena_city, home.arena_name)
    const md = _media(home.media, away.media)
    return `|   |   |
|:--|:--|
${ad}
${md}`
}