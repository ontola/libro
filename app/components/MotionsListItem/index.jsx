// @flow
import './motionsListItem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Box, Heading, VoteButtons, VoteData } from '../';

const propTypes = {
  motion: PropTypes.object.isRequired,
};

const MotionsListItem = ({ motion }) => {
  const { id, title, votes } = motion;
  return (
    <Box>
      <div className="MotionsListItem">
        <Heading size="3">
          <Link
            to={`/motions/${id}`}
            children={title}
          />
        </Heading>
        <VoteData data={votes} />
      </div>
      <VoteButtons id={id} />
    </Box>
  );
};

MotionsListItem.propTypes = propTypes;

export default MotionsListItem;
