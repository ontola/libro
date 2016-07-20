// @flow
import './motionsListItem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Box, Heading, VoteButtons, VoteData } from '../';

import Motion from '../../models';

const propTypes = {
  motion: PropTypes.instanceOf(Motion).isRequired,
};

const MotionsListItem = ({ motion }) => (
  <Box>
    <div className="motions__list__item">
      <Heading size="3">
        <Link
          to={`/motion/${motion.get('id')}`}
          children={motion.get('title')}
        />
      </Heading>
      <VoteData data={motion.votes} />
    </div>
    <VoteButtons id={motion.get('id')} />
  </Box>
);

MotionsListItem.propTypes = propTypes;

export default MotionsListItem;
