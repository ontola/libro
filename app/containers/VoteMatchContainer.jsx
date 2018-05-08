import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { voteMatchSave, voteMatchStart } from 'state/voteMatch/actions';
import {
  getVoteMatch,
  getVoteMatchCountUserVotes,
  getVoteMatchMotionIds,
  getVoteMatchSimilarity,
} from 'state/voteMatch/selectors';

import { VoteMatchShow } from '../components';

const propTypes = {
  countUserVotes: PropTypes.number,
  data: PropTypes.shape({
    comparables: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    text: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  motionIds: PropTypes.node,
  onSaveScore: PropTypes.func.isRequired,
  onStartVoteMatch: PropTypes.func.isRequired,
  similarity: PropTypes.number.isRequired,
};

const defaultProps = {
  motionIds: [],
};

class VoteMatchContainer extends Component {
  componentDidMount() {
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
        comparedProfiles={data.comparables}
        currentIndex={countUserVotes}
        motionIds={motionIds}
        name={data.name}
        similarity={similarity}
        text={data.text}
        voteMatchId={id}
        onSave={onSaveScore}
      />
    );
  }
}

VoteMatchContainer.propTypes = propTypes;
VoteMatchContainer.defaultProps = defaultProps;

export default connect(
  (state, props) => ({
    countUserVotes: getVoteMatchCountUserVotes(state, props),
    data: getVoteMatch(state, props),
    motionIds: getVoteMatchMotionIds(state, props),
    similarity: getVoteMatchSimilarity(state, props),
  }),
  dispatch => ({
    onSaveScore: score => dispatch(voteMatchSave(score)),
    onStartVoteMatch: record => dispatch(voteMatchStart(record)),
  })
)(VoteMatchContainer);
