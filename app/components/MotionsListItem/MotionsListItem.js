// import './motionsListItem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function MotionsListItem({ motion }) {
  return (
    <li>
      <Link to={`/motion/${motion.identifier}`}>{motion.title}</Link>
    </li>
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
