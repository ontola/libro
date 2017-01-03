import { connect } from 'react-redux';
import { VoteData } from 'components';

import {
  getVoteEventOptionCounts,
  getVoteEventResult,
  getVoteEventStartDate,
  getVoteEventEndDate,
  getVoteEventVotesSorted,
} from 'state/voteEvents/selectors';

import {
  getVoteEventCountsSorted,
} from 'state/counts/selectors';

const mapStateToProps = (state, props) => ({
  counts: getVoteEventCountsSorted(state, props),
  result: getVoteEventResult(state, props),
  endDate: getVoteEventEndDate(state, props),
  startDate: getVoteEventStartDate(state, props),
  votes: getVoteEventVotesSorted(state, props),
  optionCounts: getVoteEventOptionCounts(state, props),
});

const VoteDataContainer = connect(
  mapStateToProps
)(VoteData);

export default VoteDataContainer;
