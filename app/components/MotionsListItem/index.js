import './motionsListItem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Box, VoteData } from '../';

function MotionsListItem({ motion }) {
  return (
    <Box>
      <div className="motions__list__item">
        <Link to={`/motion/${motion.identifier}`}>{motion.title}</Link>
        <VoteData data={motion.votes} />
      </div>
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
