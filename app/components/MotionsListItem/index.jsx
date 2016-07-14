// @flow
import './motionsListItem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Box, Heading, VoteButtons, VoteData } from '../';

const defaultProps = {
  motion: {
    identifier: null,
    title: '',
  },
};

const propTypes = {
  motion: PropTypes.shape({
    identifier: PropTypes.number,
    title: PropTypes.string,
  }),
};

const MotionsListItem = ({ motion }) => (
  <Box>
    <div className="motions__list__item">
      <Heading size="3">
        <Link
          to={`/motion/${motion.identifier}`}
          children={motion.title}
        />
      </Heading>
      <VoteData data={motion.votes} />
    </div>
    <VoteButtons identifier={motion.identifier} />
  </Box>
);

MotionsListItem.propTypes = propTypes;
MotionsListItem.defaultProps = defaultProps;

export default MotionsListItem;
