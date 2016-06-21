// @flow
import React, { PropTypes } from 'react';
import { MotionContainer } from '../containers';
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
  <div>
    <Helmet
      title="Motion"
    />
    <MotionContainer {...props} />
  </div>
);

Motion.PropTypes = propTypes;
Motion.defaultProps = defaultProps;

export default Motion;
