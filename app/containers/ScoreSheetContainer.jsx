import { PropTypes } from 'react';
import { connect } from 'react-redux';

import Vote from 'models/Vote';
import {
  getVoteMatchUserVotes,
  getVoteMatchMotionIds,
  getVoteMatchComparedProfilePositions,
  getVoteMatchSimilarity,
} from 'state/voteMatch/selectors';

import { ScoreSheet } from '../components';

const propTypes = {
  id: PropTypes.string.isRequired,
  motionIds: PropTypes.arrayOf(PropTypes.string),
  userVotes: PropTypes.arrayOf(Vote),
};

const mapStateToProps = (state, props) => ({
  comparedProfilePositions: getVoteMatchComparedProfilePositions(state, props),
  motionIds: getVoteMatchMotionIds(state, props),
  userVotes: getVoteMatchUserVotes(state, props),
  score: getVoteMatchSimilarity(state, props),
});

const ScoreSheetContainer = connect(mapStateToProps)(ScoreSheet);


ScoreSheetContainer.propTypes = propTypes;

export default ScoreSheetContainer;
