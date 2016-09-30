import './VoteData.scss';
import React, { Component, PropTypes } from 'react';
import path from 'helpers/paths';
import { Link } from 'react-router';
import {
} from 'components';

const propTypes = {
  votes: PropTypes.object.isRequired,
  result: PropTypes.string.isRequired,
};

const defaultProps = {
  votes: {},
};

class VoteData extends Component {
  voteSegment(option, votes, barWidth) {
    return (
      <div
        className={`VoteData__VoteBarPart VoteData__VoteBarPart--${option}`}
        style={{ width: `${barWidth}%` }}
      >
        <div className="VoteData__VoteSegmentWrapper">
          {this.segmentItems(votes.votes)}
        </div>
        <span className={`VoteData__VoteBarCount VoteData__VoteBarCount--${option}`}>
          {votes.count}
        </span>
      </div>
    );
  }

  segmentItems(items) {
    return items.slice(0, 15).map(vote => (
      <div className="VoteData__Opinion" title={vote}>
        <Link key={vote} to={path.profile(vote)} />
      </div>
    ));
  }

  render() {
    const { votes } = this.props;
    const orderedKeys = ['yes', 'abstain', 'no'];
    const total = orderedKeys
      .map(opt => votes[opt].count)
      .reduce((v, i) => v + i);

    return (
      <div className="VoteData">
        <div className="VoteData__VoteBar">
          {orderedKeys.map(option => {
            const barWidth = 100 * (votes[option].count) / (total);
            return this.voteSegment(option, votes[option], barWidth);
          })}
        </div>
      </div>
    );
  }
}

VoteData.propTypes = propTypes;
VoteData.defaultProps = defaultProps;

export default VoteData;
