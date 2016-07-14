// @flow
import React, { PropTypes } from 'react';
import { MotionContainer } from '../containers';
import { Container } from '../components';
import Helmet from 'react-helmet';

const propTypes = {
  params: PropTypes.shape({
    motionId: PropTypes.number,
  }),
};

const defaultProps = {
  params: {
    motionId: 0,
  },
};

const Motion = (props) => (
  <Container>
    <Helmet title="Motion" />
    <MotionContainer {...props} />
  </Container>
);

Motion.PropTypes = propTypes;
Motion.defaultProps = defaultProps;

export default Motion;
