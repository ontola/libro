import path from 'helpers/paths';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './VoteData.scss';
import { calcPercentage } from 'helpers/numbers';
import CountBubbleContainer from 'containers/CountBubbleContainer';

import {
  DetailDate,
  DetailStatus,
} from 'components';

const propTypes = {
  optionCounts: PropTypes.object.isRequired,
  votes: PropTypes.object.isRequired,
  counts: PropTypes.object,
  result: PropTypes.string,
  endDate: PropTypes.date,
  startDate: PropTypes.date,
};

const defaultProps = {
  votes: {},
  counts: {},
  optionCounts: {},
};

const NUMBER_OF_VOTE_BUBBLES = 15;

class VoteData extends Component {
  voteSegment(option, total) {
    const votes = this.props.votes[option];
    const optionCounts = this.props.optionCounts[option];

    if (!(optionCounts >= 1)) {
      return false;
    }

    return (
      <div
        key={option}
        className={`VoteData__votebar-part VoteData__votebar-part--${option}`}
        style={{ width: `${calcPercentage(optionCounts, total)}%` }}
      >
        <div className="VoteData__votesegment-wrapper">{this.segmentItems(option)}</div>
        <span className={`VoteData__votebar-count VoteData__votebar-count--${option}`}>
          {optionCounts}
        </span>
      </div>
    );
  }

  segmentItems(option) {
    if (this.props.counts !== undefined) {
      const counts = this.props.counts[option].counts;

      return counts.slice(0, NUMBER_OF_VOTE_BUBBLES).map((count, i) => (
        <CountBubbleContainer id={count} key={i} />
      ));
    }
    const votes = this.props.votes[option].votes;

    return votes.slice(0, NUMBER_OF_VOTE_BUBBLES).map((vote, i) => (
      <div key={i} className="VoteData__opinion" title={vote}>
        <Link key={vote} to={path.profile(vote)}>
          joe
        </Link>
      </div>
    ));
  }

  render() {
    const { optionCounts, result, startDate, endDate } = this.props;
    const orderedKeys = ['yes', 'abstain', 'no'];
    const total = orderedKeys
      .map(opt => optionCounts[opt])
      .reduce((v, i) => v + i);

    // Only show the item if there are votes
    if (!(total >= 1)) {
      return false;
    }

    return (
      <div className="VoteData">
        {result &&
          <DetailStatus
            status={result}
          />
        }
        {(startDate || endDate) &&
          <DetailDate
            startDate={startDate}
            endDate={endDate}
          />
        }
        <div className="VoteData__votebar">
          {orderedKeys.map(option => this.voteSegment(option, total))}
        </div>
      </div>
    );
  }
}

VoteData.propTypes = propTypes;
VoteData.defaultProps = defaultProps;

export default VoteData;
