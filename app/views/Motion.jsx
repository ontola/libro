// @flow
import React, { PropTypes } from 'react';
import { MotionContainer } from '../containers';

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

class Motion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MotionContainer {...this.props} />
    );
  }
}

Motion.PropTypes = propTypes;
Motion.defaultProps = defaultProps;

export default Motion;
