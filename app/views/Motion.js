import React, {Component} from 'react';
import { MotionContainer } from '../containers';
import { Link } from 'react-router';

export default class Motion extends React.Component {

  constructor(props) {
    super(props);
  }

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
  params: React.PropTypes.shape({
    motionId: React.PropTypes.number
  })
};
