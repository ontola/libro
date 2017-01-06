import { connect } from 'react-redux';
import { VoteData } from 'components';
import React, { PropTypes } from 'react';

import {
  getVoteEvent,
  getVoteEventVotesSorted,
} from 'state/voteEvents/selectors';

import {
  getVoteEventCountsSorted,
} from 'state/counts/selectors';

const propTypes = {
  counts: PropTypes.array,
  votes: PropTypes.array,
  data: PropTypes.object,
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
      votes={votes}
      result={data.result}
      startDate={data.startDate}
      endDate={data.endDate}
      legislativeSession={data.legislativeSession}
      organization={data.organization}
      // optionCounts={data.optionCounts}
      optionCounts={optionCounts()}
    />
  );
};

VoteDataRenderItem.propTypes = propTypes;

const mapStateToProps = (state, props) => ({
  data: getVoteEvent(state, props),
  counts: getVoteEventCountsSorted(state, props),
  votes: getVoteEventVotesSorted(state, props),
});

const VoteEventContainer = connect(
  mapStateToProps
)(VoteDataRenderItem);

export default VoteEventContainer;
