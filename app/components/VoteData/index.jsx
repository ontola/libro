import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CountBubbleContainer from 'containers/CountBubbleContainer';
import { calcPercentage } from 'helpers/numbers';
import path from 'helpers/paths';

import Detail from '../Detail';
import DetailDate from '../DetailDate';
import DetailStatus from '../DetailStatus';
import { Count, Vote } from '../../models/index';

import './VoteData.scss';

const propTypes = {
  counts: PropTypes.arrayOf(Count),
  endDate: PropTypes.date,
  legislativeSession: PropTypes.string,
  optionCounts: PropTypes.arrayOf(Count).isRequired,
  organization: PropTypes.string,
  result: PropTypes.string,
  startDate: PropTypes.date,
  votes: PropTypes.arrayOf(Vote).isRequired,
};

const defaultProps = {
  counts: {},
};

const NUMBER_OF_VOTE_BUBBLES = 15;

class VoteData extends Component {
  voteSegment(option, totalVotes) {
    const optionCounts = this.props.optionCounts[option];

    if (!(optionCounts >= 1)) {
      return false;
    }

    return (
      <div
        className={`VoteData__votebar-part VoteData__votebar-part--${option}`}
        key={option}
        style={{ width: `${calcPercentage(optionCounts, totalVotes)}%` }}
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
      const { counts } = this.props.counts[option];

      return counts.slice(0, NUMBER_OF_VOTE_BUBBLES).map((count, i) => (
        <CountBubbleContainer id={count} key={i} />
      ));
    }
    const { votes } = this.props.votes[option];

    return votes.slice(0, NUMBER_OF_VOTE_BUBBLES).map((vote, i) => (
      <div className="VoteData__opinion" key={i} title={vote}>
        <Link key={vote} to={path.profile(vote)}>
          joe
        </Link>
      </div>
    ));
  }

  render() {
    const {
      endDate,
      legislativeSession,
      optionCounts,
      organization,
      result,
      startDate,
    } = this.props;
    const orderedKeys = ['yes', 'abstain', 'no'];
    const totalVotes = orderedKeys
      .map(opt => optionCounts[opt])
      .reduce((v, i) => v + i);

    // Only show the item if there are votes
    if (!(totalVotes >= 1)) {
      return false;
    }

    return (
      <div className="VoteData">
        {organization &&
          <Detail
            text={`Stemming ${organization}`}
          />
        }
        {result &&
          <DetailStatus
            status={result}
          />
        }
        {(legislativeSession && startDate) &&
          <DetailDate
            startDate={startDate}
            url={legislativeSession}
          />
        }
        {(!legislativeSession && (startDate || endDate)) &&
          <DetailDate
            endDate={endDate}
            startDate={startDate}
          />
        }
        <div className="VoteData__votebar">
          {orderedKeys.map(option => this.voteSegment(option, totalVotes))}
        </div>
      </div>
    );
  }
}

VoteData.propTypes = propTypes;
VoteData.defaultProps = defaultProps;

export default VoteData;
