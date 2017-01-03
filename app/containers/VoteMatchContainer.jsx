import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { VoteMatchShow } from 'components';
import { voteMatchStart, voteMatchSave } from 'state/votematch/actions';

import {
  getCurrentVoteMatch,
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
  data: PropTypes.object.isRequired,
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
    const demoParties = [
      'f77531ce-99d4-4d25-8d98-70897d904a53',
    ];

    const {
      id,
      countUserVotes,
      data,
      motionIds,
      onSaveScore,
      similarity,
    } = this.props;

    return (
      <VoteMatchShow
        voteMatchId={id}
        currentIndex={countUserVotes}
        motionIds={motionIds}
        onSave={onSaveScore}
        similarity={similarity}
        name={data.name}
        text={data.text}
        comparedProfiles={demoParties}
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
    data: getCurrentVoteMatch(state, props),
  }),
  dispatch => ({
    onStartVoteMatch: record => dispatch(voteMatchStart(record)),
    onSaveScore: score => {console.log(`save ${score}`); return dispatch(voteMatchSave(score))},
  })
)(VoteMatchContainer);
