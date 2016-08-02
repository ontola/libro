// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';

import MotionContainer from '../containers/MotionContainer';
import { Container } from '../components';

const propTypes = {
  motions: PropTypes.object.isRequired,
  params: PropTypes.object,
};

// const defaultProps = {
// };

const CompareVotes = ({ params }) => (
  <Container>
    <MotionContainer
      showArguments
      motionId={params.motionId}
    />
  </Container>
);

// CompareVotes.defaultProps = defaultProps;
CompareVotes.propTypes = propTypes;

const stateToProps = (state) => ({
  motions: state.getIn(['motions', 'items']),
});

export default connect(stateToProps)(CompareVotes);
