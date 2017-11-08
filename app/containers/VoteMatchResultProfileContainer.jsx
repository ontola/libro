import { PropTypes } from 'react';
import { connect } from 'react-redux';

import Vote from 'models/Vote';
import {
  getVoteMatchComparedProfilePositions,
  getVoteMatchMotionIds,
  getVoteMatchSimilarity,
  getVoteMatchUserVotes,
} from 'state/voteMatch/selectors';
import {
  getGroupName,
} from 'state/groups/selectors';

import { VoteMatchResultBar } from '../components';

const propTypes = {
  motionIds: PropTypes.arrayOf(PropTypes.number),
  profileId: PropTypes.string.isRequired,
  userVotes: PropTypes.arrayOf(Vote),
};

const mapStateToProps = (state, props) => ({
  comparedProfileName: getGroupName(state, { id: props.profileId }),
  comparedProfilePositions: getVoteMatchComparedProfilePositions(state, props),
  motionIds: getVoteMatchMotionIds(state, props),
  score: getVoteMatchSimilarity(state, props),
  userVotes: getVoteMatchUserVotes(state, props),
});

const VoteMatchResultProfileContainer = connect(mapStateToProps)(VoteMatchResultBar);

VoteMatchResultProfileContainer.propTypes = propTypes;

export default VoteMatchResultProfileContainer;
