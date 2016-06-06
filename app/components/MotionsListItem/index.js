// import './motionsListItem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Box } from '../';

function MotionsListItem({ motion }) {
  return (
    <Box>
      <Link to={`/motion/${motion.identifier}`}>{motion.title}</Link>
    </Box>
  );
}

MotionsListItem.propTypes = {
  motion: PropTypes.shape({
    identifier: PropTypes.number,
    title: PropTypes.string,
  }),
};

MotionsListItem.defaultProps = {
  motion: {
    identifier: null,
    title: 'Joe',
  },
};

export default MotionsListItem;
