// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';

import MotionContainer from '../containers/MotionContainer';
import { Container, VoteMatchProgress } from '../components';

const propTypes = {
  motions: PropTypes.object.isRequired,
  params: PropTypes.object,
};

// const defaultProps = {
// };

const completedMotions = 15;
const totalMotions = 30;

const CompareVotes = ({ params }) => (
  <div>
    <Container>
      <MotionContainer
        showArguments
        motionId={params.motionId}
      />
    </Container>
    <VoteMatchProgress
      completedMotions={completedMotions}
      totalMotions={totalMotions}
      compareTo="Fleur Agema"
    />
  </div>
);

// CompareVotes.defaultProps = defaultProps;
CompareVotes.propTypes = propTypes;

const stateToProps = (state) => ({
  motions: state.getIn(['motions', 'items']),
});

export default connect(stateToProps)(CompareVotes);
