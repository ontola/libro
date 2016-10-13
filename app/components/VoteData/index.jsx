import path from 'helpers/paths';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './VoteData.scss';
import { calcPercentage } from 'helpers/numbers';

const propTypes = {
  votes: PropTypes.object.isRequired,
};

const defaultProps = {
  votes: {},
};

const NUMBER_OF_VOTE_BUBBLES = 15;

class VoteData extends Component {
  voteSegment(option, total) {
    const votes = this.props.votes[option];

    return (
      <div
        key={option}
        className={`VoteData__votebar-part VoteData__votebar-part--${option}`}
        style={{ width: `${calcPercentage(votes.count, total)}%` }}
      >
        <div className="VoteData__votesegment-wrapper">{this.segmentItems(option)}</div>
        <span className={`VoteData__votebar-count VoteData__votebar-count--${option}`}>
          {votes.count}
        </span>
      </div>
    );
  }

  segmentItems(option) {
    const items = this.props.votes[option].votes;

    return items.slice(0, NUMBER_OF_VOTE_BUBBLES).map((vote, i) => (
      <div key={i} className="VoteData__opinion" title={vote}>
        <Link key={vote} to={path.profile(vote)}>
          joe
        </Link>
      </div>
    ));
  }

  render() {
    const { votes } = this.props;
    const orderedKeys = ['yes', 'abstain', 'no'];
    const total = orderedKeys
      .map(opt => votes[opt].count)
      .reduce((v, i) => v + i);

    if (total === 0) {
      return false;
    }

    return (
      <div className="VoteData">
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
