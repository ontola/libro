//import './motionShow.scss';
import React from 'react';
import { Heading, Button, Box } from '../';

export default class MotionShow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props.motion;

    return (
      <Box>
        <Heading size="3">{title}</Heading>
        <Button>Ik ben voor</Button> <Button>Ik ben tegen</Button>
      </Box>
    );
  }
}

MotionShow.propTypes = {
  motion: React.PropTypes.shape({
    title: React.PropTypes.string
  })
};
