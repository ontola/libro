// @flow
import './motionsListItem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Box, Heading, VoteButtons, VoteData } from '../';

const propTypes = {
  motion: PropTypes.object.isRequired,
};

const MotionsListItem = ({ motion }) => (
  <Box>
    <div className="MotionsListItem">
      <Heading size="3">
        <Link
          to={`/motions/${motion.id}`}
          children={motion.title}
        />
      </Heading>
      <VoteData data={motion.votes} />
    </div>
    <VoteButtons id={motion.id} />
  </Box>
);

MotionsListItem.propTypes = propTypes;

export default MotionsListItem;
