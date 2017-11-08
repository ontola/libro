import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import Vote from 'models/Vote';
import {
  getVoteEvent,
  getVoteEventVotesSorted,
} from 'state/voteEvents/selectors';
import { getVoteEventCountsSorted } from 'state/counts/selectors';

import { VoteData } from '../components';

const propTypes = {
  counts: PropTypes.arrayOf(PropTypes.shape({
    yes: PropTypes.number,
    no: PropTypes.number,
    abstain: PropTypes.number,
  })),
  votes: PropTypes.arrayOf(Vote),
  data: PropTypes.shape({
    optionCounts: PropTypes.string,
    endDate: PropTypes.string,
    legislativeSession: PropTypes.string,
    organization: PropTypes.string,
    result: PropTypes.string,
    startDate: PropTypes.string,
  }),
};

const VoteDataRenderItem = ({
  counts,
  data,
  votes,
}) => {
  if (data === undefined) {
    return false;
  }

  // Temporary hack to always render the votebar, even if no votes are present.
  const optionCounts = () => {
    if (data.optionCounts === undefined) {
      return {
        yes: 123,
        no: 123,
        abstain: 123,
      };
    }
    return data.optionCounts;
  };

  return (
    <VoteData
      counts={counts}
      endDate={data.endDate}
      legislativeSession={data.legislativeSession}
      optionCounts={optionCounts()}
      organization={data.organization}
      result={data.result}
      startDate={data.startDate}
      // optionCounts={data.optionCounts}
      votes={votes}
    />
  );
};

VoteDataRenderItem.propTypes = propTypes;

const mapStateToProps = (state, props) => ({
  data: getVoteEvent(state, props),
  counts: getVoteEventCountsSorted(state, props),
  votes: getVoteEventVotesSorted(state, props),
});

const VoteEventContainer = connect(mapStateToProps)(VoteDataRenderItem);

export default VoteEventContainer;
