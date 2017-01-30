import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { VoteMatchShow } from 'components';
import { voteMatchStart, voteMatchSave } from 'state/voteMatch/actions';

import {
  getVoteMatch,
  getVoteMatchMotionIds,
  getVoteMatchCountUserVotes,
  getVoteMatchSimilarity,
} from 'state/voteMatch/selectors';

const propTypes = {
  countUserVotes: PropTypes.number,
  id: PropTypes.string.isRequired,
  motionIds: PropTypes.node,
  onStartVoteMatch: PropTypes.func.isRequired,
  onSaveScore: PropTypes.func.isRequired,
  similarity: PropTypes.number.isRequired,
  data: PropTypes.object,
};

const defaultProps = {
  motionIds: [],
};

class VoteMatchContainer extends Component {
  componentWillMount() {
    const { onStartVoteMatch, id } = this.props;

    onStartVoteMatch({ id });
  }

  render() {
    const {
      id,
      countUserVotes,
      data,
      motionIds,
      onSaveScore,
      similarity,
    } = this.props;

    if (data === undefined) {
      return false;
    }

    return (
      <VoteMatchShow
        voteMatchId={id}
        comparedProfiles={data.comparables}
        name={data.name}
        text={data.text}
        currentIndex={countUserVotes}
        motionIds={motionIds}
        onSave={onSaveScore}
        similarity={similarity}
      />
    );
  }
}

VoteMatchContainer.propTypes = propTypes;
VoteMatchContainer.defaultProps = defaultProps;

export default connect(
  (state, props) => ({
    countUserVotes: getVoteMatchCountUserVotes(state, props),
    motionIds: getVoteMatchMotionIds(state, props),
    similarity: getVoteMatchSimilarity(state, props),
    data: getVoteMatch(state, props),
  }),
  dispatch => ({
    onStartVoteMatch: record => dispatch(voteMatchStart(record)),
    onSaveScore: score => dispatch(voteMatchSave(score)),
  })
)(VoteMatchContainer);
