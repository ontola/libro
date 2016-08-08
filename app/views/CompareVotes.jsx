// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Container, VoteMatchProgress } from '../components';
import MotionContainer from '../containers/MotionContainer';

const propTypes = {
  name: PropTypes.string.isRequired,
  params: PropTypes.object,
  nextMotion: PropTypes.func,
  currentIndex: PropTypes.number,
  motionsLength: PropTypes.number,
};

const defaultProps = {
  name: '',
};

const CompareVotes = ({ params, currentIndex, motionsLength }) => (
  <div>
    <Container>
      <MotionContainer
        activeVoteMatch
        motionId={params.motionId}
        showArguments
      />
    </Container>
    <VoteMatchProgress
      compareTo="Fleur Agema"
      completedMotions={currentIndex}
      totalMotions={motionsLength}
    />
  </div>
);

CompareVotes.propTypes = propTypes;
CompareVotes.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    name: state.getIn(['persons', 'items', ownProps.params.userId, 'name']),
    currentIndex: state.getIn(['compareVotes', 'currentIndex']),
    motionsLength: state.getIn(['compareVotes', 'motionIds']).size,
  })
)(CompareVotes);
