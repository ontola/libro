import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { VoteMatchShow } from 'components';
import { voteMatchStart, voteMatchSave } from 'state/votematch/actions';

import {
  getVoteMatchMotions,
  getVoteMatchCountUserVotes,
  getVoteMatchSimilarity,
} from 'state/votematch/selectors';

const propTypes = {
  countUserVotes: PropTypes.number,
  id: PropTypes.string.isRequired,
  motionIds: PropTypes.node,
  onStartVoteMatch: PropTypes.func.isRequired,
  onSaveScore: PropTypes.func.isRequired,
  similarity: PropTypes.number.isRequired,
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
    const { id, countUserVotes, motionIds, onSaveScore, similarity } = this.props;

    return (
      <VoteMatchShow
        voteMatchId={id}
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
    motionIds: getVoteMatchMotions(state, props),
    similarity: getVoteMatchSimilarity(state, props),
  }),
  dispatch => ({
    onStartVoteMatch: record => dispatch(voteMatchStart(record)),
    onSaveScore: score => dispatch(voteMatchSave(score)),
  })
)(VoteMatchContainer);
