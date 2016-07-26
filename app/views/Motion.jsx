// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MotionContainer from '../containers/MotionContainer';
import { Container } from '../components';
import Helmet from 'react-helmet';

const propTypes = {
  params: PropTypes.shape({
    motionId: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

const stateToProps = (state, ownProps) => {
  const findMotion = state.getIn(['motions', 'items', ownProps.params.motionId]) || {};
  return {
    title: findMotion.title,
    argumentations: findMotion.arguments,
  };
};

const Motion = ({ params, title }) => (
  <Container>
    <Helmet title={title} />
    <MotionContainer motionId={params.motionId} />
  </Container>
);

Motion.propTypes = propTypes;

export default connect(
  stateToProps
)(Motion);
