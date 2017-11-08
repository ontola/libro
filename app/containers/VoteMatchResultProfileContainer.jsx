import { PropTypes } from 'react';
import { connect } from 'react-redux';

import Vote from 'models/Vote';
import {
  getVoteMatchUserVotes,
  getVoteMatchMotionIds,
  getVoteMatchComparedProfilePositions,
  getVoteMatchSimilarity,
} from 'state/voteMatch/selectors';
import {
  getGroupName,
} from 'state/groups/selectors';

import { VoteMatchResultBar } from '../components';

const propTypes = {
  profileId: PropTypes.string.isRequired,
  motionIds: PropTypes.arrayOf(PropTypes.number),
  userVotes: PropTypes.arrayOf(Vote),
};

const mapStateToProps = (state, props) => ({
  comparedProfileName: getGroupName(state, { id: props.profileId }),
  comparedProfilePositions: getVoteMatchComparedProfilePositions(state, props),
  motionIds: getVoteMatchMotionIds(state, props),
  userVotes: getVoteMatchUserVotes(state, props),
  score: getVoteMatchSimilarity(state, props),
});

const VoteMatchResultProfileContainer = connect(mapStateToProps)(VoteMatchResultBar);

VoteMatchResultProfileContainer.propTypes = propTypes;

export default VoteMatchResultProfileContainer;
