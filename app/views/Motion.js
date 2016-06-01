import React, { PropTypes } from 'react';
import { MotionContainer } from '../containers';
import { Link } from 'react-router';

class Motion extends React.Component {
  render() {
    const nextId = Number(this.props.params.motionId) + 1;
    const previousId = this.props.params.motionId - 1;
    return (
      <div>
        <Link to={`/motion/${previousId}`}>Previous</Link>
        <Link to={`/motion/${nextId}`}>Next</Link>
        <MotionContainer {...this.props} />
      </div>
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
