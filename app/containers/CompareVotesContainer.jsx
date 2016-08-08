// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { voteMatchNext, voteMatchStart } from '../actions';
import { Box, Heading, VoteButtons } from '../components';

const motions = ['642621', '245245', '195075', '358964'];

const propTypes = {
  start: PropTypes.func,
  nextMotion: PropTypes.func,
  motionTitle: PropTypes.object,
  params: PropTypes.object,
  currentIndex: PropTypes.number,
  compareWith: PropTypes.string.isRequired,
};

class CompareVotesContainer extends Component {
  componentWillMount() {
    const {
      nextMotion,
      start,
      compareWith,
    } = this.props;

    start({
      motionIds: motions,
      currentIndex: null,
      compareWithPerson: compareWith,
    });
    nextMotion();
  }

  render() {
    const { currentIndex } = this.props;
    const voteAndNext = () => {
      return true;
    };

    if (currentIndex === null) {
      return false;
    }

    return (
      <Box>
        <Heading size="3">Motie {motions[currentIndex]}</Heading>
        <VoteButtons id={motions[currentIndex]} onVote={voteAndNext} />
      </Box>
    );
  }
}

CompareVotesContainer.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    name: state.getIn(['persons', 'items', ownProps.compareWith, 'name']),
    currentIndex: state.getIn(['compareVotes', 'currentIndex']),
    motionTitle: state.getIn(['motions', 'items', motions[ownProps.currentIndex]]),
  }),
  (dispatch) => ({
    start: (data) => dispatch(voteMatchStart(data)),
    nextMotion: () => dispatch(voteMatchNext()),
  })
)(CompareVotesContainer);
