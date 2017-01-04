import { connect } from 'react-redux';
import { VoteData } from 'components';

import {
  getVoteEventLegislativeSession,
  getVoteEventOptionCounts,
  getVoteEventResult,
  getVoteEventStartDate,
  getVoteEventOrganization,
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
  legislativeSession: getVoteEventLegislativeSession(state, props),
  votes: getVoteEventVotesSorted(state, props),
  optionCounts: getVoteEventOptionCounts(state, props),
  organization: getVoteEventOrganization(state, props),
});

const VoteDataContainer = connect(
  mapStateToProps
)(VoteData);

export default VoteDataContainer;
