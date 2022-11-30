const _default = {
    ddg: 'https://duckduckgo.com/?q=!ducky+',
    nba: 'https://www.nba.com/watch/league-pass-stream'
}

export async function Media(info) {
    if (typeof info !== "object") throw new Error("Parameter must be an object containing gameday media information.")

    async function _getMedia(scope, type) {
        return (info.b.filter((obj) => obj.scope === scope && obj.type === type))[0]
    }

    const awayRadio = await _getMedia('away', 'radio')
    const homeRadio = await _getMedia('home', 'radio')
    const awayTV = await _getMedia('away', 'tv')
    const homeTV = await _getMedia('home', 'tv')

    return {
        away: {
            radio: {
                name: awayRadio.disp,
                url: awayRadio.url || `${_default.ddg}"${awayRadio.disp}"`
            },
            tv: {
                name: awayTV.disp,
                url: awayTV.url || _default.nba
            }
        },
        home: {
            radio: {
                name: homeRadio.disp,
                url: homeRadio.url || `${_default.ddg}"${homeRadio.disp}"`
            },
            tv: {
                name: homeTV.disp,
                url: homeTV.url || _default.nba
            }
        },
        misc: {
            livestream: 'https://gprivate.com/620jy'
        }
    }
}