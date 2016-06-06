import React, { PropTypes } from 'react';
import { MotionContainer } from '../containers';
import { Link, browserHistory } from 'react-router';

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

Motion.PropTypes = {
  params: PropTypes.shape({
    motionId: PropTypes.number,
  }),
};

Motion.defaultProps = {
  params: {
    motionId: 0,
  },
};

export default Motion;
