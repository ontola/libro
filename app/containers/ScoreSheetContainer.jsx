import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScoreSheet } from 'components';
import {
  getVoteMatchUserVotes,
  getVoteMatchMotions,
  getVoteMatchComparedProfilePositions,
  getVoteMatchSimilarity,
} from 'state/votematch/selectors';

const propTypes = {
  id: PropTypes.string.isRequired,
  motionIds: PropTypes.array,
  userVotes: PropTypes.array,
};

const mapStateToProps = (state, props) => ({
  comparedProfilePositions: getVoteMatchComparedProfilePositions(state, props),
  motionIds: getVoteMatchMotions(state, props),
  userVotes: getVoteMatchUserVotes(state, props),
  score: getVoteMatchSimilarity(state, props),
});

const ScoreSheetContainer = connect(
  mapStateToProps
)(ScoreSheet);


ScoreSheetContainer.propTypes = propTypes;

export default ScoreSheetContainer;
