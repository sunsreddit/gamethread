import snoowrap from 'snoowrap';

export function SubmitPost(subReddit, title, body, flairId) {
  return new snoowrap({
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  })
    .getSubreddit(subReddit)
    .submitSelfpost({
      text: body,
      title,
    })
    .selectFlair({
      flair_template_id: flairId ? flairId : '',
    })
    .sticky()
    .distinguish()
    .setSuggestedSort('new');
}