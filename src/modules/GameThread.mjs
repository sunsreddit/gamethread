import snoowrap from 'snoowrap';
import { convertTimeToReadable, createMediaRow, getTeamInfo } from '../../lib/helpers.mjs';
import { gameMediaInfo } from '../services/gameMedia.mjs';
import { latestGameInfo } from '../services/latestGame.mjs';
import 'dotenv/config';

// const { nba: { teamId }, reddit: { flairId, r } } = config[process.env._ENV_];

export async function GameThread(params) {
  // Construct internal variables
  const { nba: { teamId }, reddit: { flairId, r } } = params[process.env._ENV_];

  // Fetch latest game
  const _latestGame = await latestGameInfo(teamId);
  
  // Fetch media data
  const _mediaData = await gameMediaInfo(_latestGame.bd);

  // Team information
  const _awayTeamInfo = getTeamInfo(_latestGame.v, _mediaData.away);
  const _homeTeamInfo = getTeamInfo(_latestGame.h, _mediaData.home);

  // National and other media information
  const _natlMediaInfo = _mediaData.natl;
  const _otherMediaInfo = _mediaData.other;

  // Thread header
  const _rowHeaders = `|   |     |     |    |\n| - | :-: | :-: | :- |`;

  // Matchup and time information
  const _titleMatchup = `${_awayTeamInfo.name} (${_awayTeamInfo.record}) @ ${_homeTeamInfo.name} (${_homeTeamInfo.record})`;
  const _titleTime = convertTimeToReadable(_latestGame.etm, process.env.TZ);
  const _titleThread = `[GAME THREAD]: ${_titleMatchup} (${_titleTime})`;

  // Arena information
  const _arenaEmoji = _latestGame.h.tid === teamId ? '🏠' : '✈️';
  const _rowArenaInfo = createMediaRow('🏟️', _arenaEmoji, `${_latestGame.an} · *${_latestGame.ac}, ${_latestGame.as}*`);

  // TV and radio information
  const _rowHomeTv =     createMediaRow('📺', '🏠', _homeTeamInfo.media.tv);
  const _rowAwayTv =     createMediaRow('📺', '✈️', _awayTeamInfo.media.tv);
  const _rowRadioNatl =  createMediaRow('📻' ,'🛰️', _natlMediaInfo.radio);
  const _rowRadioHome =  createMediaRow('📻', '🏠', _homeTeamInfo.media.radio);
  const _rowRadioAway =  createMediaRow('📻', '✈️', _awayTeamInfo.media.radio);
  const _rowMediaOther = createMediaRow('📱', '🏴‍☠️', _otherMediaInfo.livestream);

  // Assemble the body of the thread
  const _tableGameMedia = `${_rowHeaders}\n` + 
                          `${_rowArenaInfo}\n` +
                          `${_rowHomeTv}\n` +
                          `${_rowAwayTv}\n` + 
                          `${_rowRadioNatl}\n` + 
                          `${_rowRadioHome}\n` + 
                          `${_rowRadioAway}\n` + 
                          `${_rowMediaOther}`;

  // Log and submit the post
  console.log(`\n\nr/${r}\n\n${_titleThread}\n\n${_tableGameMedia}\n`);
  try {
    const redditPost =  new snoowrap({
      userAgent: process.env.USER_AGENT,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    });

    redditPost.submitSelfpost({
      flairId: flairId,
      subredditName: r,
      text: _tableGameMedia,
      title: _titleThread,
    })
      .then((post) => post.approve())
      .then((post) => post.distinguish())
      .then((post) => post.setSuggestedSort('new'))
      .then((post) => post.sticky());
      
  } catch (err) {
    console.log(`Error from Reddit API: ${err.message}\n`);
  }
}