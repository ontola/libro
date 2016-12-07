import { connect } from 'react-redux';
import { VoteData } from 'components';

import {
  getVoteEventResult,
  getVoteEventVotesSorted,
} from 'state/voteEvents/selectors';

import {
  getVoteEventCountsSorted,
} from 'state/counts/selectors';

const mapStateToProps = (state, props) => ({
  counts: getVoteEventCountsSorted(state, props),
  result: getVoteEventResult(state, props),
  votes: getVoteEventVotesSorted(state, props),
});

const VoteDataContainer = connect(
  mapStateToProps
)(VoteData);

export default VoteDataContainer;
