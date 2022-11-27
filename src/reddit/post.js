import snoowrap from "snoowrap"

export async function post(sub, title, text, flairId) {
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