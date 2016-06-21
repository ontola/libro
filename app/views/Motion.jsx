// @flow
import React, { PropTypes } from 'react';
import { MotionContainer } from '../containers';
import { Page } from '../components';
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
  <Page>
    <Helmet title="Motion" />
    <MotionContainer {...props} />
  </Page>
);

Motion.PropTypes = propTypes;
Motion.defaultProps = defaultProps;

export default Motion;
