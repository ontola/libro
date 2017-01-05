import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { VoteMatchResultBar } from 'components';
import {
  getVoteMatchUserVotes,
  getVoteMatchMotions,
  getVoteMatchComparedProfilePositions,
  getVoteMatchSimilarity,
} from 'state/voteMatch/selectors';
import {
  getGroupName,
} from 'state/groups/selectors';

const propTypes = {
  profileId: PropTypes.string.isRequired,
  motionIds: PropTypes.array,
  userVotes: PropTypes.array,
};

const mapStateToProps = (state, props) => ({
  comparedProfileName: getGroupName(state, { id: props.profileId }),
  comparedProfilePositions: getVoteMatchComparedProfilePositions(state, props),
  motionIds: getVoteMatchMotions(state, props),
  userVotes: getVoteMatchUserVotes(state, props),
  score: getVoteMatchSimilarity(state, props),
});

const VoteMatchResultProfileContainer = connect(
  mapStateToProps
)(VoteMatchResultBar);

VoteMatchResultProfileContainer.propTypes = propTypes;

export default VoteMatchResultProfileContainer;
