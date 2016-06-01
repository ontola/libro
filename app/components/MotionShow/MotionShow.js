// import './motionShow.scss';
import React, { PropTypes } from 'react';
import { Heading, Button, Box } from '../';

function MotionShow({ motion }) {
  return (
    <Box>
      <Heading size="3">{motion.title}</Heading>
      <Button>Ik ben joe</Button> <Button>Ik ben tegen</Button>
    </Box>
  );
}

MotionShow.propTypes = {
  motion: PropTypes.shape({
    title: PropTypes.string,
  }),
};

MotionShow.defaultProps = {
  motion: {
    title: 'Laden...',
  },
};

export default MotionShow;
